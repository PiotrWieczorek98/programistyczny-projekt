
console.log("ready")

// The minimum prediction confidence.
const threshold = 0.9;


const test = ['you suck', 'fuck you', 'nice job', 'shut up']
var counterToxic = 0
let tested = test.length
const label = ['toxicity']
let promises = []




toxicity.load(threshold, label).then(model => {
    // Now you can use the `model` object to label sentences. 

    for (el in test)
        promises.push(model.classify(test[el]))

    for (el in test) {
        model.classify(test[el]).then(predictions => {
            //console.log(predictions[0].results[0].match) 
            if (predictions[0].results[0].match == true)
                counterToxic++
            console.log(predictions[0].results[0].match)
            console.log(counterToxic)
        })

    }
    Promise.all(promises).then(showResult => { console.log(`Here detected ${counterToxic} toxic elements from ${tested} tested`) })
})



function afterResponse(res) {
    console.log(res);
}

function popup() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "start" }, afterResponse);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button1").addEventListener("click", popup);
});


////////////here new
// document.addEventListener('DOMContentLoaded', function() {
//     var button = document.getElementById('button1');
//     button.addEventListener('click', function () {
//         // $('#status').html('Clicked change links button');
//         // var text = $('#linkstext').val();
//         // if (!text) {
//         //     $('#status').html('Invalid text provided');
//         //     return;
//         // }
//         const text = 'try'
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
//                 console.log('success');
//                 console.log(response)
//             });
//         });
//     });
// });

//another soluton
// window.addEventListener('load', (event) => {
//     chrome.tabs.executeScript(null, {
//         file: 'content.js', //my content script   
//     }, () => {
//         connect() //this is where I call my function to establish a connection     });
//     });
// });
// const data = 'try'
// function connect() {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         const port = chrome.tabs.connect(tabs[0].id);
//         port.postMessage({ data: data })
//         port.onMessage.addListener((response) => {
//             console.log(response)
//         });
//     });

//and another


// // Which toxicity labels to return.
// const labelsToInclude = ['identity_attack', 'insult', 'threat'];

//toxicity.load(threshold)
// const model
// const check = async()=>
// {
//     let counter =0;
//     let results;
//     let paragraphs = document.getElementsByTagName('p')
//             for(el in paragraphs)
//             {

//                 //if (toxicity.classify(el))
//                 //    counter++
//                 results = await model.classify(el)
//                 console.log(result)
//             }
//             console.log(counter)
//             alert(`Here is ${counter} paragraphs`)
//             //sendResponse({"counter": counter})
// }

// document.addEventListener('DOMContentLoaded', function(){ 
//  document.querySelector('#button1').addEventListener('click', onclick, false)

//   function onclick () {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, 'hi', function(response) {
//           console.log(response.counter);
//         });
//       });
//     }}, false)
//   function setCount (res) {
//     //res.
//     const div = document.createElement('div')
//     div.textContent = `hi`//${res.count} bears`
//     document.body.appendChild(div)
//   }




// function injectTheScript() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         // query the active tab, which will be only one tab
//         //and inject the script in it
//         chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
//     });
// }
