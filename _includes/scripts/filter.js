{% raw %}
(function ($, window, document) {
  'use strict';

  var $togglers = $('.filter-toggler');
  var $targets = $('.filter-target');
  var $searchboxes = $('.searchbox');



  /**
  * Hide unchecked items
  */
  var filter = function (action) {
    var $checkedTogglers = $togglers.filter(':checked');
    //var $targets = $('.filter-target');
    $targets.show();
    if (action !== false) {

      // Filter by attribut
      $checkedTogglers.each(function () {
        var target = $(this).attr('data-filter');
        if (target) {
          $targets.not(target).filter(':visible').hide();
        }
      });

      // Filter by text
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



  // Filter elements only when options are visible
  //var $collapses = $('.collapse').filter('#post_list_options');
  if ($togglers.length) {
    var $collapses = $togglers.parents('.collapse');
    $collapses.on('show.bs.collapse', function () {
      filter();
      $togglers.change(function () {
        filter(true);
      });
    });
    $collapses.on('hide.bs.collapse', function () {
      filter(false);
      $togglers.stop('change');
    });
  }



  /**
  * Searchbox filter
  */
  if ($searchboxes.length && $targets.length) {
    $searchboxes.on('input', function () {
      filter(true);
    });
  }


})(window.jQuery, window, document);
{% endraw %}
