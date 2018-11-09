(function ($) {
  // Browser Checking which should be in jQuery.
  $.browser = {};
  $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
  $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());

  // The Raptorize plugin call.
  $.fn.raptorize = function (options) {
    // The defaults options in case nothing is saved.
    let defaults = {
      delayTime: 5000,
    };

    // Extend those options.
    options = $.extend(defaults, options);
    return this.each(function () {
      let audioSupported = false;

      if ($.browser.mozilla || $.browser.webkit) {
        audioSupported = true;
      }

      // Raptor Vars (Modify the 'src' to your preference).
      let raptorImageMarkup = '<img id="elRaptor" style="display: none" src="/libraries/raptorize/assets/images/raptor.png"/>'
      let raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="/libraries/raptorize/assets/sounds/raptor-sound.mp3"/><source src="/libraries/raptorize/assets/sounds/raptor-sound.ogg"/></audio>';
      let locked = false;

      // Append Raptor and Style.
      $('body').append(raptorImageMarkup);
      if (audioSupported) {
        $('body').append(raptorAudioMarkup);
      }

      let raptor = $('#elRaptor').css({
        "position": "fixed",
        "bottom": "-300px",
        "right": "0",
        "display": "none",
        "z-index": "666"
      });

      // Animating Code.
      function init() {
        locked = true;
        $(window).scrollTop(9999999);
        raptor = $('#elRaptor').css({"display": "block"});
        // Sound Hilarity.
        if (audioSupported) {
          function playSound() {
            document.getElementById('elRaptorShriek').play();
          }
          playSound();
        }

        // Movement Hilarity.
        raptor.animate({
          "bottom": "0px"
        }, function () {
          $(this).animate({
            "bottom": "0px"
          }, 100, function () {
            let offset = (($(this).position().left) + 400);
            $(this).delay(300).animate({
              "right": offset
            }, 2200, function () {
              locked = false;
            })
          });
        });
      }

      setTimeout(init, options.delayTime);
    });
  }
})(jQuery);
