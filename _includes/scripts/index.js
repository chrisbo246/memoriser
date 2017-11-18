{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    var $nav = $('#index');
    if ($nav.length) {

      var navItems = '';
      var $title;
      var $titles = $('.post-content').find('h2, h4.card-title, .card[data-section]').filter('[id]');

      if ($titles.length > 1) {
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

  });

})(window.jQuery, window, document);
{% endraw %}
