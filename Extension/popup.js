// var tab_title = '';
// function display_h1(results) {
//     h1 = results;
//     console.log(results);
//     document.querySelector("#id2").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
// }
// chrome.tabs.query({ active: true }, function (tabs) {
//     var tab = tabs[0];
//     console.log(tab);
//     tab_title = tab.title;
//     chrome.tabs.executeScript(tab.id, {
//         code: 'document.querySelector("p").textContent'
//     }, display_h1);
// });

document.addEventListener("DOMContentLoaded", function (tab) {
    var checkPopupBtn = document.getElementById("checkBtn");
    checkPopupBtn.addEventListener('click', function () {
        chrome.runtime.sendMessage({ greeting: 'hello ' }, response =>
            alert("HI")
        );
    })
})
