'use strict';

// Event handlers

// The blur event fires when an element has lost focus
// The opposite of blur is focus
window.addEventListener('blur', function (e) {
    game.windowHasFocus = false;
    
    if (!game.paused) {
      game.togglePaused();
    }
});
 
window.addEventListener('focus', function (e) {
   let originalFont = game.toastElement.style.fontSize,
       DIGIT_DISPLAY_DURATION = 1000, // milliseconds
       takeAction = function() {
          return game.windowHasFocus && game.countdownInProgress;
       }

   game.windowHasFocus = true;
   game.countdownInProgress = true;

   if (game.paused) {
      game.toastElement.style('font', '128px fantasy');

      if (takeAction())
         game.revealToast('3', 1000); // Display 3 for 1.0 second

      setTimeout(function (e) {
         if (takeAction())
            game.revealToast('2', 1000); // Display 2 for 1.0 second

         setTimeout(function (e) {
            if (takeAction())
               game.revealToast('1', 1000); // Display 1 for 1.0 second

            setTimeout(function (e) {
               if (takeAction())
                  game.togglePaused();

               if (takeAction())
                  game.toastElement.style.fontSize = originalFont;
                  
               game.countdownInProgress = false;

            }, DIGIT_DISPLAY_DURATION);

         }, DIGIT_DISPLAY_DURATION);

      }, DIGIT_DISPLAY_DURATION);
   }
});
