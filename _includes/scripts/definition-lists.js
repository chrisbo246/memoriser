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

    if (typeof string !== 'string') {
      string = '';
    }
    string = string.trim();

    if (string.length > 0) {
      var id = Base64.encode(string + ((i) ? '_' + i : ''));
      if ($.inArray(id, validIds) === -1) {
        validIds.push(id);
        return id;
      } else {
        ++i;
        return validId(string, i || 2);
      }
    }

    return string;

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
        id = $dt.html();
        id = validId(id);


        //var cardStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];
        var cardStyle = cardStyles[1];

        html = html
        + '<input type="radio" id="flipcard_position_' + id + '" name="visible_definition" value="' + id + '" class="flipcard-position d-none" />'
        + '<div class="card card-flip m-1"'
        + (sectionId && i === 0 ? ' id="' + sectionId + '" data-label="' + sectionLabel + '"' : '')
        + (sectionId ? ' data-section="' + sectionId + '"' : '')
        + '>'
        + '<label for="flipcard_position_' + id + '" class="m-0">'
        + '<div class="card front card-position-absolute bg-dark text-muted">'
        + '<div class="card-body d-flex justify-content-center align-items-center">'
        + '<h4 class="card-title m-0">' + $dt.html().replace(/\(([^()]*)\)/g, '<small>($1)</small>').replace(/\[([^\[\]]*)\]/g, '<sup class="text-info">$1</sup>') + '</h4>'
        + '</div>'
        + '</div>'
        + '</label>'
        + '<div class="card back bg-white text-dark">'
        + '<div class="card-body pb-0">'
        + '<p class="card-text">'
        + $dd.html()
        + '</p>'
        + '</div>'
        + '<div class="card-footer bg-transparent border-0 p-0">'
        + '<div class="btn-group -btn-group-lg d-flex" data-toggle="buttons">'
        + '<label for="unmemorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.unknown_definition }}{% raw %}"><input type="radio" id="unmemorized_definition_' + id + '" name="memorized_definition_' + id + '" value="0" class="unmemorized" autocomplete="off"><i class="fa fa-times fa-lg" aria-hidden="false"></i></label>'
        + (($.speech && dtLang && ddLang) ? '<button class="btn btn-sm btn-light text-muted w-100 btn-tts" type="button" title="{% endraw %}{{ t.listen }}{% raw %}"><i class="fa fa-volume-up fa-lg" aria-hidden="false"></i></button>' : '')
        + '<label for="memorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.known_definition }}{% raw %}"><input type="radio" id="memorized_definition_' + id + '" name="memorized_definition_' + id + '" value="1" class="memorized" autocomplete="off"><i class="fa fa-check fa-lg" aria-hidden="false"></i></label>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

      });

      html = html + '<input type="radio" id="flipcard_toggler_none" name="visible_definition" value="none" class="d-none" checked />';
      $dl.replaceWith(html);


      //html = '<div class="d-flex flex-row flex-wrap align-items-stretch align-self-stretch justify-content-between">' + html + '</div>';

    });





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
        $button.button('toggle');
      });
    }



    /**
    * Toggle memorized card style and store progression
    */

    $container.on('change', 'input[name^="memorized_definition_"]', function(e) {
      var $input = $(this);
      var $parent = $input.parents('.card-flip').first();
      var $card = $parent.find('.card').first();
      var checked = $input.is('[value="1"]:checked');
      $card.toggleClass('bg-dark text-muted', !checked);
      $card.toggleClass('bg-success text-white', checked);
      // Memorize progression
      if (window.localStorage) {
        var $inputs = $('input[name^="memorized_definition_"][value="1"]');
        //var namespace = encodeURIComponent(window.location.pathname);
        var namespace = $container.attr('data-id');
        var key = 'progress';
        var value = ($inputs.filter(':checked').length / $inputs.length * 100) || 0;
        var $progress = $container.find('.progress');
        $progress
          .find('.progress-bar')
          .css('width', value + '%')
          .html(value.toFixed() + '%')
          .attr('aria-valuenow', value.toFixed());
        value = JSON.stringify(value);
        localStorage.setItem(namespace + ':' + key, value);
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
