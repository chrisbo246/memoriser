{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    var $nav = $('#index');
    if ($nav.length) {

      var titleLevel, label, $title;
      var navItems = '';
      //var $titles = $('.post-content').find('h2, h3, h4.card-title, .card[data-section]').filter('[id]');
      var $titles = $('.post-content').find('h2, h3, h4.card-title').filter('[id]');

      if ($titles.length > 1) {
        $titles.each(function () {
          $title = $(this);
          titleLevel = parseInt($title.prop('tagName').replace(/[^0-9]+/g, ''));
          titleLevel = titleLevel - 2 || 0;
          label = ($title.attr('data-label') || $title.html());
          navItems = navItems + '<li class="nav-item">'
          + '<a class="nav-link" href="#' + $title.attr('id') + '">'
          + label
          //+ '<span class="h' + (titleLevel + 5) + ' pl-' + (titleLevel) + '">' + label + '</span>'
          + '</a>'
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
