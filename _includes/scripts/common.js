{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    /**
    * Page leave transition with local URLs
    */

    $('a').filter('[href^="/"]').on('click', function () {
      $('.fadeInRight').addClass('fadeOutLeft');
      $('.fadeInLeft').addClass('fadeOutRight');
      $('.fadeInUp').addClass('fadeOutDown');
      $('.fadeInDown').addClass('fadeOutUp');
      var href = $(this).attr('href');
      window.setTimeout(function () {
        window.location = href;
      }, 1000);
      return false;
    });



    /**
    * Smooth scroll with anchors
    */

    var scrollTopDuration = 1000;
    $('a').filter('[href*="#"]').not('[href="#"]').not('[data-toggle="modal"]').not('[data-toggle="collapse"]').not('[data-toggle="tab"]').click(function (e) {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

        var id = decodeURIComponent(this.hash);
        var $target = $(id) || $('[name=' + id.slice(1) +']');

        if ($target && $target.length) {

          var $parents = $target.parents('.card');
          if ($parents && $parents.length) {
            var top = $parents.first().offset().top;
          } else {
            var top = $target.offset().top;
          }

          var paddingTop = parseFloat($('body').css('padding-top')) || 0;

          // Scroll up to target
          $('html, body').stop().animate({
            scrollTop: top - paddingTop
          }, scrollTopDuration, 'swing', function () {

            // Blink target (or section)
            var $sectionItems = $('.card').filter('[data-section="' + $target.attr('id') + '"]');
            if ($sectionItems && $sectionItems.length) {
              var $highlighted = $sectionItems;
            } else if ($target.is('h1, h2, h3, h4, a, p')) {
              var $highlighted = $target;
            }

            if ($highlighted && $highlighted.length) {
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
    var $links = $('a').filter('[href="#top"]');
    var $navbar = $links.closest('.navbar').parent('div');
    if ($navbar && $navbar.length) {
      $links = $navbar;
    }
    if ($links && $links.length) {
      $links.fadeOut();         
      $(window).on('scroll', function() {
        var scrollHeight = $(document).height();
        if (scrollHeight > 0) {
          var scrollTop = $(this).scrollTop();
          var viewportHeight = $(window).height();
          var opacity = 1 - (scrollHeight - viewportHeight - scrollTop) / (scrollHeight - viewportHeight);
          if (scrollTop > (scrollTopOffset || viewportHeight)) {
            $links.stop().fadeTo(scrollTopButtonFadeDuration, opacity);
          } else {
            $links.stop().fadeOut(scrollTopButtonFadeDuration);
          }
        }
      });
    }



    /**
    * Inject SVG icons
    */

    if (typeof SVGInjector !== 'undefined') {
      var injectorOptions = {
        evalScripts: 'once',
        pngFallback: 'assets/png',
        each: function (svg) {

        }
      };
      var mySVGsToInject = document.querySelectorAll('img.oi');
      SVGInjector(mySVGsToInject, injectorOptions, function (totalSVGsInjected) {

      });
    }


    /**
    * Uncheck checked radio
    */

    //$('label').filter('[for]').on('mousedown', function(e) {
    //  var $label = $(this);
    //  var id = $label.attr('for');
    //  var $input = $('#' + id).first();
    //  if ($input.is(':radio')) {
    //    var checked = $input.prop('checked');
    //    var name = $input.attr('name');
    //    if (checked && name) {
    //      $(':radio').filter('[name="' + name + '"][value="none"]').first().prop('checked', true).trigger('change');
    //    }
    //  }
    //});



    /**
    * Store / restore with local storage
    */

    if (window.localStorage) {

      var defaultNamespace = encodeURIComponent(window.location.pathname) + ':';

      /**
      * Store / restore checked definitions
      */
      var $inputs = $(':checkbox, :radio').not('[data-storage="false"]'); //.filter('[id]');
      if ($inputs && $inputs.length) {
        var $input, $label, name, id, checked, key, value, type, namespace;
        $inputs.each(function () {
          $input = $(this);
          $label = $input.parent('.btn');
          name = $input.attr('name');
          id = $input.attr('id');
          namespace = ($input.is('[data-global="false"]')) ? defaultNamespace : '';
          type = $input.attr('type');

          if (type === 'radio') {
            if (name) {
              key = name;
              value = JSON.parse(localStorage.getItem(namespace + key));
              if (value !== null && value === $input.attr('value')) {
                $input.prop('checked', true).trigger('click');
                $label.addClass('active');
              }
            }
          } else if (type === 'checkbox') {
            if (id || name) {
              key = id || name;
              value = JSON.parse(localStorage.getItem(namespace + key));
              if (value !== null) {
                $input.prop('checked', value).trigger('click');
                $label.addClass('active');
              }
            }
          }

        });

        $inputs.on('change', function () {

          $input = $(this);
          name = $input.attr('name');
          value = $input.attr('value');
          id = $input.attr('id');
          namespace = ($input.is('[data-global="false"]')) ? defaultNamespace : '';
          type = $input.attr('type');
          checked = $input.prop('checked');

          if (type === 'radio') {
            if (name && value) {
              key = name;
              value = JSON.stringify((checked) ? value : null);
              localStorage.setItem(namespace + key, value);
            }
          } else if (type === 'checkbox') {
            if (id || name) {
              key = id || name;
              value = JSON.stringify(checked);
              localStorage.setItem(namespace + key, value);
            }
          }

        });
      }


    }

  });

})(window.jQuery, window, document);
{% endraw %}
