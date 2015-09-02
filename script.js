/**
 * Asteroids kinda game in HTML5
 *
 * Author: Kushagra Gour a.k.a. chin chang
 * Date: 31 Aug 2015
 * Release under the MIT License
 */



var game = (function(window){

var game_config = {
	namespace: 'ccpro_stb',
	name: 'Squash The Asteroids',
	score_key: 'ccpro_stb_score'
};

var player,
	asteroids = [],
	friction = 1.4,
	images = {
		Player: 'Player.png',
		asteroid1: 'Asteroid1.png',
		asteroid2: 'Asteroid2.png',
		splat: 'splat.png',
	},
	asteroid_levels = {
		1: {width: 10, height: 10},
		2: {width: 20, height: 20},
		3: {width: 35, height: 35},
	}
	words = ['cat', 'fog', 'harm', 'crazy', 'game', 'fun'];

/**
 * [Player description]
 */
function Player() {
	this.type = 'player';
	this.speed_x = 0;
	this.speed_y = 0;
	this.max_speed = 300;
	this.acceleration = 1500;
	this.friction = 0.93;
	this.turn_speed = 180;
	this.width = 25;
	this.height = 15;
	this.can_shoot = true;
	this.delayBetweenBullets_sec = 0.3;
	this.bullet_timer = this.delayBetweenBullets_sec;
	this.hitarea = new Rectangle(-this.width / 2, -this.height / 2 , this.width, this.height);
	this.color = '#0f0';
	this.generateWordTime = 0;
	this.wordGenerateInterval = 2;

	this.reset = function() {
		this.x = W / 2;
		this.y = H - 100;
		this.speed_x = this.speed_y = 0;
	}
	this.checkCollision = function() {
		for (var i = game_objects.length; i--;) {
			var obj = game_objects[i];
			if(obj.type === 'word' && this.hitTestObject(obj)) {
				this.reset();
				// removeChild(obj);
			}
		}
		setChildIndex(this, game_objects.length - 1);
	};

	this.shootBullet = function(character) {
		if(this.can_shoot) {
			shake(0.5);
			// addChild(new Bullet(this.x, this.y, this.rotation, character));
			this.can_shoot = false;
		}
	};
}
Player.prototype = new DisplayObject();
Player.prototype.draw = function(context) {
	context.strokeStyle = this.color;
	context.lineWidth = 3;
	 context.lineWidth = 7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);
	 context.shadowBlur = 5 + (Math.sin(pi_by_180 * Date.now() / 5) * 10);
	 context.shadowColor = this.color;


	context.beginPath();
	var radius = 7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);

	context.arc(0, 0, radius, 0, 2 * Math.PI, false);

	// context.moveTo(this.width / 2, 0);
	// context.lineTo(-this.width / 2, this.height / 2);
	// context.lineTo(-this.width / 2, -this.height / 2);
	// context.closePath();
	context.stroke();
	if(debug) {
		context.strokeStyle = debug_color;
		context.beginPath();
		context.rect(this.hitarea.x, this.hitarea.y, this.hitarea.width, this.hitarea.height);
		context.stroke();
	}
}

Player.prototype.update = function(dt) {
	if(!this.can_shoot) {
		this.bullet_timer -= dt;
		if(this.bullet_timer <= 0) {
			this.can_shoot = true;
			this.bullet_timer = this.delayBetweenBullets_sec;
		}
	}
	this.generateWordTime -= dt;

	if (this.generateWordTime < 0) {
		game_objects.push(new Word);
		this.generateWordTime = this.wordGenerateInterval;
	}

	// change rotation only when Player isn't moving
	// (keys[39] && (this.rotation += this.turn_speed * dt)) || (keys[37] && (this.rotation -= this.turn_speed * dt));
	// accelerate with UP/DOWN keys
	if (keys[37]) {
		this.speed_x -= this.acceleration * dt;
	} else if (keys[39]) {
		this.speed_x += this.acceleration * dt;
	}
	if (keys[38]) {
		this.speed_y -= this.acceleration * dt;
	} else if (keys[40]) {
		this.speed_y += this.acceleration * dt;
	}
	else {
		// if (Math.abs(this.speed_x) > 0)
			// this.speed_x *= 1;
		// if(Math.abs(this.speed_x) < 10)
			// this.speed_x = 0;
	}

	if (keys[32]) {
		this.shootBullet();
	}
	this.speed_x *= this.friction;
	this.speed_y *= this.friction;
	this.x += this.speed_x * dt;
	this.y += this.speed_y * dt;

	// this.checkCollision();

	if(this.x > W)
		this.x = 0;
	if(this.x < 0)
		this.x = W;
	if(this.y < 0)
		this.y = H;
	if(this.y > H)
		this.y = 0;
}

/**
 * [Asteroid description]
 */
function Word(params) {
	params = params || {};
	this.type = 'word';
	this.level = params.level || 3;
	this.x = random(50, W - 50 * 2);
	this.y = random(-100, -10);
	this.width = asteroid_levels[this.level].width;
	this.height = asteroid_levels[this.level].height;
	this.isDead = false;
	this.speed_y = Math.random() * 50 + 5;
	this.hitarea = new Rectangle(-this.width/2, -this.height / 2, this.width, this.height);
	this.color = '#f00';
	this.value = words[~~(Math.random() * words.length)];
	this.isReversed = 0; //random(0,1);
	this.reversedValue = reverseWord(this.value);
	this.correctIndex = 0;

	this.checkCollision = function() {
		for (var i = game_objects.length; i--;) {
			var obj = game_objects[i];
			if(obj.type === 'bullet' && this.hitTestObject(obj)) {
				removeChild(obj);
				this.hit();
			}
		}
		setChildIndex(this, game_objects.length - 1);
	};

	this.hit = function() {
		return;

	}
}
Word.prototype = new DisplayObject();
Word.prototype.draw = function(context) {
	context.font = '30px Verdana';
	context.fillStyle = '#F00';
	// context.shadowBlur = 5 + (Math.sin(pi_by_180 * Date.now() / 5) * 10);
	// context.shadowColor = this.color;
	context.fillText(this.isReversed ? this.reversedValue : this.value, 0, 0);
	context.fillStyle = '#FF0';
	context.fillText((this.isReversed ? this.reversedValue : this.value).substr(0, this.correctIndex), 0, 0);

	context.beginPath();
	context.moveTo(this.value.length * 10, 0);
	context.lineTo(player.x - this.x, player.y - this.y);
	var alpha = 0.6 * (1 - distanceBetweenPoints(this.x, this.y, player.x, player.y) / H);
	// console.log(alpha)
	context.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
	context.stroke();
	context.beginPath();

	if(debug) {
		context.strokeStyle = this.color || debug_color;
		context.beginPath();
		context.rect(this.hitarea.x, this.hitarea.y, this.hitarea.width, this.hitarea.height);
		context.stroke();
	}
}

Word.prototype.update = function(dt) {
	this.y += this.speed_y * dt;

	if(this.x > W)
		this.x = 0;
	if(this.x < 0)
		this.x = W;
	if(this.y < 0)
		this.y = H;
	if(this.y > H)
		this.y = 0;

	this.checkCollision();
};

Word.prototype.checkCharacter = function(character) {
	if (this.value[this.correctIndex] === character) {
		this.correctIndex++;
		// console.log(this.value, this.correctIndex)
		if (this.correctIndex === this.value.length) {
			createCoins(7, this.x, this.y);
			removeChild(this);
		}
	}
}



/**
 * [Bullet description]
 * @param {[type]} x     [description]
 * @param {[type]} y     [description]
 * @param {[type]} theta [description]
 */
function Coin(x, y, theta) {
	this.type = 'coin';
	this.x = x;
	this.y = y;
	this.width = 2;
	this.height = 2;
	this.speed = 100 + random(200, 500);
	this.speed_x = ~~(Math.cos(theta * pi_by_180) * this.speed);
	this.speed_y = ~~(Math.sin(theta * pi_by_180) * this.speed);
	this.hitarea = new Rectangle(-this.width/2, -this.height / 2, this.width, this.height);
	this.lifetime_sec = 8;
	this.color = '#ff0';
}
Coin.prototype = new DisplayObject();
Coin.prototype.friction = 0.9;
Coin.prototype.draw = function(context) {
	context.fillStyle = '#ff0';
	// context.lineWidth = 3;
	// context.lineWidth = 7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);
	context.shadowBlur = 5 + (Math.sin(pi_by_180 * Date.now() / 5) * 10);
	context.shadowColor = this.color;

	var radius = 7;//7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);
	var scaleX = Math.sin(pi_by_180 * Date.now() / 5);

	context.save();
	context.scale(scaleX, 1);
	context.beginPath();
	context.arc(0, 0, radius, 0, 2 * Math.PI, false);
	context.fill();
	context.restore();
	if(debug) {
		context.strokeStyle = this.color || debug_color;
		context.beginPath();
		context.rect(this.hitarea.x, this.hitarea.y, this.hitarea.width, this.hitarea.height);
		context.stroke();
	}
}

Coin.prototype.update = function(dt) {
	this.lifetime_sec -= dt;
	if (this.lifetime_sec <= 0 && this.state !== 'taken')
		removeChild(this);
	this.speed_x *= this.friction;
	this.speed_y *= this.friction;
	this.x += this.speed_x * dt;
	this.y += this.speed_y * dt;

	var dist = distanceBetweenPoints(this.x, this.y, player.x, player.y);
	if (distanceBetweenPoints(this.x, this.y, player.x, player.y) < 200) {
		this.x += (player.x - this.x) * 0.1;
		this.y += (player.y - this.y) * 0.1;
		if (dist < 20) {
			this.state = 'taken';
			removeChild(this);
		}
	}
}

function createCoins(n, x, y) {
	for (var i = n; i--;) {
		game_objects.push(new Coin(x, y, random(0, 360)));
	}
}
function onKeyPress(e) {
	var obj;
	var c = String.fromCharCode(e.which).toLowerCase();
	player.shootBullet(c);
	for (var i = game_objects.length; i--;) {
		obj = game_objects[i];
		if (obj.type === 'word') {
			obj.checkCharacter(c);
		}
	}
}
function drawBg () {
    var c =  document.querySelector('#bg1'),
        ctx = c.getContext('2d'),
        i = 0,
        size = 0;
	c.width = W;
	c.height = H;
    // ctx.scale(scale, scale);
    drawRect('hsl(0, 0%, 10%)', 0, 0, W, H, ctx);

    ctx.fillStyle = 'hsl(0, 0%, 20%)';
    ctx.beginPath();
    while (++i < 150) {
        size = random(1, 10);
        // ctx.arc(~~(Math.random() * W), ~~(Math.random() * H), size, 0, 2 * Math.PI, false);
        ctx.rect(~~(Math.random() * W), ~~(Math.random() * H), size, size);
    }
    ctx.fill();
}
function drawFg () {
	var c =  document.querySelector('#fg1'),
	    ctx = c.getContext('2d'),
	    i = 0,
	    width = 2,
	    separation = width + 1,
	    count = H  /(separation);

	c.width = W;
	c.height = H;
	ctx.fillStyle = 'hsla(0, 0%, 20%, 0.4)';
	ctx.beginPath();
	while (++i < count) {
	    ctx.rect(0, i * separation, W, width);
	    //ctx.rect(i*separation, 0, width, h);
	}
	ctx.fill();
}

function initGame() {
	drawBg();
	drawFg();
	player = new Player;
	player.reset();
	addChild(player);

	for(var i = 0; i < 4; i++)
		game_objects.push(new Word);

	PAUSE = false;
	window.addEventListener('keypress', onKeyPress);
}

function resize(e) {
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
}
function drawRect(fill_color, x, y, width, height, _ctx) {
    _ctx = _ctx || ctx;
    _ctx.beginPath();
    _ctx.fillStyle = fill_color || '#e22';
    _ctx.rect(x, y, width, height);
    _ctx.fill();
}
function reverseWord(word) {
	return word.split('').reverse().join('');
}
// loadAssets();

// export some stuff
return {
	'init': initGame,
	'resize': resize
}

})(window);

function initialize() {
	init('c');
}

window.addEventListener('load', initialize);
window.addEventListener('resize', game.resize);
window.debug=0;