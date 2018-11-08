/*
 * jQuery Raptorize Plugin
 * @acrogenesis
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {

  //Stupid Browser Checking which should be in jQuery
  jQuery.browser = {};
  jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
  jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());

  $.fn.raptorize = function (options) {
    //Yo' defaults
    let defaults = {
      enterOn: 'timer', //timer, konami-code, click
      delayTime: 5000 //time before raptor attacks on timer mode
    };

    //Extend those options
    options = $.extend(defaults, options);
    return this.each(function () {
      let _this = $(this);
      let audioSupported = false;

      if ($.browser.mozilla || $.browser.webkit) {
        audioSupported = true;
      }

      //Raptor Vars (Modify the 'src' to your prefrence)
      let raptorImageMarkup = '<img id="elRaptor" style="display: none" src="assets/raptorize/images/raptor.png" />'
      let raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="assets/raptorize/sounds/raptor-sound.mp3" /><source src="assets/raptorize/sounds/raptor-sound.ogg" /></audio>';
      let locked = false;

      //Append Raptor and Style
      $('body').append(raptorImageMarkup);
      if (audioSupported) {
        $('body').append(raptorAudioMarkup);
      }
      let raptor = $('#elRaptor').css({
        "position": "fixed",
        "bottom": "-300px",
        "right": "0",
        "display": "none"
      });

      // Animating Code
      function init() {
        locked = true;
        $(window).scrollTop(9999999);
        let raptor = $('#elRaptor').css({"display": "block"});
        //Sound Hilarity
        if (audioSupported) {
          function playSound() {
            document.getElementById('elRaptorShriek').play();
          }

          playSound();
        }

        // Movement Hilarity	
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

      if (options.enterOn == 'timer') {
        setTimeout(init, options.delayTime);
      }
      else if (options.enterOn == 'click') {
        _this.bind('click', function (e) {
          e.preventDefault();
          if (!locked) {
            init();
          }
        })
      }
    });//each call
  }//orbit plugin call
})(jQuery);
