;(function () {
  "use strict";

  // http://stackoverflow.com/questions/8044433/why-does-twitter-redefine-window-settimeout-and-window-setinterval
  window.setInterval = window.setInterval;

  snack.ready(function () {
    var galleryDivs = snack.wrap('.snack-flickr-gallery');

    galleryDivs.each(function (element) {
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
          newImage["src"] = item.media.m.replace("_m.", ".");
          newImage["alt"] = item.title;

          element.appendChild(newImage);

          if (!firstImageInserted) {
            snack.wrap(newImage).addClass("active");
            firstImageInserted = true;
          }
        });

        // set up the animation delay
        var slideshowRotation = setInterval(function () {
          var images, currentImage, nextImage;

          images = element.getElementsByTagName('img');
          for(var i = 0; i < images.length; i++) {
            currentImage = images[i];
            
            if (currentImage.className.indexOf('active') > -1) {
              // figure out next image
              nextImage = images[i + 1];
              if (typeof(nextImage) === 'undefined') {
                nextImage = images[0];
              }
              
              // switch classes
              snack.wrap(nextImage).addClass('active');
              snack.wrap(currentImage).removeClass('active');
              break;
            }
          }

        }, 3000);

      }); // end jsonp


    });

  });

})();
