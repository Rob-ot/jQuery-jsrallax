jQuery.fn.jsrallax = function (opts) {
	var i, layer, lastMove
	var mousemoveElem = (typeof opts.mousemove === "object" ? $(opts.mousemove) : this)
		, layers = opts.layers
		, throttleMs = opts.throttle === undefined ? 25 : opts.throttle
		, rootWidth = this.outerWidth()
		, rootHeight = this.outerHeight()
		, mousemoveWidth = mousemoveElem.width()
		, mousemoveHeight = mousemoveElem.height()
	
	// setup css
	this.css({
		overflow: "hidden"
	})
	
	// set the root element position to non static for absolute positioned layers
	if (this.css("position") === "static") this.css("position", "relative")
	
	// prepare layers
	for (i = 0; i < layers.length; i++) {
		layer = layers[i]
		this.append(
			layer.elem = $(layer.elem)
				.css({
					left: layer.left || (layer.left = "50%"),
					top: layer.top || (layer.top = "50%"),
					position: "absolute"
				})
		)
		
		layer.maxLeft = rootWidth - layer.elem.width()
		layer.originLeft = (~layer.left.toString().indexOf("%")) ? layer.maxLeft * (parseInt(layer.left, 10) / 100) : parseInt(layer.left, 10)
		
		layer.maxTop = rootHeight - layer.elem.height()
		layer.originTop = (~layer.top.toString().indexOf("%")) ? layer.maxTop * (parseInt(layer.top, 10) / 100) : parseInt(layer.top, 10)
	}
	
	// move the scene, takes 2 numbers between -1 and 1
	function move (xPercent, yPercent) {
		// do not exceed boundries
		xPercent = Math.max(Math.min(xPercent, 1), -1)
		yPercent = Math.max(Math.min(yPercent, 1), -1)
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i]
			layer.elem.css({
				left: (layer.originLeft + (layer.maxLeft - layer.originLeft) * xPercent * layer.distance),
				top: (layer.originTop + (layer.maxTop - layer.originTop) * yPercent * layer.distance)
			})
		}
	}
	
	// handle the mouse moving
	function moveHandler (e) {
		// throttle it
		if (throttleMs && new Date().getTime() - lastMove < throttleMs) {
			// it is too soon so skip this round
			return
		}
		
		// we need to get a x and y between -1 and 1 where 0 is the center
		var layer
			, pos = mousemoveElem.offset() || {left: 0, top: 0}
			, x = e.pageX - pos.left - mousemoveElem.scrollLeft()
			, y = e.pageY - pos.top - mousemoveElem.scrollTop()
			, xPercent = (x / mousemoveWidth - 0.5) * 2
			, yPercent = (y / mousemoveHeight - 0.5) * 2
		
		move(xPercent, yPercent)
		lastMove = new Date().getTime()
	}
	
	// remove the mouse listener
	function mouseoff () {
		mousemoveElem.unbind("mousemove", moveHandler)
	}
	
	// bind the mousemove handler if mousemove is not false
	if (opts.mousemove !== false) {
		mousemoveElem.mousemove(moveHandler)
	}
	
	// put layers in their start position
	move(0, 0)
	
	return {
		move: move,
		mouseoff: mouseoff
	}
}
