{% raw %}
(function ($, window, document) {
  'use strict';

  var $togglers, $targets, $searchboxes;


  /**
  * Hide unchecked items
  */

  var filter = function (action) {
    var $checkedTogglers = $togglers.filter(':checked');

    $targets.show();
    if (action !== false) {

      // Filter by attribut
      $checkedTogglers.each(function () {
        var target = $(this).attr('data-filter');
        if (target) {
          $targets.not(target).filter(':visible').hide();
        }
      });

      /*
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
      */

    }
  };



  $(function() {


    $togglers = $('.filter-toggler');
    $targets = $('.filter-target');
    $searchboxes = $('.searchbox');



    /**
    * Filter elements only when options are visible
    */

    if ($togglers.length) {
      var $collapses = $togglers.parents('.collapse');
      $collapses.on('show.bs.collapse', function () {
        filter();
        $togglers.change(function () {
          filter(true);
        });
        // Check the hidden "none" radio when user click a checked radio
        //$togglers.click(function () {
        //  console.log("click");
        //  if ($(this).is(':checked')) {
        //    $toggles.filter('[name=' + $(this).attr('name') + '][value=none]').trigger('click');
        //  }
        //});
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
      $searchboxes.on('input', function (e) {
        console.log('Searchbox', e.type);
        $targets = $('.filter-target');
        filter(true);
      });
    }


  });


})(window.jQuery, window, document);
{% endraw %}
