window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame     ||
		window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();


/**
 * Game Core (WARNING: Handle with care)
 */

var FPS = 60,
	pi_by_180 = Math.PI / 180,
	epsilon = 0.1,
	canvas = null,
	ctx = null,
	buffer_canvas = null,
	buffer_canvas_ctx = null,
	game_objects = [],
	keys = [],
	last_time = 0,
	debug = 1,
	debug_color = '#ffffff',
	stage = null,
	supportsLocalStorage = false,
	W, H,
	shakeTime = 0,
	shakeTimeMax = 0,
	shakeIntensity = 7,
	PAUSE = true;


/**
 * @class Any object which can be disaplyed on screen must inherit from DisplayObject
 */
var DisplayObject = function (){
}
var p = DisplayObject.prototype;
p.x = 0;
p.y = 0;
p.width = 0;
p.height = 0;
p.hitarea = null;
p.scale_x = 1;
p.scale_y = 1;
p.rotation = 0;
p.alpha = 1;
p.visible = true;
p.hitTestPoint = null;
p.draw = function(context) {};
p.update = function(dt) {};
p.hitTestPoint = function(x, y) { return false; };
p.hitTestObject = function(obj) {
	if(!this.hitarea || !obj.hitarea) return false;
	// convert the hitareas into global cordinate
	var r1 = this.hitarea.clone();
	r1.x += this.x;
	r1.y += this.y;
	var r2 = obj.hitarea.clone();
	r2.x += obj.x;
	r2.y += obj.y;
	return r1.intersects(r2);
};

/**
 * @class A stage can't be instantiated and all properties and methods are static
 */
var Stage = function(){
	this.mouseX = null;
	this.mouseY = null;
	this.hitTestPoint = function(x, y) {
		return true;
	};
	this.onMouseMove = function(e){
		this.mouseX = e.offsetX || e.layerX;
		this.mouseY = e.offsetY || e.layerY;
	};
};

/**
 * Initializes variables, listeners etc
 */
function init(canvas_id) {
	averagefps = {x: 0, y: 0};
	W = window.innerWidth;
	H = window.innerHeight;
	canvas = document.getElementById(canvas_id);
	canvas.width = W;
	canvas.height = H;
	ctx = canvas.getContext('2d');
	buffer_canvas = document.createElement('canvas')
	buffer_canvas.width = canvas.width;
	buffer_canvas.height = canvas.height;
	buffer_canvas_ctx = buffer_canvas.getContext('2d');

	game_objects = [];
	stage = new Stage();
	stage.onClicked = function(e){
		// onStageClicked(e);
	}

	stage.update = function(dt){
		if ('function' === typeof onStageUpdated)
			onStageUpdated(dt);
	}
	addChild(stage);

	// detect if the browser has localStorage support
	try{
		if(window['localStorage'] != null){
			supportsLocalStorage = true;
			if(!(highscore = window.localStorage.getItem(game_config.score_key))){
				highscore = 0;
				localStorage.setItem(game_config.score_key, 0)
			}
		}
	} catch(e){
		supportsLocalStorage = false;
	}

	// fps text
	var fps_text = {
		x: 5,
		y: 15,
		fps: 0,
		visible: true,
		update: function(dt){
			this.fps = Math.round(1/dt);
			if(this.fps !== Infinity){
				averagefps.x = (averagefps.x * averagefps.y + this.fps) / ++averagefps.y;
			}
		},

		draw: function(context){
			if(!debug) return;
			context.font = '12px Verdana';
    		context.fillStyle = '#F00';
 			context.fillText(this.fps + ' fps', 0, 0);
		}
	};
	addChild(fps_text);

	// Entities text
	var entities_text = {
		x: 50,
		y: 15,
		visible: true,
		draw: function(context){
			if(!debug) return;
			context.font = '12px Verdana';
    		context.fillStyle = '#F00';
 			context.fillText(game_objects.length + ' Entities', 0, 0);
		}
	};
	addChild(entities_text);

	game.init();

	canvas.addEventListener('click', onClicked);
	canvas.addEventListener('mouseover', onMouseOver);
	canvas.addEventListener('mouseout', onMouseOut);
	canvas.addEventListener('mousemove', onMouseMove);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	gameLoop();
}

function gameLoop(){
	window.requestAnimFrame(gameLoop);
	update();
	draw();
}
function onKeyUp(e) {
	keys[e.which] = false;
}

function onKeyDown(e) {
	keys[e.which] = true;
}

function onKeyPress(e) {
	if({68:1,100:1}[e.which]){
		debug ^= 1;
	}
	else if(PAUSE && {88:1,120:1}[e.which]){
	}
}

/**
 * Send click event to all listeners
 * @param  {object} e click event object
 */
function onClicked(e){
	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if((typeof obj.onClicked == 'function') && (typeof obj.hitTestPoint == 'function')){
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
			if(obj.hitTestPoint(x, y)) {
				obj.onClicked(e);
			}
		}
	}
}

/**
* Send MouseOver event to all listeners
* @function	onMouseOver
**/
function onMouseOver(e){
	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if((typeof obj.onMouseOver == 'function') && (typeof obj.hitTestPoint == 'function')){
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
			if(obj.hitTestPoint(x, y))
				obj.onMouseOver(e);
		}
	}
}

/**
* Send MouseOut event to all listeners
* @function	onMouseOver
**/
function onMouseOut(e){
	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if((typeof obj.onMouseOut == 'function') && (typeof obj.hitTestPoint == 'function')){
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
			if(obj.hitTestPoint(x, y))
				obj.onMouseOut(e);
		}
	}
}

/**
* Send MouseOut event to all listeners
* @function	onMouseOver
**/
function onMouseMove(e) {
	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if((typeof obj.onMouseMove == 'function') && (typeof obj.hitTestPoint == 'function')){
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
			if(obj.hitTestPoint(x, y))
				obj.onMouseMove(e);
		}
	}
}


/*
 * Game's update function called from gameloop
 * Updates all game entities
 */
function update() {
	// get the time past the previous frame
	var current_time = new Date().getTime();
	if(!last_time) last_time = current_time;
	var dt = (current_time - last_time) / 1000;
	last_time = current_time;

	if (shakeTime > 0) { shakeTime -= dt; }
	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if(typeof obj.update == 'function'){
			obj.update(dt);
		}
	}
}

/*
 * Game's draw function called from gameloop
 * Draws all game entities
 */
function draw() {
	clearScreen(buffer_canvas_ctx, '#9CC5C9');
	// use double buffering technique to remove flickr :)
	var context = buffer_canvas_ctx;

	if (shakeTime > 0) {
		var magnitude = (shakeTime / shakeTimeMax) * shakeIntensity;
		var shakeX = random(-magnitude, magnitude);
		var shakeY = random(-magnitude, magnitude);
		context.save();
		context.translate(shakeX, shakeY);
	}
	for(var i = 0, l = game_objects.length; i < l; i++){
		var obj = game_objects[i];
		if(typeof obj.draw == 'function' && obj.visible){
			context.save();
			!isNaN(obj.x) && !isNaN(obj.y) && context.translate(obj.x, obj.y);
			!isNaN(obj.scale_x) && !isNaN(obj.scale_y) && context.scale(obj.scale_x, obj.scale_y);
			!isNaN(obj.rotation) && context.rotate(obj.rotation * pi_by_180);
			!isNaN(obj.alpha) && (context.globalAlpha = obj.alpha);
			obj.draw(context);
			context.restore();
		}
	}
	if (shakeTime > 0) {
		context.restore();
	}
	clearScreen(ctx);
	ctx.drawImage(buffer_canvas, 0, 0);
}

function clearScreen(context, color){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function addChild(c){
	game_objects.push(c);
}

function removeChild(c) {
	for(var i = game_objects.length; i--;)
		if(game_objects[i] === c){
			delete c;
			game_objects.splice(i, 1);
			break;
		}
}
function removeChildAt(i) {
	if(!game_objects[i]) return;
	delete game_objects[i];
	game_objects.splice(i, 1);
}

function setChildIndex(child, i) {
	for(var j=-1, l=game_objects.length; ++j<l;){
		if(game_objects[j] === child && j != i){
			game_objects.splice(j, 1);
			game_objects.splice(i, 0, child);
		}
	}
}
function shake(time) {
	shakeTimeMax = shakeTime = time;
}
function random(min, max) {
	return min + ~~(Math.random() * (max - min + 1))
}

function resetScore(){
	score > highscore ? highscore = score : null;
	score = 0;
}

function saveScore(){
	localStorage.setItem(game_config.score_key, highscore);
}

function loadAssets(assets){
	for (var key in assets) {
		if(!assets.hasOwnProperty(key)) continue;
		var image = new Image();
		image.src = assets[key];
		(function(key, img){
			image.onload = function(){
				assets[key] = img;
				// if(++image_count == images.length) startGame();
			}
		})(key, image);
	}
}
/**
 * Geometry classes
 */

/**
 * @class Rectangle
 * @param {number} x x cordinate
 * @param {number} y y cordinate
 * @param {number} w width
 * @param {number} h height
 */
var Rectangle = function(x, y, w, h){
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}

Rectangle.prototype.clone = function(){
	return new Rectangle(this.x, this.y, this.width, this.height);
}

Rectangle.prototype.intersects = function(rect){
	return !(rect.x > this.x + this.width
		|| rect.x + rect.width < this.x
		|| rect.y > this.y + this.height
		|| rect.y + rect.height < this.y);
}

function distanceBetweenPoints(x1, y1, x2, y2){
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.abs(Math.sqrt(dx * dx + dy * dy));
}
