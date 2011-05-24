(function(){
    var popupWin = null;

    var createPopup = function(href, width, height) {
        // Closes any existing popup window first.
        if (popupWin) {
            chrome.windows.remove(popupWin.id);
        }
        chrome.windows.create({
            url: href, type: 'popup',
            width: width||576, height:height||680
        }, function(win){
            popupWin = win;
        });
    };

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.cmd == 'create-popup') {
            createPopup(request.href, request.width, request.height);
        }
    });

    chrome.contextMenus.create({
        title: "Create Flashcards for '%s'",
        contexts:['selection'],
        onclick: function(info, tab) {
            var url = getDeckChooserUrl({'expression': info.selectionText,
                                         '_popup': false});

            createPopup(url, 640, 580);
        }
    });
})();
