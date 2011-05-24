
var getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};


$(function(){
    // Get field prefill options from the GET params.
    var encodedParams = window.location.search;

    // Make the links open a dialog instead, if _popup=true is in the URL query string.
    $('.create_cards .deck_list a').click(function(evt){
        evt.preventDefault();
        var href = window.location.origin + $(this).attr('href') + encodedParams;

        var doPopup = getParameterByName('_popup');
        if (doPopup && doPopup.toLowerCase() == 'true') {
            chrome.extension.sendRequest({cmd: 'create-popup', href: href});
        } else {
            window.location = href;
        }
    });
});



