
const url = chrome.runtime.getURL('./training.json')
var posts_training;
var posts_testing;

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


////////////////////////////
//ten model z filmami z pythona
var modelMovie
async function useModelMovie() {
    console.log("Before load model")
    modelMovie = await tf.loadLayersModel('/tfjs-model-movie/model.json')//'/python/tfjs-model/model.json') //Extension\python\tfjs-modelHUB
    //tf.tensor(image).reshape([1, 28, 28, 1])]).array()
    const text = "The movie was amazing and sounds were great"
    console.log(text)
    use.loadTokenizer().then(tokenizer => {
        var encodedText = tokenizer.encode(text) // [341, 4125, 8, 140, 31, 19, 54]
        console.log(encodedText)
        encodedText=tf.cast(encodedText, 'float32')
        console.log(encodedText)
        var predict = modelMovie.predict((encodedText)).dataSync()[0];
        console.log(predict)

        //negative
        console.log("Negative")
        const textNeg="I do not think someone would like to go to the cinema and pay for watching this movie. Actor was horrible"
        var enct = tokenizer.encode(textNeg)
        console.log(enct)
        enct=tf.cast(enct, 'float32')
        console.log(enct)
        var predict2 = modelMovie.predict((enct)).dataSync()[0];
        console.log(predict2)

        console.log(tf.util.encodeString(textNeg))
        console.log(modelMovie.predict(tf.cast((tf.util.encodeString(textNeg), 'float32'))))

      });
    
    const predict = modelMovie.predict(tf.tensor2d([[text]], [1, 1]));
    console.log(predict);
}

useModelMovie();
//////////////////////////////

document.addEventListener("DOMContentLoaded", function (tab) {
    var checkPopupBtn = document.getElementById("checkBtn");
    checkPopupBtn.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

            var port = chrome.tabs.connect(tabs[0].id);
            port.postMessage({ text: 'content' });
            port.onMessage.addListener(function getResp(domContent) {
                console.log(domContent);
                var i = 0;
                domContent.forEach(element => {
                    console.log(element);
                    if (element.search("hate") != (-1)) {

                        port.postMessage({ index: i });
                    }
                    i++;
                    console.log(i);
                });
            });
        });
    })
});
