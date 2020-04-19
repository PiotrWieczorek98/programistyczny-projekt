document.addEventListener("DOMContentLoaded", function (tab) {
    var checkPopupBtn = document.getElementById("checkBtn");
    checkPopupBtn.addEventListener('click', function () {
        alert("HI");
        chrome.tabs.executeScript(null, {
            file: 'content.js'
        });
    })
});
