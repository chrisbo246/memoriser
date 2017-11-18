{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    // Display progression
    if (window.localStorage) {
      $('.progress').each(function () {
        var $progress = $(this);
        var namespace = $progress.attr('data-id');
        var key = 'progress';
        var value = JSON.parse(localStorage.getItem(namespace + ':' + key));
        $progress
          .find('.progress-bar')
          .css('width', (value || 0) + '%')
          //.html((value || 0).toFixed() + '%')
          .attr('aria-valuenow', (value || 0).toFixed());
      });
    }

  });

})(window.jQuery, window, document);
{% endraw %}
