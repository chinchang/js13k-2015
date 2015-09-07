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
	c = null,
	ctx = null,
	bc = null,
	bc_ctx = null,
	objs = [],
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
	score = 0,
	hs = 0,
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

/**
 * @class A stage can't be instantiated and all properties and methods are static
 */
var Stage = function(){
	this.mouseX = null;
	this.mouseY = null;
	this.hitTestPoint = function(x, y) {
		return true;
	};
};

/**
 * Initializes variables, listeners etc
 */
function init(c_id) {
	averagefps = {x: 0, y: 0};
	W = window.innerWidth;
	H = window.innerHeight;
	c = document.getElementById(c_id);
	c.width = W;
	c.height = H;
	ctx = c.getContext('2d');
	bc = document.createElement('canvas')
	bc.width = c.width;
	bc.height = c.height;
	bc_ctx = bc.getContext('2d');

	objs = [];
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
			if(!(hs = window.localStorage.getItem(game_config.score_key))){
				hs = 0;
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
 			context.fillText(objs.length + ' Entities', 0, 0);
		}
	};
	addChild(entities_text);
	game.init();

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
	for(var i = objs.length; i--;){
		var obj = objs[i];
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
	clearScreen(bc_ctx, '#9CC5C9');
	// use double buffering technique to remove flickr :)
	var context = bc_ctx;

	if (shakeTime > 0) {
		var magnitude = (shakeTime / shakeTimeMax) * shakeIntensity;
		var shakeX = random(-magnitude, magnitude);
		var shakeY = random(-magnitude, magnitude);
		context.save();
		context.translate(shakeX, shakeY);
	}
	for(var i = 0, l = objs.length; i < l; i++){
		var obj = objs[i];
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
	ctx.drawImage(bc, 0, 0);
}

function clearScreen(context, color){
    context.clearRect(0, 0, c.width, c.height);
}

function addChild(c){
	objs.push(c);
}

function removeChild(c) {
	for(var i = objs.length; i--;)
		if(objs[i] === c){
			delete c;
			objs.splice(i, 1);
			break;
		}
}
function removeChildAt(i) {
	if(!objs[i]) return;
	delete objs[i];
	objs.splice(i, 1);
}

function setChildIndex(child, i) {
	for(var j=-1, l=objs.length; ++j<l;){
		if(objs[j] === child && j != i){
			objs.splice(j, 1);
			objs.splice(i, 0, child);
		}
	}
}
function shake(time) {
	shakeTimeMax = shakeTime = time;
}
function random(min, max) {
	if (!max) { max = min; min = 0; }
	return min + ~~(Math.random() * (max - min + 1))
}

function resetScore(){
	score > hs ? hs = score : null;
	score = 0;
}

function saveScore(){
	localStorage.setItem(game_config.score_key, hs);
}

function dist(x1, y1, x2, y2){
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.abs(Math.sqrt(dx * dx + dy * dy));
}
