
const encodeData = passedString => {
    console.log('Do zakodowania: ', passedString)
    const toEncode = passedString.toString().toLowerCase();
    const trainingData = use.load()
        .then(model => {
            return model.embed(toEncode)
                .then(embeddings => {
                    return embeddings;
                });
        })
        .catch(err => console.error('Fit Error:', err));
    console.log('Zakodowano.')
    return trainingData
};

async function start() {

    document.addEventListener("DOMContentLoaded", function (tab) {
        var checkPopupBtn = document.getElementById("checkBtn");
        checkPopupBtn.addEventListener('click', function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                var port = chrome.tabs.connect(tabs[0].id);
                port.postMessage({ text: 'content' });
                port.onMessage.addListener(async function getResp(domContent) {
                    //console.log(domContent);
                    var model = await tf.loadLayersModel('/tfjs/model.json')
                    var i = 0;
                    domContent.forEach(element => {
                        toPredict = encodeData(element);
                        console.log(element);
                        Promise
                            .all([toPredict])
                            .then(encoded => {
                                console.log('try predict...')
                                var prediction = model.predict(encoded)
                                prediction = prediction.dataSync();
                                console.log('Value 0: ', prediction[0])
                                console.log('Value 1: ', prediction[1])

                                if (prediction[0] > prediction[1]) {
                                    console.log("send toxic")
                                    port.postMessage({ index: i });
                                }
                                else {
                                    console.log('prediction: not toxic')
                                }
                                i++;
                            })
                    });
                });
            });
        })
    });
}

start();