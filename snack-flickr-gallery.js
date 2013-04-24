;(function () {
  "use strict";

  // http://stackoverflow.com/questions/8044433/why-does-twitter-redefine-window-settimeout-and-window-setinterval
  window.setInterval = window.setInterval;

  snack.ready(function () {
    var galleryDivs = snack.wrap('.snack-flickr-gallery');

    galleryDivs.each(function (element) {
      var wrappedElement = snack.wrap(element);
      var params = { format: "json" }; // always set format or we get xml back :(

      // testing options
      params["id"] = "86448492@N00";

      snack.JSONP({
        url: "http://api.flickr.com/services/feeds/photos_public.gne",
        key: "jsoncallback",
        data: params
      }, function (response) {
        var firstImageInserted = false;

        snack.each(response.items, function (item) {
          var newImage = document.createElement("img");
          newImage["src"] = item.media.m;
          newImage["alt"] = item.title;
          if (!firstImageInserted) {
            snack.wrap(newImage).addClass("active")
          }

          element.appendChild(newImage);
        });
      });

      // set up the animation delay
      var slideshowRotation = setInterval(function () {
        console.log("should transition image now");
        var images, currentImage, nextImage;

        images = element.getElementsByTagName('img');
        for(var i = 0; i < images.length; i++) {
          var currentImage = images[i];
          
          if (currentImage.className.indexOf('active') > -1) {
            // figure out next image
            var nextImage = images[i + 1];
            if (typeof(nextImage) === 'undefined') {
              nextImage = images[0];
            }
            
            // switch classes
            snack.wrap(nextImage).addClass('active');
            snack.wrap(currentImage).removeClass('active');
          }
        }

        // clearInterval(slideshowRotation);
      }, 3000);

    });

  });

})();
