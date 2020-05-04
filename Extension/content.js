const tabOfTexts = [];

var elements = document.getElementsByTagName('p');
//console.log(elements);

if (elements.length == 0) {
    elements = document.getElementsByTagName('div');
}

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    // console.log(element);
    console.log(`element i: ${i} : ${element.textContent}`);
    tabOfTexts.push(element.textContent);

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        console.log(`element j: ${j} : ${node.textContent}`);

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            //console.log(text);
            var replacedText = text.replace('Hate', 'LOVE');
            // if (replacedText !== text) {
            //     element.style.backgroundColor = "indianred";
            // }

        }
    }
}


chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg.index >= 0) {
            console.log(msg.index);
            elements[msg.index + 1].style.backgroundColor = "indianred";
        }
        if (msg.text === 'content') {
            port.postMessage(tabOfTexts);
            console.log(tabOfTexts);
        }
    });
});
