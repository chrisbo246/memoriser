{% raw %}
(function ($) {

  var settings = {
    container: 'body',
    playerAttributes: {
      class: 'sound-player',
      preload: 'none' // auto, metadata, none
    },
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



  $(function() {

    var playerAttributes = [];
    $.each(settings.playerAttributes, function (key, value) {
      playerAttributes.push(key + '="' + value + '"');
    });
    playerAttributes = playerAttributes.join(' ');

    var $player, player = [], promise = [], html = '';
    $.each(settings.sounds, function (i, sound) {
      html = html + '<audio id="' + sound.playerId + '" ' + playerAttributes + ' hidden><source src="' + sound.filePath + '" /></audio>';
      $(settings.container).on(sound.togglerEvent, sound.togglerSelector, function () {
        //player[i] = $('#' + sound.playerId)[0];
        player[i] = document.getElementById(sound.playerId);
        if (player[i]) {
          if (player[i].readyState > 2 && player[i].currentTime > 0 && !player[i].paused && !player[i].ended) {
            player[i].currentTime = 0;
          } else {
            player[i].pause();
            promise[i] = player[i].play();
            if (promise[i]) {
              promise[i].then(_ => {
              })
              .catch(error => {
              });
            }
          }
        }
      });
    });
    $('body').prepend(html);

  });

})(jQuery);
{% endraw %}
