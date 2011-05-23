
function getDeckChooserUrl(params) {
    var url = config.deckChooserUrl + '?';
    var encodedParams = $.param(params || {});
    return url + encodedParams;
}

