
/**
* Translate the page using the Yandex translate API
* @module
* @see https://tech.yandex.com/translate/
*/
var YandexTranslate = (function () {
    /*eslint-enable no-unused-vars*/
    'use strict';

    /**
    * Make a request to the Yandex translate API
    * @param {String} url Mediawiki base URL
    * @param {Object} params Request parameters
    * @return {Object} jQuery promise
    * @see https://tech.yandex.com/translate/doc/dg/reference/translate-docpage/
    */
    var request = function (params) {

        params = $.extend({}, {
            //key: '',
            lang: 'en', // en | fr-en
            format : 'plain' // plain | html
            //text: '', // some text to translate
            //options: 1, // automatically detected language
            //callback: '' // Callback function
        }, params);

        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

        console.log('Yandex translate request', url + '?' + $.param(params));

        return $.ajax({
            type: 'GET',
            url: url,
            data: params,
            contentType: 'application/json; charset=utf-8',
            async: true,
            dataType: 'jsonp',
            headers: {
                'Api-User-Agent': document.apiUserAgent || location.hostname + '/1.0',
                'Origin': document.origin || location.origin
                //'Content-Type': 'application/json; charset=UTF-8'
            },
            //timeout: 5000, // Uncaught ReferenceError:
            success: function (data, textStatus, jqXHR) {
                console.log('Yandex translate request', 'done');
                if (data.warnings) {
                    console.warn(data.warnings.main['*']);
                }
            },
            error: function (errorMessage) {
                console.warn('Yandex translate request', errorMessage, url + '?' + $.param(params));
            }
        });

    };

    $(function() {

        if (typeof yandexTranslateParams === 'object' && yandexTranslateParams.key && yandexTranslateParams.lang) {

            var params = $.extend({}, {
                format: 'html'
            }, yandexTranslateParams);

            //params.text = $('html').html().replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");
            params.text = $('body').html();
            request(params).done(function (html) {
                $('body').html(html);
                $('.yandex-translate-mention').html('<a href="http://translate.yandex.com/" target="_blank">Powered by Yandex.Translate</a>');
                //<a href="http://translate.yandex.com/" target="_blank">Powered by Yandex.Translate</a>
            });

        }

    });

})();
