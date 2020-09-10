
const url = chrome.runtime.getURL('./training.json')
var posts_training;
var posts_testing;

// The minimum prediction confidence.
const threshold = 0.9;

const label = ['toxicity']
var counterToxic = 0
var tested = 0
let promises = []
///
fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        posts_training = json;
        posts_testing = json;
    })
////




const encodeData = data => {
    var encoded;
    console.log('w encoder:')
    console.log(posts_training);
    console.log(posts_training[5].post)
    console.log(`data: ${data}`)
    const sentences = data.toLowerCase();//data.map(() => data.toLowerCase())//posts_training.post.toLowerCase());
    console.log(`sentences ${sentences}`)
    /*use.loadTokenizer().then(tokenizer => {
        console.log(tokenizer.encode('Hello, how are you?')); // [341, 4125, 8, 140, 31, 19, 54]
    });*/
    const trainingData = use.load()
        .then(model => {
            return model.embed(sentences)
                .then(embeddings => {
                    console.log(`emmbendings: ${embeddings}`)
                    encoded = embeddings;

                    console.log(`encoded in ${encoded}`)
                    return embeddings;
                });
        })
        .catch(err => console.error('Fit Error:', err));
    console.log(`encoded ${encoded}`)
    return encoded;
};

async function useModel() {

    const example = "You're fucking idiot"
    var toPredict;
    // var model = new Promise(data => {
    var model = await tf.loadLayersModel('/tfjs/model.json')
    model.summary();
    console.log("Model loaded")//to wgl bez sensu bo wszystko asynchronicznie :(
    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => {
            posts_training = json; console.log(posts_training); console.log(`Postrtaining:${posts_training}`); console.log(posts_training);
            toPredict = encodeData(example); console.log(toPredict);
            Promise
                .all([
                    encodeData(posts_testing)
                ])
                .then(encoded => {
                    
                    console.log('try predict 1')
                    model.predict(encoded).print()//((encoded)).dataSync()[0];
                    //console.log(pred);
                    console.log(`prdictipon: ${model.predict(encoded)}`)//.print();
                    console.log('after predict 1')
                })
        })
        //})
        .then(history => {
            console.log('try predict 2')
            model.predict(encodeData(example)).print();
            console.log('after predict 2')
        });

    console.log('done');
    //var nj = require('numjs');


}


useModel();

document.addEventListener("DOMContentLoaded", function (tab) {
    var checkPopupBtn = document.getElementById("checkBtn");
    checkPopupBtn.addEventListener('click', function () {                        //po kliknięciu przycisku
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var port = chrome.tabs.connect(tabs[0].id);
            port.postMessage({ text: 'content' });
                port.onMessage.addListener(function getResp(domContent) {
                toxicity.load(threshold, label).then(model => {
                    domContent.forEach(element => {
                        promises.push(model.classify(element))
                    });
                    var i = 0;
                    domContent.forEach(element => {
                        model.classify(element).then(predictions => {
                            if (predictions[0].results[0].match == true){
                                port.postMessage({ index: i });
                                counterToxic++
                            }
                            i++;
                            console.log(i)
                            console.log(predictions[0].results[0].match)
                        });
                        tested++;
                    });
            Promise.all(promises).then(showResult => { console.log(`Here detected ${counterToxic} toxic elements from ${tested} tested`) })
                });
            });
        });
    })
});
