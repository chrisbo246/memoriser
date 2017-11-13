{% raw %}
(function ($, window, document) {
  'use strict';

// Display progression
if (window.localStorage) {
  $('.progress').each(function () {
    var $progress = $(this);
    var namespace = $progress.attr('data-id');
    var key = 'progress';
    var value = JSON.parse(localStorage.getItem(namespace + ':' + key));
    $progress.find('.progress-bar').attr('aria-valuenow', (value || 0).toFixed()).css('width', (value || 0) + '%');
  });
}


})(window.jQuery, window, document);
{% endraw %}
