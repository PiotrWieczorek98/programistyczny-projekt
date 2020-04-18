var elements = document.getElementsByTagName('p');
console.log(elements);

if (elements.length == 0) {
    elements = document.getElementsByTagName('div');
}

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    console.log(element);
    console.log(element.textContent);

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            console.log(text);
            var replacedText = text.replace('hate', 'LOVE');
            if (replacedText !== text) {
                element.style.backgroundColor = "indianred";
            }
        }
    }
}
