/*!
	Wheelzoom 3.0.4
	license: MIT
	http://www.jacklmoore.com/wheelzoom
*/
// 用工厂方法来创建 module
(function (root, factory ) {
  if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = factory(root)
  } else if (typeof define !== 'undefined' && define.amd){
    define('wheelzoom', factory(root))
  } else {
    root.wheelzoom = factory(root)
  }
})(window || this, function () {
  var defaults = {
    zoom: 0.10,
    maxZoomTimes: 5
  };

  var canvas = document.createElement('canvas');

  var main = function(img, options){
    if (!img || !img.nodeName || img.nodeName !== 'IMG') { return; }

    var settings = {};
    var width;
    var height;
    var bgWidth;
    var bgHeight;
    var bgPosX;
    var bgPosY;
    var previousEvent;
    var cachedDataUrl;

    function setSrcToBackground(img) {
      img.style.backgroundImage = 'url("'+img.src+'")';
      img.style.backgroundRepeat = 'no-repeat';
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      cachedDataUrl = canvas.toDataURL();
      img.src = cachedDataUrl;
    }

    function updateBgStyle() {
      if (bgPosX > 0) {
        bgPosX = 0;
      } else if (bgPosX < width - bgWidth) {
        bgPosX = width - bgWidth;
      }

      if (bgPosY > 0) {
        bgPosY = 0;
      } else if (bgPosY < height - bgHeight) {
        bgPosY = height - bgHeight;
      }

      img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
      img.style.backgroundPosition = bgPosX+'px '+bgPosY+'px';
    }

    function reset() {
      bgWidth = width;
      bgHeight = height;
      bgPosX = bgPosY = 0;
      updateBgStyle();
    }

    function onwheel(e) {
      var deltaY = 0;

      e.preventDefault();

      if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
        deltaY = e.deltaY;
      } else if (e.wheelDelta) {
        deltaY = -e.wheelDelta;
      }

      // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
      // We have to calculate the target element's position relative to the document, and subtrack that from the
      // cursor's position relative to the document.
      var rect = img.getBoundingClientRect();
      var offsetX = e.pageX - rect.left - window.pageXOffset;
      var offsetY = e.pageY - rect.top - window.pageYOffset;

      // Record the offset between the bg edge and cursor:
      var bgCursorX = offsetX - bgPosX;
      var bgCursorY = offsetY - bgPosY;

      // Use the previous offset to get the percent offset between the bg edge and cursor:
      var bgRatioX = bgCursorX/bgWidth;
      var bgRatioY = bgCursorY/bgHeight;
      // Compute the bg size
      var tmpBgWidth, tmpBgHeight
      if (deltaY < 0) {
        tmpBgWidth = bgWidth + bgWidth*settings.zoom;
        tmpBgHeight = bgHeight + bgHeight*settings.zoom;
      } else {
       tmpBgWidth = bgWidth - bgWidth*settings.zoom;
       tmpBgHeight = bgHeight - bgHeight*settings.zoom;
      }
      if (tmpBgWidth / width > settings.maxZoomTimes) {
        return
      }
      // Update the bg size:
      bgWidth = tmpBgWidth
      bgHeight = tmpBgHeight
      // Take the percent offset and apply it to the new size:
      bgPosX = offsetX - (bgWidth * bgRatioX);
      bgPosY = offsetY - (bgHeight * bgRatioY);

      // Prevent zooming out beyond the starting size
      if (bgWidth <= width || bgHeight <= height) {
        reset();
      } else {
        updateBgStyle();
      }
    }

    function drag(e) {
      e.preventDefault();
      bgPosX += (e.pageX - previousEvent.pageX);
      bgPosY += (e.pageY - previousEvent.pageY);
      previousEvent = e;
      updateBgStyle();
    }

    function removeDrag() {
      document.removeEventListener('mouseup', removeDrag);
      document.removeEventListener('mousemove', drag);
    }

    // Make the background draggable
    function draggable(e) {
      e.preventDefault();
      previousEvent = e;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', removeDrag);
    }

    function load() {
      if (img.src === cachedDataUrl) return;

      var computedStyle = window.getComputedStyle(img, null);

      width = parseInt(computedStyle.width, 10);
      height = parseInt(computedStyle.height, 10);
      bgWidth = width;
      bgHeight = height;
      bgPosX = 0;
      bgPosY = 0;

      setSrcToBackground(img);

      img.style.backgroundSize =  width+'px '+height+'px';
      img.style.backgroundPosition = '0 0';
      img.addEventListener('wheelzoom.reset', reset);

      img.addEventListener('wheel', onwheel);
      img.addEventListener('mousedown', draggable);
    }

    var destroy = function (originalProperties) {
      img.removeEventListener('wheelzoom.destroy', destroy);
      img.removeEventListener('wheelzoom.reset', reset);
      img.removeEventListener('load', load);
      img.removeEventListener('mouseup', removeDrag);
      img.removeEventListener('mousemove', drag);
      img.removeEventListener('mousedown', draggable);
      img.removeEventListener('wheel', onwheel);

      img.style.backgroundImage = originalProperties.backgroundImage;
      img.style.backgroundRepeat = originalProperties.backgroundRepeat;
      img.src = originalProperties.src;
    }.bind(null, {
      backgroundImage: img.style.backgroundImage,
      backgroundRepeat: img.style.backgroundRepeat,
      src: img.src
    });

    img.addEventListener('wheelzoom.destroy', destroy);

    options = options || {};

    Object.keys(defaults).forEach(function(key){
      settings[key] = options[key] !== undefined ? options[key] : defaults[key];
    });

    if (img.complete) {
      load();
    }

    img.addEventListener('load', load);
  };

  // Do nothing in IE8
  if (typeof window.getComputedStyle !== 'function') {
    return function(elements) {
      return elements;
    };
  } else {
    return function(elements, options) {
      if (elements && elements.length) {
        Array.prototype.forEach.call(elements, main, options);
      } else if (elements && elements.nodeName) {
        main(elements, options);
      }
      return elements;
    };
  }
});
