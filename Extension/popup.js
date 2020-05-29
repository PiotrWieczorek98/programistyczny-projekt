

async function useModel() {
    const model = await tf.loadLayersModel('/model/model.json');
    console.log("Model loaded")
    var nj = require(['numjs'])

    // const prediction = model.predict(example);
    // console.log(prediction);
}

useModel();

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
            
                        port.postMessage({index:i});
                    }
                    i++;
                    console.log(i);
                });
            });
        });
    })
});
