
function buildUrl(url, params) {
    var encodedParams = $.param(params || {});
    return url + '?' + encodedParams;
}

