
(function($, window, document) {
  'use strict';


  var ttsOptions = {
    key: 'd7295ca2365948b9b40d8b35bc1a4ffe',
    hl: 'en-us',
    r: -2, // speech rate from -10 to 10
    c: 'mp3',
    f: '48khz_16bit_mono',
    ssml: false
  };



  $(function () {

    $('[title]').tooltip();

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
        .wrapAll('<div class="card-body"></div>');
        $(this).parents('label')
        .prepend('<input type="checkbox" id="' + id + '" />');
        //.prepend('<a class="tts fa fa-ok" data-tts-text="' + id + '" ></a>');

      });

      // Text To Speech API (voicerss.org)
      var dtLang = $('html').attr('lang');
      dtLang = dtLang.replace(/^([a-z]{2})$/gi, '$1-$1');
      var ddLang = $container.data('definition-lang');
      if (dtLang && ddLang) {
        //$dls.find('.card-block').append('<button type="button" class="btn btn-outline-secondary btn-sm pull-right btn-tts"><i class="fa fa-play text-muted"></i></button>');
        //$dls.find('.card').append('<button type="button" class="btn -btn-outline-secondary btn-sm btn-tts"><i class="fa fa-play"></i></button>');
        //$dls.find('.card').append('<a href="#" class="card-link btn-tts"><i class="fa fa-play text-muted"></i></a>');
        //$dls.find('dd').addClass('btn-tts');
        $dls.find('dd').prepend('<button type="button" class="btn btn-link btn-sm pull-right btn-tts"><i class="fa fa-volume-up"></i></button>');
        //$dls.find('.card-block').prepend('<button type="button" class="btn btn-outline-secondary btn-sm pull-right btn-tts"><i class="fa fa-play"></i></button>');
        /*
        $dls.on('mouseenter', 'dt', function() {
          var html = $(this).html();
          var $el = $('<div>').html(html);
          $el.find('em').remove();
          ttsOptions.hl = dtLang;
          ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
          //console.log(ttsOptions);
          $.speech(ttsOptions);
        });
        */
        //$dls.on('mouseenter', 'dd', function() {
        //  var html = $(this).html();
        $dls.on('click', '.btn-tts', function(e) {
          //e.stopPropagation();
          var html = $(this).closest('.card').find('dd').html();
          var $el = $('<div>').html(html);
          $el.find('em').remove();
          ttsOptions.hl = ddLang;
          ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
          //console.log(ttsOptions);
          $.speech(ttsOptions);
        });
      }

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


    // Generate index from titles
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
        $nav.append(navItems);
        var offset = $('.navbar.fixed-top').first().outerHeight(true);
        $('body').scrollspy({
          target: $nav,
          offset: offset
        });
      } else {
        //$nav.parent('.card');
        console.log('Hide index');
        $nav.parents('.col').first().hide();
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


    // Card filter
    var filter = function () {
      var $togglers = $('.filter-toggler:checked');
      var $targets = $('.filter-target');
      $targets.show();
      $togglers.each(function () {
        var target = $(this).attr('data-filter');
        if (target) {
          $targets.not(target).filter(':visible').hide();
        }
      });
    };

    filter();

    $('.filter-toggler').change(function () {
      console.log('click');
      filter();
    });


  });

})(window.jQuery, window, document);
