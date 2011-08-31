jsrallax
--------

Just relax, it's just parallax.

### What does it do?
jsrallax allows you to make a parallax scene right it your HTML!

[Check out this example](http://middlerob.com/parallax/)


### How do I make it do that?

- Get some jQuery in your webpage
- Include jquery.jsrallax.js
- Make a parallax scene

```javascript
// a bit of preparation for the demo
var greenSquare = $("<div>").css({
    background: "lime",
    height: 200,
    width: 200
})

// select your element and run jsrallax on it with some options
var scene = $(".parallax").jsrallax({

    // specify an element to capture mousemove events from (default is the element you selected)
    // mousemove:

    // for full screen parallaxing you can give it window
    // mousemove: $(window),
    
    // if you don't want the mousemove event to be used just use false
    // mousemove: false,


    // you can throttle the mousemove event by sending in the minimum milliseconds between updates (default is 25)
    // throttle:
    
    // you can turn of throttling (not recommended) with 0
    // throttle: 0,

    // I don't recommend going below 5ms or the mouse can get choppy


    // here is where we specify the layers (required)
    // order is important, the first layer specified will be the one in the back
    layers: [
        // an array of objects like this
        {
			elem: $("<img>", {src: "http://flickholdr.com/1000/560/pattern"}).css({width:1000, height:560}),
			distance: -0.3
		},
        {
            // each layer should have:
            
            // an element, any dom element! (required) this example layer is just an image
            // make sure the element has a width and height when you send it in, this image isn't loaded yet but we know the size so specify it manually
            elem: $("<img>", {src: "http://placekitten.com/150/150"}).css({width:150, height:150}),

            // how far is it from the pivot point, negative numbers go the opposite way (required)
            distance: 2,

            // you can specify a left and top in px or as a percentage, 0% means the left side of the element is at the left side of the parent, 100% means the right side of the element is at the right side of the parent
            // (default is 50% for left and top)
            left: "50%",
            top: "50%"
        },
        {
            // a second layer with a centered element
            elem: greenSquare,
            distance: 1.5
        }
    ]
})

// now we have 'scene', it is not a jquery object, it is a jarallax object, you can do the following with it:

// move the scene, give it a x and y between -1 and 1
// giving it -1, -1 is the same as moving the mouse to the top left of the scene, 0, 0 will center it
scene.move(0.5, -0.2)

// you can also unbind the mousemove handler later if you want to
// scene.mouseoff()
```
[View a live version of this](http://middlerob.com/parallax/ugly.html)
