
(function($, window, document){
  function createEvent( element, animationKey ) {
    var event           = document.createEvent("Event");
    event.initEvent("keyframe", true, true);
    event.animationName = 'keyframe';
    event.keyText       = 'keyframe';
    event.percent       = animationKey;
    element.dispatchEvent(event);
  };



  $.fn.keyframe = function() {
    return this.each(function(index, elem){
      var reqAniFrame, startTime, endTime, duration,
          keyframesHistory = {}, // some kind of buffer
          cycle            = 1;

      function animationCallback( e ) {
        var t = $(this);
        console.log(e.type.toLowerCase());
        if( e.type.toLowerCase().indexOf( 'AnimationStart'.toLowerCase() ) > -1 ){
          var allStyles = document.defaultView.getComputedStyle( t[0], null ),
              found = false;

          for( var i = 0, len = allStyles.length; i < len; i++ ){
            if( found ) { continue; }
            if( allStyles[i].search("-animation-duration") >= 0 ){
              duration = 1000 * parseFloat( allStyles.getPropertyValue( allStyles[i] ) );
              found    = true;
            }
          }

          startTime   = new Date().getTime();
          endTime     = startTime+duration;
          reqAniFrame = window.requestAnimationFrame( keyframes );

        }else{
          window.cancelAnimationFrame( reqAniFrame );
        }
      
      };//animationCallback

      function keyframes ( timestamp ) {
        var key = Math.floor( ( timestamp - startTime ) / duration * 100 );
        if( !keyframesHistory[key] && ( ( ( key % 5 ) +5 ) % 5 ) == 0 ){
          keyframesHistory[key] = true;
          createEvent( elem, key )
        }

        cycle = cycle+1;
        reqAniFrame = window.requestAnimationFrame( keyframes );
      };//keyframes

      $(elem).die( '.ntz_keyframes' );//just to make sure we get rid of all events

      var vendors  = [ 'ms', 'moz', 'webkit', 'o' ],
          binds = 'animationstart.ntz_keyframes animationend.ntz_keyframes ';

      for (var i = vendors.length - 1; i >= 0; i--) {
        var binds = binds + vendors[i] + 'AnimationEnd.ntz_keyframes ' + vendors[i] + 'AnimationStart.ntz_keyframes ';
      };
      $(elem).live( binds, animationCallback);

    });
  };
})(jQuery, window, document);
