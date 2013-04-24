SnackJS Flickr Gallery
===

A very, very simple Flickr gallery built using [SnackJS](https://github.com/rpflorence/snack) for the JSONP/Element finding stuff and CSS3 Animations for the smooth, smooth transitions.

To use, take the stylesheet & js from the project and put them wherever you put such things in your project, then link to them. I do it kinda like:


    <link rel="stylesheet" type="text/css" href="snack-flickr-gallery.css" />
    <script src="snack-qwery-min.js" type="text/javascript"></script>
    <script src="snack-flickr-gallery.js" type="text/javascript"></script>

Then in your markup wherever you want to put an image gallery just chuck this element in

    <div class="snack-flickr-gallery"></div>

If you want to get fancy and pass some extra options to the Flickr feed API you can do it like:

    <div class="snack-flickr-gallery" data-user-id="86448492@N00" data-tags="everydamnedshirt"></div>

If you have no idea what your user id is (I didn't) then you can plug your username in at [idgettr](everydamnedshirt)

Browser Support
---

I have no idea. I tried to be conservative with my js & css, and am using a cross browser selector thingo for SnackJS, but I was too lazy to test it.

Who?
---

[John Barton](http://whoisjohnbarton.com) made this.

Why?
---

I was helping out with some small updates to a website built years and years ago and it had some kind of flash image gallery I didn't understand. I figured it was easier to build a new one than figure out how flash shit works, and easier to use the flickr API than build a cms for image galleries.

Licence
---

MIT Licence, fools.
