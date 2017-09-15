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
      //console.log('Unvalid id', id, string);
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

    $container.addClass('d-flex flex-row flex-wrap align-items-stretch align-self-stretch justify-content-between');



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
        + '<label for="flipcard_' + id + '" class="m-0" '
        + (sectionId && i === 0 ? 'id="' + sectionId + '" data-label="' + sectionLabel + '"' : '') + ' '
        + (sectionId ? ' data-section="' + sectionId + '"' : '') + '>'
        + '<input type="radio" id="flipcard_' + id + '" name="visible-definition" value="' + id + '" class="d-none" />'
        + '<figure class="card card-flip m-1">'
        + '<div class="card bg-dark text-muted">'
        + '<div class="card-body d-flex justify-content-center align-items-center">'
        + '<h4 class="card-title h6 m-0">' + $dt.html().replace(/\(([^()]*)\)/g, '').replace(/\[([^\[\]]*)\]/g, '') + '</h4>'
        + '</div>'
        + '</div>'
        + '<div class="card bg-white text-dark">'
        + '<div class="card-body pb-0">'
        //+ '<h4 class="card-title h5 mb-0">' + $dt.html().replace(/\(([^()]*)\)/g, '<span class="text-muted">($1)</span>').replace(/\[([^\[\]]*)\]/g, '<sup class="text-info">($1)</sup>') + '</h4>'
        //+ (($.speech && dtLang && ddLang) ? '<a class="btn btn-link btn-sm pull-right btn-tts" href="#" role="button"><i class="fa fa-volume-up"></i></a>' : '')
        + '<p class="card-text">'
        + $dd.html()
        + '</p>'
        + '</div>'
        + '<div class="card-footer bg-transparent border-0 p-0">'
        //+ '<div class="btn-group" data-toggle="buttons"><label class="btn btn-secondary"><input type="checkbox" autocomplete="off"><i class="fa fa-check fa-lg" aria-hidden="false"></i></label></div>'
        + '<div class="btn-group -btn-group-lg d-flex" data-toggle="buttons">'
        + (($.speech && dtLang && ddLang) ? '<button class="btn btn-sm btn-light text-muted w-100 btn-tts" type="button"><i class="fa fa-volume-up fa-lg" aria-hidden="false"></i></button>' : '')
        //+ (($.speech && dtLang && ddLang) ? '<label class="btn btn-light text-muted w-100 btn-tts"><input type="checkbox" autocomplete="off"><i class="fa fa-volume-up fa-lg" aria-hidden="false"></i></label>' : '')
        + '<label for="' + id + '" class="btn btn-light text-muted w-100"><input type="checkbox"  id="' + id + '" class="-d-none memorized" autocomplete="off"><i class="fa fa-check fa-lg" aria-hidden="false"></i></label>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</figure>'
        + '</label>';

      });

      //html = '<div class="d-flex flex-row flex-wrap align-items-stretch align-self-stretch justify-content-between">' + html + '</div>';
      $dl.replaceWith(html);

    });



    /**
    * Wrap title's in Bootstrap cards
    */

    //$dls.prev('h2, h3, h4')
    $titles.each(function () {
      var $title = $(this);
      //var id = $title.attr('id') || encodeURIComponent($title.text());
      $title.replaceWith('');
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
    });



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
      }
    }



    /**
    * Initialize the Text To Speech button (voicerss.org)
    */

    if ($.speech && dtLang && ddLang) {
      $container.on('click', '.btn-tts', function(e) {
        e.preventDefault();
        //var html = $(this).closest('.card').find('dd').html();
        var $button = $(this);
        var html = $button.closest('.card').find('.card-text').html();
        var $el = $('<div>').html(html);
        $el.find('*').remove();
        ttsOptions.hl = ddLang;
        ttsOptions.src = $el.text().replace(/s*\([^()]*\)/, '');
        $.speech(ttsOptions);
        //$button.show().removeAttr('hidden');
      });
    }



    /**
    * Toggle memorized card style
    */

    $container.on('change', '.memorized', function () {
      var $input = $(this);
      var $parent = $input.parents('.card-flip').first();
      var $card = $parent.find('.card').first();
      var checked = $input.prop('checked');
      $card.toggleClass('bg-dark text-muted', !checked);
      $card.toggleClass('bg-success text-white', checked);
    });



    /**
    * Phen unhide post content once everything is in place
    */

    $container.removeClass('spinner spinner-fullscreen spinner-bg fa fa-spinner');

    console.timeEnd('Definition list generation');
  }

})(window.jQuery, window, document);
{% endraw %}
