console.log(document.body.innerText)

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "start") {
            sendParagrahs(sendResponse);
        }
    }
);

function sendParagrahs(sendResponse) {
    let paragraphs
    paragraphs = document.getElementsByTagName('p') //wywala jesli wysyłam document.body.innerText
    sendResponse(paragraphs); //jesli na danej stronie nie dziala to wywala to samo :)
}


//smieciiiii

  // const hate = 0;
// //alert("There found {hate} texts");
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
//     //alert(request)
//     const re = new RegExp('bear')
//     //RegExp()
//     const matches = document.documentElement.innerHTML.match(re)
//     if (request=='hi')
//         sendResponse({count: matches.length})
// })

// //alert("Hi")
//import * as toxicity from 'node_modules/@tensorflow-models/toxicity'
//const model = await tf.loadGraphModel('\node_modules\@tensorflow-models\toxicity\package.json');
// chrome.runtime.onMessage.addListener(gotMessage)

// function gotMessage(message, sender, sendResponse){
//     console.log(message);

//         let counter = 0
//         let paragraphs = document.getElementsByTagName('p')
//         for(el in paragraphs)
//         {
//             counter++
//         }
//         console.log(counter)
//         sendResponse({"counter": counter})
// }


// // The minimum prediction confidence.
// const threshold = 0.9;

// // Which toxicity labels to return.
// const labelsToInclude = ['identity_attack', 'insult', 'threat'];

// toxicity.load(threshold)

// function check()
// {
//     let counter =0;
//     let paragraphs = document.getElementsByTagName('p')
//             for(el in paragraphs)
//             {
//                 model.
//                 if (toxicity.classify(el))
//                     counter++
//             }
//             console.log(counter)
//             alert(`Here is ${counter} paragraphs`)
//             //sendResponse({"counter": counter})
// }

// check()
//another
// chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
//     console.log("something happening from the extension");
//     // var data = request.data || {};

//     // var linksList = document.querySelectorAll('a');
//     // [].forEach.call(linksList, function(header) {
//     //     header.innerHTML = request.data;
//     // });
//     let data = []
//     data = document.getElementsByTagName('p')
//     sendResponse({data: data, success: true});
// });

//another
// document.addEventListener('DOMContentLoaded', () => {
//     chrome.runtime.onMessage.addListener((message, callback) => {
//     // TMD 拷贝的示例就俩参数，在详细文档中有三个参数
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         let data = []
//         data = document.getElementsByTagName('p')
//         sendResponse({ data: data })
//         if (message.type == "CHANGE_PLAY_RATE") {
//             vsc_update_play_rate(message.value);
//         }