{% raw %}
(function ($, window, document) {
  'use strict';

  var $targets, $searchboxes;


  /**
  * Filter by text
  */

  var filter = function (action) {

    //$targets.show();
    if (action !== false) {

      $searchboxes.each(function () {
        var text = $(this).val().toLowerCase();
        if (text) {
          $targets.filter(':visible').each(function () {
            var $target = $(this);
            var matches = 0;
            $target.find('h2, h3, h4, p').add($target).each(function () {
              if ($(this).text().toLowerCase().indexOf("" + text + "") !== -1) {
                matches = matches + 1;
              }
            });
            if (matches === 0) {
              $target.hide();
            }
          });
        }
      });

    }
  };



  $(function() {

    $targets = $('.filter-target');
    $searchboxes = $('.searchbox');

    if ($searchboxes.length && $targets.length) {
      $searchboxes.on('input', function () {
        filter(true);
      });
    }

  });


})(window.jQuery, window, document);
{% endraw %}
