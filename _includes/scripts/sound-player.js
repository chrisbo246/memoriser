{% raw %}
(function ($) {

  var settings = {
    container: 'body',
    playerClass: 'sound-player',
    sounds: [
      {
        playerId: 'click-sound-player',
        togglerSelector: '.btn, button',
        togglerEvent: 'mousedown',
        filePath: '{% endraw %}{{ 'assets/sounds/click.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'select-sound-player',
        togglerSelector: '.nav-link',
        togglerEvent: 'click',
        filePath: '{% endraw %}{{ 'assets/sounds/select.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'flip-sound-player',
        togglerSelector: 'input.flipcard-position',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/flip.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'won-sound-player',
        togglerSelector: 'input.memorized',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/won.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'failed-sound-player',
        togglerSelector: 'input.unmemorized',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/failed.wav' | relative_url }}{% raw %}'
      },
    ]
  };

  var $player, html = '';
  $.each(settings.sounds, function (i, sound) {
    html = html + '<audio id="' + sound.playerId + '" class="' + settings.playerClass + '" hidden><source src="' + sound.filePath + '" /></audio>';
    $(settings.container).on(sound.togglerEvent, sound.togglerSelector, function () {
      var player = $('#' + sound.playerId)[0];
      player.pause();
      player.currentTime = 0;
      player.play();
    });
  });
  //$('body').find('script[src], link').first().before(html);
  $('body > *').filter('div, section, footer').last().after(html);

})(jQuery);
{% endraw %}
