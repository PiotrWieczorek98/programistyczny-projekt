console.log("ready")
async function useModel() {
    const model = await tf.loadLayersModel('/model/model.json'); 
    const image = new Image();
    image.src='cyfra.png';
        //tf.tensor(image).reshape([1, 28, 28, 1])]).array()
    //const example = tf.fromPixels(image);  // for example
    //const prediction = model.predict(example);
   // console.log(prediction);
   const predict = model.predict(tf.model);
//    const predict = model.predict([tf.tensor(tf.fromPixels(image)).reshape([1, 28, 28, 1])]).array().then(function(scores){
//     scores = scores[0];
//     predicted = scores.indexOf(Math.max(...scores));
//   });
  console.log(predict);
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
                    if (element.search("Hate") != (-1)) {
            
                        port.postMessage({index:i});
                    }
                    i++;
                    console.log(i);
                });
            });
        });
    })
});
