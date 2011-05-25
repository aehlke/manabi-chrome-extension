(function(){
    var existingPopup = null;

    var _createPopup = function(href, reusableHref, width, height) {
        // Reuses any existing open popup, to avoid asking the user to select a deck again.
        // `reusableHref` is the href we'll use by default if we reuse a window.
        if (existingPopup) {
            chrome.windows.remove(existingPopup.winId);
        }
        existingPopup = {reusableHref:reusableHref};
        chrome.windows.create({
            url:href, type:'popup',
            width:width||576, height:height||680
        }, function(win){
            existingPopup.winId = win.id;
        });
    };

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.cmd == 'create-popup') {
            _createPopup(request.href, request.reusableHref,
                         request.width, request.height);
        } else if (request.cmd == 'update-existing-popup-info') {
            existingPopup = existingPopup || {};
            existingPopup.href = request.href;
            existingPopup.reusableHref = request.reusableHref;
        }
    });

    // Detect when the existing popup is closed.
    chrome.windows.onRemoved.addListener(function(winId){
        if (existingPopup && existingPopup.winId == winId) {
            existingPopup = null;
        }
    });

    chrome.contextMenus.create({
        title: "Create Flashcards for '%s'",
        contexts: ['selection'],
        onclick: function(info, tab) {
            var reusableHref = null;
            var baseUrl = config.deckChooserUrl;

            if (existingPopup && existingPopup.reusableHref) {
                baseUrl = reusableHref = existingPopup.reusableHref;
            }

            var url = buildUrl(baseUrl, {'expression': info.selectionText,
                                         '_popup': false});

            _createPopup(url, reusableHref, 576, 580);
        }
    });
})();

