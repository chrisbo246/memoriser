{% raw %}
(function($) {
$.fn.randomize = function (childElem) {
  return this.each(function () {
      var $this = $(this);
      var elems = $this.children(childElem);
      elems.sort(function() { return (Math.round(Math.random())-0.5); });
      $this.detach(childElem);
      for (var i=0; i < elems.length; i++) {
        $this.append(elems[i]);
      }
  });
}
})(jQuery);



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



  $(function() {

    /**
    * Convert dl to flexbox cards
    */

    var $dl, $dt, $dd, dtHtml, ddHtml, dtText, parentText, id, image;
    var $container = $('.definition-list');
    var $dls = $container.children('dl');
    var $nestedDls = $container.find('dl dl');
    var $titles = $container.find('h2, h3');
    var namespace = encodeURIComponent(window.location.pathname);

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

      $container.addClass('d-flex flex-row flex-wrap align-items-stretch align-self-stretch');



      /**
      * Make text between dls full width
      */

      //$dls.add($titles).first().prevAll().wrapAll('<div class="card m-1 w-100"><div class="card-body"></div></div>');
      $dls.nextUntil('dl, h2, h3').add($dls.add($titles).first().prevAll()).wrapAll('<div class="card card-info m-1"><div class="card-body"></div></div>');



      /**
       * Convert child dls into tabs
       */

      var tabsHtml, panesHtml;
      $nestedDls.each(function () {
        $dl = $(this);
        parentText = $dl.parent('dd').prev('dt').text() || '';
        tabsHtml = '';
        panesHtml = '';
        $dl.find('dt').each(function (i) {
          $dt = $(this);
          $dd = $dt.next('dd');
          dtHtml = $dt.html() || '';
          ddHtml = $dd.html() || '';
          dtText = $dt.text() || '';
          id = validId(parentText + '_' + dtText + '_pane');
          tabsHtml = tabsHtml
            + '<li class="nav-item">'
            + '<a class="nav-link ' + ((i === 0) ? 'active' : '') + '" href="#' + id + '" data-toggle="tab" role="tab" aria-controls="' + id + '" aria-selected="' + ((i === 0) ? 'true' : 'false') + '">' + dtHtml.replace(/(abbr>)\s+(<abbr)/g, '$1$2') + '</a>'
            + '</li>';
          panesHtml = panesHtml + '<div id="' + id + '" class="tab-pane fade ' + ((i === 0) ? 'show active' : '') + '" role="tabpanel" aria-labelledby="' + dtText + '"><p class="card-text float-left">' + ddHtml + '</p></div>';
        });
        $dl.replaceWith('<ul class="nav justify-content-end" role="tablist">' + tabsHtml + '</ul><div class="tab-content">' + panesHtml + '</div>');
      });



      /**
      * Wrap dt+dd's in Bootstrap cards
      */

      $dls.each(function () {
        $dl = $(this);
        var html = '';
        var $section = $dl.prev('h2, h3').filter('[id]').first();
        var sectionId = $section.attr('id');
        var sectionLabel = $section.html();

        $dl.find('dt').each(function(i) {
          $dt = $(this);
          $dd = $dt.next('dd');
          dtHtml = $dt.html() || '';
          ddHtml = $dd.html() || '';
          dtText = $dt.text() || '';
          id = validId(dtText);

          if (dtHtml) {
            dtHtml = dtHtml
              .replace(/\(([^()]{2,})\)/g, '<small>($1)</small>')
              .replace(/<abbr( [^>]+)?>\[?(([\w]{1,4})\.)\]?<\/abbr>/gi, '<abbr$1 class="text-$3">$2</abbr>');
          }
          if (ddHtml) {
            ddHtml = ddHtml
              .replace(/(?!<[^>]*)\/([^/<>\r\n]*)\/(?![^<]*>)/g, '<span class="text-pronunciation">$1</span>')
              .replace(/(?!<[^>]*)\“([^<>\r\n\“\”\r\n]*)\”(?![^<]*>)/g, '<span class="text-literatim">$1</span>')
              .replace(/<abbr( [^>]+)?>\[?(([\w]{1,4})\.)\]?<\/abbr>/gi, '<abbr$1 class="text-$3">$2</abbr>');
          }

          //var cardStyle = cardStyles[Math.floor(Math.random() * cardStyles.length)];
          var cardStyle = cardStyles[1];

          html = html
          + '<div class="flipcard-wrapper">'
          + '<input type="radio" id="flipcard_position_' + id + '" name="visible_definition" value="' + id + '" class="flipcard-position d-none" data-global="false" />'
          + '<div class="card card-flip m-1"'
          + (sectionId && i === 0 ? ' id="' + sectionId + '" data-label="' + sectionLabel + '"' : '')
          + (sectionId ? ' data-section="' + sectionId + '"' : '')
          + '>'
          + '<label for="flipcard_position_' + id + '" class="m-0">'
          + '<div class="card front card-position-absolute bg-dark text-muted">'
          + '<div class="card-body d-flex justify-content-center align-items-center">'
          + '<h4 class="card-title m-0 ' + ((dtHtml.length > 80) ? 'h6' : (dtHtml.length > 40) ? 'h5' : '') + '">' + dtHtml + '</h4>'
          + '</div>'
          + '</div>'
          + '</label>'
          + '<div class="card back bg-white text-dark">'
          + '<div class="card-body pb-0">'
          + (($dd.find('div, p').length) ? ddHtml : ('<p class="card-text">' + ddHtml + '</p>'))
          + '</div>'
          + '<div class="card-footer bg-transparent border-0 p-0">'
          + '<div class="btn-group btn-group-toggle d-flex" data-toggle="buttons">'
          + '<label for="unmemorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.unknown_definition }}{% raw %}"><input type="radio" id="unmemorized_definition_' + id + '" name="memorized_definition_' + id + '" value="0" class="unmemorized" autocomplete="off" data-global="false" /><i class="fas fa-times fa-lg" aria-hidden="false"></i>{% endraw %}{% raw %}</label>'
          + (($.speech && dtLang && ddLang) ? '<button class="btn btn-sm btn-light text-muted w-100 btn-tts" type="button" title="{% endraw %}{{ t.listen }}{% raw %}" aria-label="{% endraw %}{{ t.listen }}{% raw %}"><i class="fas fa-volume-up fa-lg" aria-hidden="false"></i>{% endraw %}{% raw %}</button>' : '')
          + '<label for="memorized_definition_' + id + '" class="btn btn-light text-muted w-100 flipcard-toggler" title="{% endraw %}{{ t.known_definition }}{% raw %}"><input type="radio" id="memorized_definition_' + id + '" name="memorized_definition_' + id + '" value="1" class="memorized" autocomplete="off" data-global="false" /><i class="fas fa-check fa-lg" aria-hidden="false"></i>{% endraw %}{% raw %}</label>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>'
          + '</div>';

        });

        // Also add a "no card flipped" radio
        html = html + '<input type="radio" id="flipcard_toggler_none" name="visible_definition" value="none" class="d-none" checked />';

        $dl.replaceWith(html);

      });




      /**
      * Wrap title's in Bootstrap cards
      */

      var $title, id;
      $titles.each(function () {
        $title = $(this);
        id = $title.attr('id') || encodeURIComponent($title.text());
        $title.replaceWith(
          '<div class="card front card-section bg-secondary text-dark m-1" data-section="' + id + '">'
          + '<div class="card-body d-flex text-center">'
          + '<h4 class="card-title font-weight-light m-auto" ' + ((id) ? ' id="' + id + '"' : '') + '>'
          + $title.html()
          + '</h4>'
          + '</div>'
          + '</div>'
        );
      });
      //$titles.addClass('h6 mb-0').wrap('<div class="w-100"></div>');



      /**
       * If there is an image in the dt tag, us it as card image
       */

      $container.find('.card-title img').each(function () {
        var $img = $(this);
        $img.closest('.card-body').removeClass('card-body').addClass('card-img-overlay d-none').before($img);
        $img.addClass('img-fluid card-img lazyloaded').wrap('<div class="ratio-container unknown-ratio-container"></div>');
      });



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
        var $progress = $('.progress');
        if (window.localStorage) {
          var $inputs = $('input[name^="memorized_definition_"][value="1"]');
          //var namespace = encodeURIComponent(window.location.pathname);
          var namespace = $container.attr('data-id');
          var key = 'progress';
          var value = ($inputs.filter(':checked').length / $inputs.length * 100) || 0;

          $progress
            .find('.progress-bar')
            .css('width', value + '%')
            .html(value.toFixed() + '%')
            .attr('aria-valuenow', value.toFixed());
          value = JSON.stringify(value);
          localStorage.setItem(namespace + ':' + key, value);
        } else {
          $progress.hide();
        }

      });



      /**
      * Then unhide post content once everything is in place
      */

      $container.removeClass('spinner spinner-fullscreen spinner-bg fas fa-spinner');



      /**
      * Randomly mix cards when user toggle the option
      */

      $('input[name="randomize"]').on('change', function () {
        if ($(this).is('[value="1"]:checked')) {
          $titles.remove();
          $container.find('.card-section').remove();
          $container.find('.card-info').remove();
          $container.randomize('.flipcard-wrapper');
          $('#index').closest('.card').prop('hidden', 'hidden');
        } else {
          location.reload();
        }
      });



      console.timeEnd('Definition list generation');
    }




  });


})(window.jQuery, window, document);
{% endraw %}
