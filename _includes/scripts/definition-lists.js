{% raw %}

(function ($, window, document) {
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
  * Encode id string and add a suffix if not unique
  */

  var validIds = [];
  var validId = function (string, i) {

    var id = Base64.encode(string.trim() || 'undefined') + ((i > 0) ? '_' + i : '');

    if ($.inArray(id, validIds) !== -1) {
      return validId(string, i++ || 1);
    } else {
      validIds.push(id);
      return id;
    }

  }



  /**
  * Convert dl to flexbox cards
  */

  var $dl, $dt, $dd, id;
  var $container = $('.definition-list');
  var $dls = $container.find('dl');
  var $titles = $container.find('h2, h3, h4');

  if ($dls.length) {
    console.time('Definition list generation');


    /**
    * Get the definition language for TTS
    */

    var dtLang = $('html').attr('lang').replace(/^([a-z]{2})$/gi, '$1-$1');
    var ddLang = $container.data('definition-lang');



    /**
    * Make container flex
    */

    $container.addClass('d-flex flex-row flex-wrap align-items-stretch align-self-stretch -justify-content-between');



    /**
    * Make normal text full width
    */
    $dls.add($titles).first().prevAll().wrapAll('<div class="w-100"></div>');//'<div class="card w-100"><div class="card-body"></div></div>');
    $dls.nextUntil('dl, h2, h3, h4').wrapAll('<div class="w-100"></div>');//'<div class="card w-100"><div class="card-body"></div></div>');



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
        id = validId($dt.html());


        //var cardStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];
        var cardStyle = cardStyles[1];

        html = html
        + '<label for="flipcard_toggler_' + id + '" class="m-0" '
        + (sectionId && i === 0 ? 'id="' + sectionId + '" data-label="' + sectionLabel + '"' : '') + ' '
        + (sectionId ? ' data-section="' + sectionId + '"' : '') + '>'
        + '<input type="radio" id="flipcard_toggler_' + id + '" name="visible_definition" value="' + id + '" class="d-none" />'
        + '<figure class="card card-flip m-1">'
        + '<div class="card front card-position-absolute bg-dark text-muted">'
        + '<div class="card-body d-flex justify-content-center align-items-center">'
        + '<h4 class="card-title h6 m-0">' + $dt.html().replace(/\(([^()]*)\)/g, '<small class="text-muted">($1)</small>').replace(/\[([^\[\]]*)\]/g, '<sup class="text-info">$1</sup>') + '</h4>'
        + '</div>'
        + '</div>'
        + '<div class="card back bg-white text-dark">'
        + '<div class="card-body pb-0">'
        + '<p class="card-text">'
        + $dd.html()
        + '</p>'
        + '</div>'
        + '<div class="card-footer bg-transparent border-0 p-0">'
        + '<div class="btn-group -btn-group-lg d-flex" data-toggle="buttons">'
        + '<label for="unmemorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler"><input type="radio" id="unmemorized_definition_' + id + '" name="memorized_definition_' + id + '" value="0" autocomplete="off"><i class="fa fa-times fa-lg" aria-hidden="false"></i></label>'
        + (($.speech && dtLang && ddLang) ? '<button class="btn btn-sm btn-light text-muted w-100 btn-tts" type="button"><i class="fa fa-volume-up fa-lg" aria-hidden="false"></i></button>' : '')
        + '<label for="memorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler"><input type="radio" id="memorized_definition_' + id + '" name="memorized_definition_' + id + '" value="1" class="memorized" autocomplete="off"><i class="fa fa-check fa-lg" aria-hidden="false"></i></label>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</figure>'
        + '</label>';

      });

      //html = '<div class="d-flex flex-row flex-wrap align-items-stretch align-self-stretch justify-content-between">' + html + '</div>';

      $dl.replaceWith(html);

    });

    $container.append('<input type="radio" id="flipcard_toggler_none" name="visible_definition" value="none" class="d-none" checked />');



    /**
    * Wrap title's in Bootstrap cards
    */
    $titles.remove();
    //$dls.prev('h2, h3, h4')
    //$titles.each(function () {
    //var $title = $(this);
    //var id = $title.attr('id') || encodeURIComponent($title.text());
    ////$title.replaceWith('');
    //$title.replaceWith(
    //'<div class="card m-2 d-none card-section">'
    //+ '<div class="card-body d-flex bg-faded text-muted text-center">'
    //+ '<h2 class="card-title h6 m-auto" ' + ((id) ? ' id="' + id + '"' : '') + '>'
    ////+ '<h2 class="card-title h6 m-auto">'
    //+ $title.html()
    ////+ '<i class="fa fa-chevron-right fa-2x d-block mt-1" aria-hidden="true"></i>'
    //+ '</h2>'
    //+ '</div>'
    //+ '</div>'
    //);
    //});



    /**
    * Generate index from titles
    */

    var $nav = $('#index');
    if ($nav.length) {
      var navItems = '';
      var $title;
      var $titles = $('.post-content').find('h2, h4.card-title, label[data-section]').filter('[id]');
      if ($titles.length) {
        $titles.each(function () {
          $title = $(this);
          navItems = navItems + '<li class="nav-item">'
          + '<a class="nav-link" href="#' + $title.attr('id') + '">' + ($title.attr('data-label') || $title.html()) + '</a>'
          + '</li>';
        });
        $nav.append(navItems);
        var paddingTop = parseFloat($('body').css('padding-top')) || 0;
        $('body').scrollspy({
          target: $nav,
          offset: paddingTop
        });
      } else {
        $nav.parents('.collapse').first().collapse({
          toggle: false
        });
        $nav.closest('.card').prop('hidden', 'hidden');
      }
    }



    /**
    * Initialize the Text To Speech button (voicerss.org)
    */

    if ($.speech && dtLang && ddLang) {
      $container.on('click', '.btn-tts', function(e) {
        e.preventDefault();
        var $button = $(this);
        var html = $button.closest('.card').find('.card-text').html();
        var $el = $('<div>').html(html);
        $el.find('*').remove();
        ttsOptions.hl = ddLang;
        ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
        $.speech(ttsOptions);
      });
    }



    /**
    * Toggle memorized card style
    */

    $container.on('change', 'input[name^="memorized_definition_"]', function(e) {
      var $input = $(this);
      var $parent = $input.parents('.card-flip').first();
      var $card = $parent.find('.card').first();
      var checked = $input.is('[value="1"]:checked');
      $card.toggleClass('bg-dark text-muted', !checked);
      $card.toggleClass('bg-success text-white', checked);
    });



    /**
    * Force the flipcard to close when user click a checked radio
    */

    $container.on('click', '.flipcard-toggler', function(e) {
      var $input = $(this).parents('.card-flip').prev('input');
      if ($input) {
        var checked = $input.prop('checked');
        $input.prop('checked', !checked).trigger('change');
      }
    });



    /**
    * Phen unhide post content once everything is in place
    */

    $container.removeClass('spinner spinner-fullscreen spinner-bg fa fa-spinner');

    console.timeEnd('Definition list generation');
  }

})(window.jQuery, window, document);
{% endraw %}
