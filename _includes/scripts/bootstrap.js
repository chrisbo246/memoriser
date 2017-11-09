{% raw %}
(function ($, window, document) {
  'use strict';


  /**
  * Convert title attributs into tooltips
  */

  $('[title]').tooltip({
    delay: {
      "show": 3000,
      "hide": 100
    }
  });



  /**
  * Force the flipcard to close when user click a checked radio
  */

  $('.flipcard-toggler').on('click', function() {
    $(this).tooltip('hide');
    var $input = $(this).parents('.card-flip').prev('input');
    if ($input) {
      var checked = $input.prop('checked');
      $input.prop('checked', !checked).trigger('change');
    }
  });



  /**
  * Hide tooltip while card flip
  */

  $('.card-flip').prev('input').on('change', function () {
    $(this).next('.card-flip').find('[title]').tooltip('hide');
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
  * Store / restore with local storage
  */

  if (window.localStorage) {

    var namespace = encodeURIComponent(window.location.pathname);


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
    * Restore collapsed elements states
    */

    var $collapses = $('.collapse').filter('[id]');
    $collapses.on('hidden.bs.collapse', function () {
      localStorage.removeItem(this.id + '_collapse', JSON.stringify(false));
    });
    $collapses.on('shown.bs.collapse', function () {
      localStorage.setItem(this.id + '_collapse', JSON.stringify(true));
    });
    $collapses.each(function () {
      var value = JSON.parse(localStorage.getItem(this.id + '_collapse'));
      var $togglers = $('button[data-target="#' + this.id + '"], a[href="#' + this.id + '"]');
      if (value === true) {
        $(this).collapse('show');
        $togglers.addClass('active');
      } else {
        $(this).collapse('hide');
        $togglers.removeClass('active');
      }
    });


  }

})(window.jQuery, window, document);
{% endraw %}
