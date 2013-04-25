;(function () {
  "use strict";

  // Make sure setInterval works but good on IE. See:
  // http://stackoverflow.com/questions/8044433/why-does-twitter-redefine-window-settimeout-and-window-setinterval
  window.setInterval = window.setInterval;

  var secondsPerImage = 3;

  var extractParamsFromDataAttributes = function (galleryElement) {
    // always set format or we get xml back :(
    var params = { format: "json" }; 

    // helper func to extract data attribute
    var setParam = function (fromAttributeName, toParamsKey) {
      var attributeValue = galleryElement.getAttribute("data-" + fromAttributeName);
      if (typeof(attributeValue) !== "undefined" && attributeValue != null) {
        params[toParamsKey] = attributeValue;
      }
    }

    // grab any custom params off the gallery element
    setParam("user-id", "id");
    setParam("tags", "tags");
    setParam("tagmode", "tagmode");

    return params;
  }

  var insertImagesIntoGallery = function (galleryElement, items) {
    var firstImageInserted = false;

    snack.each(items, function (item) {
      var newImage = document.createElement("img");
      newImage["src"] = item.media.m.replace("_m.", ".");
      newImage["alt"] = item.title;

      galleryElement.appendChild(newImage);

      if (!firstImageInserted) {
        snack.wrap(newImage).addClass("active");
        firstImageInserted = true;
      }
    });
  }

  var cycleImagesInGallery = function (galleryElement) {
    var images, currentImage, nextImage;

    images = galleryElement.getElementsByTagName('img');
    for(var i = 0; i < images.length; i++) {
      currentImage = images[i];
      
      if (currentImage.className.indexOf('active') > -1) {
        // figure out next image
        nextImage = images[i + 1];
        if (typeof(nextImage) === 'undefined' || nextImage == null) {
          nextImage = images[0];
        }
        
        // switch classes
        snack.wrap(nextImage).addClass('active');
        snack.wrap(currentImage).removeClass('active');
        break;
      }
    }
  }

  snack.ready(function () {
    var galleryDivs = snack.wrap('.snack-flickr-gallery');

    galleryDivs.each(function (element) {
      var params = extractParamsFromDataAttributes(element);

      // place all images in a postion: relative container
      // so that the outer gallery div can be position:static
      // and flow with the document
      var imagesContainer = document.createElement("div");
      snack.wrap(imagesContainer).addClass("flickr-images-container");
      element.appendChild(imagesContainer);

      snack.JSONP({
        url: "http://api.flickr.com/services/feeds/photos_public.gne",
        key: "jsoncallback",
        data: params
      }, function (response) {
        // insert images as soon as we get them
        insertImagesIntoGallery(imagesContainer, response.items);

        // set up the animation delay
        var slideshowRotation = setInterval(function () {
          cycleImagesInGallery(imagesContainer);
        }, secondsPerImage * 1000);

      }); // end jsonp

    });

  });

})();
