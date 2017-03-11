// https://developers.google.com/apis-explorer/?hl=fr#p/customsearch/v1/search.cse.list
// https://cse.google.com/cse/create/congrats?cx=010519152577403764844%3Abnwi1-xxidi

// 1 - Create a new app to get your key
// https://developers.google.com/custom-search/json-api/v1/overview

// 2 - Create a custom search engine to get your cx
// https://cse.google.com/cse/create/new

(function($, window, document) {
    'use strict';

    $(function () {

        var url = 'https://www.googleapis.com/customsearch/v1';

        var params = {
            q: '',
            cx: '010519152577403764844:bnwi1-xxidi',
            imgSize: 'large',
            imgType: 'photo',
            lr: 'lang_fr',
            num: 1,
            //rights: 'cc_publicdomain',
            safe: 'medium',
            searchType: 'image',
            //siteSearch: 'wikimedia.org',
            key: 'AIzaSyBE31A3kNRbE93MuWYTYasx1fzjHAx4bJ0'
        };

        var restoreItems = function(key) {
            var value;
            if (window.localStorage && key) {
                value = localStorage.getItem(key);
                if (value !== 'undefined') {
                    value = JSON.parse(value);
                }
            }
            return value;
        }

        var storeItems = function(key, value) {
            if (window.localStorage && key) {
                var value = JSON.stringify(value);
                localStorage.setItem(key, value);
            }
        }

        var insert = function($block, data, alt) {
            if ($block && data) {
                var html = '<img class="card-img img-fluid" src="' + data.thumbnailLink + '"'
                + ' width="' + data.thumbnailWidth + '"'
                + ' height="' + data.thumbnailHeight + '"'
                + ' alt="' + alt + '"'
                + ' />';
                $block.before(html);
                $block.removeClass('card-block').addClass('card-img-overlay');
                $block.closest('.card').addClass('card-inverse');
            }
        };


        var $keywords = $('dl.dl-flexbox').find('dt');
        $keywords.each(function () {

            var $block = $(this);
            var key = $block.text();
            var q = key + ' filetype:jpg';
            var hq = $block.closest('dl').prev('h2').text();
            //var hq = $block.next('dd').text();
            console.log(key, hq);

            if (q) {
                var items = restoreItems(key);
                if (items) {
                    console.log('Image data restored', items);
                    insert($block.closest('.card-block'), items[0].image, key);
                } else {
                    params.q = q;
                    params.hq = hq;
                    console.log(url + '?' + $.param(params));
                    $.getJSON(url, params, function(data) {
                        if (data && data.items && data.items[0]) {
                            items = data.items;
                            console.log('Image data returned', items);
                            storeItems(key, items);
                            insert($block.closest('.card-block'), items[0].image, key);
                        }
                    });
                }
            }

        });

    });

})(window.jQuery, window, document);
