'use strict';
function webFonts () {

    var css_href = '/web-fonts/css/style.css?v=4';

    function on(el, ev, callback) {

        if ( el.addEventListener ) {

            el.addEventListener(ev, callback, false);

        } else if (el.attachEvent) {

            el.attachEvent("on" + ev, callback);

        }

    }

    injectFontsStylesheet();

    function fileIsCached(href) {

        return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);

    }

    function injectFontsStylesheet() {

        if (!window.localStorage || !window.XMLHttpRequest) {

            var stylesheet = document.createElement('link');
            stylesheet.href = css_href;
            stylesheet.rel = 'stylesheet';
            stylesheet.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(stylesheet);

            document.cookie = "font_css_cache";

        } else {

            if (fileIsCached(css_href)) {

                injectRawStyle(localStorage.font_css_cache);

            } else {

                var xhr = new XMLHttpRequest();
                xhr.open("GET", css_href, true);
                on(xhr, 'load', function () {
                    if (xhr.readyState === 4) {

                        injectRawStyle(xhr.responseText);

                        try {
                            localStorage.font_css_cache = xhr.responseText;
                            localStorage.font_css_cache_file = css_href;

                            if( typeof $ !== 'undefined' ) {
                                //setTimeout(setEqualHeightEachRowElems, 500);
                            }

                        } catch (e) {
                            Storage.prototype._setItem = Storage.prototype.setItem;
                            Storage.prototype.setItem = function() {};
                            alert('Your web browser does not support storing settings locally. The most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
                        }

                    }
                });
                xhr.send();
            }
        }

    }


    function injectRawStyle(text) {

        if ( !(/MSIE 8\.0|MSIE 7\.0|MSIE 6\.0/).test(navigator.userAgent) ) {

            var style = document.createElement('style');

            style.innerHTML = text;

            document.getElementsByTagName('head')[0].appendChild(style);

        }

    }

    if( typeof $ !== 'undefined' ) {
        // setTimeout(setEqualHeightEachRowElems, 500);
    }

}

// Including web fonts
try {

    webFonts();

} catch ( error ) {

    localStorage.clear();
    webFonts();

}
