
(function($, window, document) {
  'use strict';


  var ttsOptions = {
    key: 'd7295ca2365948b9b40d8b35bc1a4ffe',
    hl: 'en-us',
    r: -3, // speech rate from -10 to 10
    c: 'mp3',
    f: '48khz_16bit_mono',
    ssml: false
  };

  var cardStyles = ['', 'bg-light', 'bg-dark text-white', 'bg-primary text-white', 'bg-secondary text-white', 'bg-success text-white', 'bg-danger text-white', 'bg-warning text-white', 'bg-info text-white'];




  /**
   * Convert title attributs into tooltips
   */

  $('[title]').tooltip();



  /**
   * Convert dl to flexbox cards
   */

  var $dl, $dt, $dd, id;
  var $container = $('.definition-list');
  var $dls = $container.find('dl');
  var $titles = $container.find('h2, h3, h4');

  if ($dls) {
    console.time('Definition list generation');


    /**
     * Get the definition language for TTS
     */

    var dtLang = $('html').attr('lang').replace(/^([a-z]{2})$/gi, '$1-$1');
    var ddLang = $container.data('definition-lang');


    /**
     * Make container flex
     */

    //$dls.addClass('d-flex flex-row flex-wrap m-0');
    $container.addClass('d-flex flex-row flex-wrap align-items-stretch align-self-stretch justify-content-between m-0');



    /**
     * Wrap dt+dd's in Bootstrap cards
     */

    $dls.each(function() {
      $dl = $(this);
      var html = '';
      var $section = $dl.prev('h2, h3, h4').filter('[id]').first();
      var sectionId = $section.attr('id');
      var sectionLabel = $section.html();

      $dl.find('dt').each(function(i) {
        $dt = $(this);
        $dd = $dt.next('dd');
        //id = id.replace(/[^\w]+/g,'-');
        //id = $dt.text().trim().toLowerCase();
        id = $dt.html();
        //id = window.location.pathname + ':' + id;
        id = encodeURIComponent(id);
        //id = encodeURIComponent(id).replace(/[\%]/g,'').replace(/[\W]+/g,'-');

        /**
         * Random card color
         */

        //var cardStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];
        var cardStyle = cardStyles[1];

        /*
        $dt.add($dd)
        .wrapAll('<label><div class="card m-1"><div class="card-body"></div></div></label>')
        $dt.parents('label')
        .prepend('<input type="checkbox" id="' + id + '" />');
        $dt.replaceWith('<h4 class="card-title">' + $dt.html() + '</h4>');
        $dd.replaceWith('<p class="card-text">' + $dd.html() + '</p>');
        */
        /*
        $dt.add($dd).replaceWith(
        '<label><input type="checkbox" id="' + id + '" />'
        + '<div class="card m-1"><div class="card-body">'
        + '<h4 class="card-title">' + $dt.html() + '</h4>'
        + '<p class="card-text">' + $dd.html() + '</p>'
        +'</div></div>'
        + '</label>');
        */

        html = html
        + '<label class="m-0" '
        + (sectionId && i === 0 ? 'id="' + sectionId + '" data-label="' + sectionLabel + '"' : '') + ' '
        + (sectionId ? ' data-section="' + sectionId + '"' : '') + '>'
        + '<input type="checkbox" id="' + id + '" class="d-none" />'
        + '<div class="card ' + cardStyle + ' m-2">'
        + '<div class="card-body">'
        + '<h4 class="card-title h5">' + $dt.html() + '</h4>'
        //+ '<h4 class="card-title h5"' + (i === 0 ? 'id="' + section + '"' : '') + ' >' + $dt.html() + '</h4>'
        + '<p class="card-text">'
        + ((dtLang && ddLang) ? '<a class="btn btn-link btn-sm pull-right btn-tts" href="#" role="button"><i class="fa fa-volume-up"></i></a>' : '')
        + $dd.html() + '</p>'
        + '</div>'
        + '</div>'
        + '</label>';

      });

      $dl.replaceWith(html);

    });



    /**
     * Wrap title's in Bootstrap cards
     */

    //$dls.prev('h2, h3, h4')
    $titles.each(function () {
      var $title = $(this);
      var id = $title.attr('id') || encodeURIComponent($title.text());
      /*
      $title
      .addClass('card-title')
      .wrapAll('<div class="card bg-light m-1"><div class="card-body"></div></div>');
      */
      /*
      $title.replaceWith(
        '<div class="card m-2 d-none card-section">'
        + '<div class="card-body d-flex bg-faded text-muted text-center">'
        + '<h2 class="card-title h6 m-auto" ' + ((id) ? ' id="' + id + '"' : '') + '>'
        //+ '<h2 class="card-title h6 m-auto">'
        + $title.html()
        //+ '<i class="fa fa-chevron-right fa-2x d-block mt-1" aria-hidden="true"></i>'
        + '</h2>'
        + '</div>'
        + '</div>'
      );
      */
      $title.replaceWith('');
    });



    /**
     * Initialize the Text To Speech button (voicerss.org)
     */

    //var dtLang = $('html').attr('lang');
    //dtLang = dtLang.replace(/^([a-z]{2})$/gi, '$1-$1');
    //var ddLang = $container.data('definition-lang');
    //var $buttons = $('.btn-tts');
    if (dtLang && ddLang) {
      //$dls.find('dd').prepend('<button type="button" class="btn btn-link btn-sm pull-right btn-tts"><i class="fa fa-volume-up"></i></button>');
      $container.on('click', '.btn-tts', function(e) {
        //var html = $(this).closest('.card').find('dd').html();
        var html = $(this).closest('.card').find('.card-text').html();
        var $el = $('<div>').html(html);
        $el.find('em').remove();
        ttsOptions.hl = ddLang;
        ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
        $.speech(ttsOptions);
      });
    }
    //} else {
    //  $container.find('.btn-tts').hide();
    //}


    /**
     * then unhide post content once everything is in place
     */

    $container.css('visibility', 'visible');

    console.timeEnd('Definition list generation');
  }



  /**
   * Generate index from titles
   */

  var $nav = $('#index');
  if ($nav) {
    var navItems = '';
    var $title;
    var $titles = $('.post-content').find('h2, h4.card-title, h5.card-title, h6.card-title, [data-section]').filter('[id]');
    if ($titles) {
      $titles.each(function () {
        $title = $(this);
        navItems = navItems + '<li class="nav-item">'
        + '<a class="nav-link" href="#' + $title.attr('id') + '">' + ($title.attr('data-label') || $title.html()) + '</a>'
        + '</li>';
      });
      $nav.append(navItems);
      var paddingTop = parseInt($('body').css('padding-top')) || 0;
      $('body').scrollspy({
        target: $nav,
        offset: paddingTop
      });
    } else {
      //$nav.parents('.col').first().hide();
      $nav.parents('.collapse').first().collapse({
        toggle: false
      });
    }
  }



  /**
   * Searchbox filter
   */

  //$('.searchbox-input').change( function () {
  //$('.card').show();
  //var filter = $(this).val();
  //$('.container')
  //.find(".card-title:not(:contains(" + filter + "))")
  //.parent()
  //.css('display','none');
  //});



  /**
   * Smooth scroll with anchors
   */

  var scrollTopDuration = 1000;
  $('a[href*="#"]').filter('[href*="#"]:not([href="#"]):not([data-toggle])').click(function (e) {
    //e.preventDefault();
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var $target = $(this.hash) || $('[name=' + this.hash.slice(1) +']');
      //var $target = $(this.hash).length ? $(this.hash) : $('[name=' + this.hash.slice(1) +']');
      //$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {

        var $parents = $target.parents('.card');
        if ($parents.length > 0) {
          var top = $parents.first().offset().top;
        } else {
          var top = $target.offset().top;
        }

        var paddingTop = parseInt($('body').css('padding-top')) || 0;

        // Scroll up to target
        $('html, body').stop().animate({
          scrollTop: top - paddingTop
        }, scrollTopDuration, 'swing', function () {
          // Blink target (or section cards if exists)

          var $sectionItems = $('[data-section="' + $target.attr('id') + '"]');
          if ($sectionItems.length > 0) {
            var $highlighted = $sectionItems;
          } else if ($target.is('a')) {
            var $highlighted = $target;
          }

          if ($highlighted) {
            var duration = 300;
            var repeat = 2;
            var interval = setInterval(function () {
              $highlighted.fadeToggle(duration);
            }, duration);
            setTimeout(function () {
              clearInterval(interval);
              $highlighted.fadeIn(duration);
            }, duration * repeat - duration);
          }

        });

        return false;

      }
    }
  });



  /**
   * Show/hide the scroll-to-top button according to scrollbar position
   */

  var scrollTopOffset;
  var scrollTopButtonFadeDuration = 300;
  var $link = $('a[href="#top"]');
  if ($link) {
    $link.fadeOut();         
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > (scrollTopOffset || $(window).height())) {
        $link.stop().fadeTo(scrollTopButtonFadeDuration, 1);
      } else {
        $link.stop().fadeOut(scrollTopButtonFadeDuration);
      }
    });
  }



  /**
   * Card filter
   */

  var filter = function (action) {
    var $togglers = $('.filter-toggler:checked');
    var $targets = $('.filter-target');
    $targets.show();
    if (action !== false) {
      $togglers.each(function () {
        var target = $(this).attr('data-filter');
        if (target) {
          $targets.not(target).filter(':visible').hide();
        }
      });
    }
  };
  // Filter elements only when options are visible
  var $collapses = $('.collapse').filter('#post_list_options');
  $collapses.on('show.bs.collapse', function () {
    filter();
    $('.filter-toggler').change(function () {
      filter(true);
    });
  });
  $collapses.on('hide.bs.collapse', function () {
    filter(false);
    $('.filter-toggler').stop('change');
  });



  /**
   * Add/remove .active class to collapse togglers
   */

  var $collapses = $('.collapse').filter('[id]');
  $collapses.on('shown.bs.collapse', function () {
    $('.btn[data-target="#' + this.id + '"]').addClass('active');
  });
  $collapses.on('hidden.bs.collapse', function () {
    $('.btn[data-target="#' + this.id + '"]').removeClass('active');
  });



  /**
   * Store checkboxes & radios
   */

  if (window.localStorage) {
    console.time('Local storage features');

    var namespace = encodeURIComponent(window.location.pathname);

    /**
     * Store / restore checked definitions
     */
    var $inputs = $(':checkbox, :radio'); //.filter('[id]');
    if ($inputs) {
      var $input, key, value;
      $inputs.each(function () {
        $input = $(this);

        key = $input.attr('name');
        if (key) {
          value = JSON.parse(localStorage.getItem(namespace + ':' + key));
          if (value === $input.attr('value')) {
            $input.prop('checked', true).trigger('change');
            //console.log('restored', key, value);
          }
        } else {
          key = $input.attr('id');
          value = JSON.parse(localStorage.getItem(namespace + ':' + key));
          if (key && value !== null) {
            $input.prop('checked', value).trigger('change');
            //console.log('restored', key, value);
          }
        }
      });
      $inputs.on('change', function () {
        $input = $(this);
        key = $input.attr('name') || $input.attr('id');
        if (key) {
          value = JSON.stringify($input.attr('value') || $input.prop('checked'));
          localStorage.setItem(namespace + ':' + key, value);
          //console.log('stored', key, value);
        }
      });
    }


    /**
     * Keep alerts closed
     */

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


    /**
     * Restore toggled elements
     */

    var $collapses = $('.collapse').filter('[id]');
    $collapses.on('hidden.bs.collapse', function () {
      localStorage.removeItem(namespace + ':' + this.id + '_collapse', JSON.stringify(false));
    });
    $collapses.on('shown.bs.collapse', function () {
      localStorage.setItem(namespace + ':' + this.id + '_collapse', JSON.stringify(true));
    });
    $collapses.each(function () {
      var value = JSON.parse(localStorage.getItem(namespace + ':' + this.id + '_collapse'));
      if (value === true) {
        $(this).collapse('show');
      }
    });

    console.timeEnd('Local storage features');
  }



})(window.jQuery, window, document);
