{% raw %}
(function ($) {

  var settings = {
    container: 'body',
    playerClass: 'sound-player',
    sounds: [
      {
        playerId: 'button-click-sound',
        togglerSelector: '.btn, button',
        togglerEvent: 'mousedown',
        filePath: '{% endraw %}{{ 'assets/sounds/108336__qat__click-01-fast.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'nav-link-click-sound',
        togglerSelector: '.nav-link',
        togglerEvent: 'click',
        filePath: '{% endraw %}{{ 'assets/sounds/171697__nenadsimic__menu-selection-click.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'flipcard-flip-sound',
        togglerSelector: 'input.flipcard-position',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/240777__f4ngy__dealing-card.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'success-sound',
        togglerSelector: 'input.memorized',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/253177__suntemple__retro-accomplished-sfx.wav' | relative_url }}{% raw %}'
      },
      {
        playerId: 'failed-sound',
        togglerSelector: 'input.unmemorized',
        togglerEvent: 'change',
        filePath: '{% endraw %}{{ 'assets/sounds/15446__pitx__15399-fragmento.wav' | relative_url }}{% raw %}'
      },
    ]
  };

  var html = '';
  $.each(settings.sounds, function (i, sound) {
    html = html + '<audio id="' + sound.playerId + '" class="' + settings.playerClass + '" hidden><source src="' + sound.filePath + '" /></audio>';
    $(settings.container).on(sound.togglerEvent, sound.togglerSelector, function () {
      $('#' + sound.playerId).trigger('play');
    });
  });
  $('body').find('script, link').first().before(html);

})(jQuery);
{% endraw %}
