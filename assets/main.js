
(function($, window, document) {
    'use strict';

    $(function () {

        // Searchbox filter
        $('.searchbox-input').change( function () {
            $('.card').show();
            var filter = $(this).val();
            $('.container')
                .find(".card-title:not(:contains(" + filter + "))")
                .parent()
                .css('display','none');
        });

        // Convert dl to flexbox cards
        var $dt, $dd, id;
        var $container = $('.definition-list');
        var $dls = $container.find('dl');
        if ($dls) {
            $dls.addClass('d-flex flex-row flex-wrap'); // justify-content-center align-content-center

            // Wrap dt+dd's
            $dls.find('dt').each(function() {
                $dt = $(this);
                $dd = $dt.next('dd');
                id = $dt.text().trim().toLowerCase();
                //id = id.replace(/[^\w]+/g,'-');
                id = window.location.pathname + ':' + id;
                $(this)
                    .add($dd)
                    .wrapAll('<label></label>')
                    .wrapAll('<div class="card"></div>')
                    .wrapAll('<div class="card-block"></div>');
                $(this).parents('label').prepend('<input type="checkbox" id="' + id + '" />');
            });

            // Store / restore checked definitions
            if (window.localStorage) {
                var $input, key, value;
                var $inputs = $dls.find('input[type="checkbox"]');
                $inputs.each(function () {
                    $input = $(this);
                    key = $input.attr('id');
                    value = JSON.parse(localStorage.getItem(key));
                    if (value !== null) {
                        $input.prop('checked', value);
                    }
                });
                $inputs.on('change', function () {
                    $input = $(this);
                    key = $input.attr('id');
                    value = JSON.stringify($input.prop('checked'));
                    localStorage.setItem(key, value);
                });
            }

            // Unhide post content once everything is in place
            $container.css('visibility', 'visible');
        }


        // Generate and index from titles
        var $nav = $('#index');
        if ($nav) {
            var navItems = '';
            var $title;
            var $titles = $('.post-content').find('h2').filter('[id]');
            if ($titles) {
                $titles.each(function () {
                    $title = $(this);
                    navItems = navItems + '<li class="nav-item">'
                    + '<a class="nav-link" href="#' + $title.attr('id') + '">' + $title.html() + '</a>'
                    + '</li>';
                });
                $nav.html(navItems);
                $('body').scrollspy({
                    target: $nav
                });
            } else {
                $nav.parent('.card');
            }
        }


        // Smooth scroll with anchors
        $('a[href*="#"]').filter('[href*="#"]:not([href="#"]):not([data-toggle])').click(function (e) {
            e.preventDefault();
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top
                    }, 1000, 'swing');
                    return false;
                }
            }
        });


        // Keep closed alert closed
        if (window.localStorage) {
            var $alert, key, value;
            var $alerts = $('.alert-dismissible').filter('[id]');
            $alerts.each(function () {
                $alert = $(this);
                key = $alert.attr('id');
                value = JSON.parse(localStorage.getItem(key));
                if (value === 'closed') {
                    $alert.attr('hidden', '');
                } else {
                    $alert.removeAttr('hidden');
                }
            });
            $alerts.on('closed.bs.alert', function () {
                $alert = $(this);
                key = $alert.attr('id');
                value = JSON.stringify('closed');
                localStorage.setItem(key, value);
            });
        }

    });

})(window.jQuery, window, document);
