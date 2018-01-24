{% raw %}
(function ($, window, document) {
  'use strict';

  $(function() {

    // Display progression
    if (window.localStorage) {
      $('.progress').each(function () {
        var $progress = $(this);
        var $card = $progress.closest('.card').first();
        var namespace = $progress.attr('data-id');
        var key = 'progress';
        var value = JSON.parse(localStorage.getItem(namespace + ':' + key));
        var complete = (value === 100);
        $progress
          .find('.progress-bar')
          .css('width', (value || 0) + '%')
          //.html((value || 0).toFixed() + '%')
          .attr('aria-valuenow', (value || 0).toFixed());
        if (complete) {
          $card.toggleClass('text-dark bg-dark bg-white bg-primary bg-warning border-dark border-primaty border-warning', !complete);
          $card.toggleClass('bg-success border-success', complete);
        }
      });
    }

  });

})(window.jQuery, window, document);
{% endraw %}
