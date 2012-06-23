# jQuery.keyframe()

### What it this? ###
CSS3, among other neat features, brings us the bliss of advanced animation techniques. (you can read more about this [here](http://www.sitepoint.com/screencast-getting-started-css3-animation-examples/))

Unfortunately, browser vendors (Mozilla, Google, Opera) and Microsoft decided to only implement animation-related events for only start, end and loop. There is no way of knowing when you are at, let's say... 65% with your animation. Therefore I created this plugin, that does exactly this: custom events on various % of the animation.


#### Compatibility ####
The plugin was only tested on latest stable version of Chrome and Firefox (right now 19.x and 13.x). However, this _might_ work on Internet Explorer 10 (no support for keyframe css animation in earlier version, hence no js support either), and latest Opera.

#### Known issues ####
Being somehow experimental and heavly tested on Chrome, the plugin might have some issues in other browsers:

* Event is triggered only on 5% steps (5%, 10%, 15% and so on)
* Firefox 13 doesn't trigger the 100% keyframe.
* Chrome doesn't trigger the 100% keyframe everytime (most of times it does). Best workaround is to rely on `animationEnd` event.
* Firefox 13 doesn't trigger all keyframes on fast...ish animation ( less than 4-5s ). Chrome play nice down to 1s. Animation faster than 1s will skip frames every now and then.

[Demo](http://jsfiddle.net/iamntz/jumRm/1/)

[More info](http://www.iamntz.com/3157/frontend-developer/css-keyframe-based-events/)