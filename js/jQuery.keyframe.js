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

      function keyframes ( timestamp ) {
        var key = Math.floor( ( timestamp - startTime ) / duration * 100 );

        if( !keyframesHistory[key] && ( ( ( key % 5 ) +5 ) % 5 ) == 0 ){
          keyframesHistory[key] = true;
          createEvent( elem, key )
        }

        cycle = cycle+1;
        reqAniFrame = window.requestAnimationFrame( keyframes );
      };//keyframes

      $(elem)
        .unbind( 'webkitAnimationEnd.ntz webkitAnimationStart.ntz' )
        .bind( 'webkitAnimationEnd.ntz webkitAnimationStart.ntz', function(e){
        var t = $(this);
        if( e.type == 'webkitAnimationStart' ){
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
      });

    });
  };
})(jQuery, window, document);
