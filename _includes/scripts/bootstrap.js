{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    /**
    * Convert title attributs into tooltips
    */

    var $tooltips = $('[title]');
    $tooltips.filter(':not(.btn), :not(attr)').tooltip({
      'trigger': 'hover focus',
      'delay': {
        'show': 3000
      }
    });
    $tooltips.filter('.btn').tooltip({
      'trigger': 'hover',
      'delay': {
        'show': 3000
      }
    });



    /**
    * Force the flipcard to close when user click a checked radio
    */

    $('.flipcard-toggler').on('click', function() {
      var $input = $(this).parents('.card-flip').prev('input');
      if ($input) {
        var checked = $input.prop('checked');
        //$(this).parents('.card-flip').find('[title], [data-toggle="tooltip"]').tooltip('hide');
        $tooltips.tooltip('hide');
        $input.prop('checked', !checked).trigger('change');
      }
    });



    /**
    * Load Disqus script only if container is shown
    */

    $('#comments').filter('.collapse').one('shown.bs.collapse', function () {
      var d = document, s = d.createElement('script');
      s.src = 'https://{% endraw %}{{ site.disqus.shortname }}{% raw %}.disqus.com/embed.js';
      s.async = true;
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    });



    /**
    * Add/remove .active class to collapse togglers
    */

    var $collapses = $('.collapse').filter('[id]');
    $collapses.on('shown.bs.collapse', function () {
      $('.btn').filter('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]').addClass('active');
    });
    $collapses.on('hidden.bs.collapse', function () {
      $('.btn').filter('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]').removeClass('active');
    });



    /**
    * Hide toggler if target is missing
    */

    /*
    $('a[href*="#"], button[data-toggle][data-target*="#"]').each(function () {
      var $el = $(this);
      console.log('toggler', $el.attr('href'), $el.attr('data-target'), $el);
      var target = $el.attr('href') || $el.attr('data-target');
      if (!target || !target.match(/^#[0-9a-zA-Z_-]*$/g) || !$(target)) {
        $el.hide();
      }
    });
    */


    /**
    * Store / restore with local storage
    */

    if (window.localStorage) {

      var defaultNamespace = encodeURIComponent(window.location.pathname) + ':';


      /**
      * Keep alerts closed
      */

      var $alert, $collapse, $togglers, key, value, namespace;
      var $alerts = $('.alert-dismissible').filter('[id]').not('[data-storage="false"]');
      $alerts.each(function () {
        $alert = $(this);
        namespace = ($alert.is('[data-global="false"]')) ? defaultNamespace : '';
        key = $alert.attr('id');
        value = JSON.parse(localStorage.getItem(namespace + key));
        if (value === 'closed') {
          $alert.attr('hidden', '');
        } else {
          $alert.removeAttr('hidden');
        }
      });
      $alerts.on('closed.bs.alert', function () {
        $alert = $(this);
        namespace = ($alert.is('[data-global="false"]')) ? defaultNamespace : '';
        key = $alert.attr('id');
        value = JSON.stringify('closed');
        localStorage.setItem(namespace + key, value);
      });



      /**
      * Close alert animation
      */

      /*$alerts = $('.alert-dismissible');
      $alerts.on('close.bs.alert', function () {
        $(this).addClass('zoomOutUp');
      });*/



      /**
      * Restore collapsed elements states
      */

      var $collapses = $('.collapse').filter('[id]').not('[data-storage="false"]');
      $collapses.on('hidden.bs.collapse', function () {
        $collapse = $(this);
        namespace = ($collapse.is('[data-global="false"]')) ? defaultNamespace : '';
        key = this.id + '_collapse';
        value = false;
        localStorage.removeItem(namespace + key, JSON.stringify(value));
      });
      $collapses.on('shown.bs.collapse', function () {
        $collapse = $(this);
        namespace = ($collapse.is('[data-global="false"]')) ? defaultNamespace : '';
        key = this.id + '_collapse';
        value = true;
        localStorage.setItem(namespace + key, JSON.stringify(value));
      });
      $collapses.each(function (index, element) {
        $togglers = $('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]');
        $collapse = $(this);
        namespace = ($togglers.is('[data-global="false"]')) ? defaultNamespace : '';
        key = this.id + '_collapse';
        value = JSON.parse(localStorage.getItem(namespace + key));
        if (value === true) {
          $(this).collapse('show');
          $togglers.addClass('active');
        } else {
          $(this).collapse('hide');
          $togglers.removeClass('active');
        }
      });

    }

    $('html').addClass('collapse-active');

  });


})(window.jQuery, window, document);
{% endraw %}
