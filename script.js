/**
 * Game for JS13K compo 2015
 *
 * Author: Kushagra Gour a.k.a. chin chang
 * Date: 31 Aug 2015
 * Release under the MIT License
 */

function J(){this.B=function(e){for(var f=0;24>f;f++)this[String.fromCharCode(97+f)]=e[f]||0;0.01>this.c&&(this.c=0.01);e=this.b+this.c+this.e;0.18>e&&(e=0.18/e,this.b*=e,this.c*=e,this.e*=e)}}
var W=new function(){this.A=new J;var e,f,d,g,l,z,K,L,M,A,m,N;this.reset=function(){var c=this.A;g=100/(c.f*c.f+0.001);l=100/(c.g*c.g+0.001);z=1-0.01*c.h*c.h*c.h;K=1E-6*-c.i*c.i*c.i;c.a||(m=0.5-c.n/2,N=5E-5*-c.o);L=0<c.l?1-0.9*c.l*c.l:1+10*c.l*c.l;M=0;A=1==c.m?0:2E4*(1-c.m)*(1-c.m)+32};this.D=function(){this.reset();var c=this.A;e=1E5*c.b*c.b;f=1E5*c.c*c.c;d=1E5*c.e*c.e+10;return e+f+d|0};this.C=function(c,O){var a=this.A,P=1!=a.s||a.v,r=0.1*a.v*a.v,Q=1+3E-4*a.w,n=0.1*a.s*a.s*a.s,X=1+1E-4*a.t,Y=1!=
a.s,Z=a.x*a.x,$=a.g,R=a.q||a.r,aa=0.2*a.r*a.r*a.r,D=a.q*a.q*(0>a.q?-1020:1020),S=a.p?(2E4*(1-a.p)*(1-a.p)|0)+32:0,ba=a.d,T=a.j/2,ca=0.01*a.k*a.k,E=a.a,F=e,da=1/e,ea=1/f,fa=1/d,a=5/(1+20*a.u*a.u)*(0.01+n);0.8<a&&(a=0.8);for(var a=1-a,G=!1,U=0,v=0,w=0,B=0,t=0,x,u=0,h,p=0,s,H=0,b,V=0,q,I=0,C=Array(1024),y=Array(32),k=C.length;k--;)C[k]=0;for(k=y.length;k--;)y[k]=2*Math.random()-1;for(k=0;k<O;k++){if(G)return k;S&&++V>=S&&(V=0,this.reset());A&&++M>=A&&(A=0,g*=L);z+=K;g*=z;g>l&&(g=l,0<$&&(G=!0));h=g;0<
T&&(I+=ca,h*=1+Math.sin(I)*T);h|=0;8>h&&(h=8);E||(m+=N,0>m?m=0:0.5<m&&(m=0.5));if(++v>F)switch(v=0,++U){case 1:F=f;break;case 2:F=d}switch(U){case 0:w=v*da;break;case 1:w=1+2*(1-v*ea)*ba;break;case 2:w=1-v*fa;break;case 3:w=0,G=!0}R&&(D+=aa,s=D|0,0>s?s=-s:1023<s&&(s=1023));P&&Q&&(r*=Q,1E-5>r?r=1E-5:0.1<r&&(r=0.1));q=0;for(var ga=8;ga--;){p++;if(p>=h&&(p%=h,3==E))for(x=y.length;x--;)y[x]=2*Math.random()-1;switch(E){case 0:b=p/h<m?0.5:-0.5;break;case 1:b=1-2*(p/h);break;case 2:b=p/h;b=0.5<b?6.28318531*
(b-1):6.28318531*b;b=0>b?1.27323954*b+0.405284735*b*b:1.27323954*b-0.405284735*b*b;b=0>b?0.225*(b*-b-b)+b:0.225*(b*b-b)+b;break;case 3:b=y[Math.abs(32*p/h|0)]}P&&(x=u,n*=X,0>n?n=0:0.1<n&&(n=0.1),Y?(t+=(b-u)*n,t*=a):(u=b,t=0),u+=t,B+=u-x,b=B*=1-r);R&&(C[H%1024]=b,b+=C[(H-s+1024)%1024],H++);q+=b}q=0.125*q*w*Z;c[k]=1<=q?32767:-1>=q?-32768:32767*q|0}return O}};
window.jsfxr=function(e){W.A.B(e);var f=W.D();e=new Uint8Array(4*((f+1)/2|0)+44);var f=2*W.C(new Uint16Array(e.buffer,44),f),d=new Uint32Array(e.buffer,0,44);d[0]=1179011410;d[1]=f+36;d[2]=1163280727;d[3]=544501094;d[4]=16;d[5]=65537;d[6]=44100;d[7]=88200;d[8]=1048578;d[9]=1635017060;d[10]=f;for(var f=f+44,d=0,g="data:audio/wav;base64,";d<f;d+=3)var l=e[d]<<16|e[d+1]<<8|e[d+2],g=g+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>18]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>
12&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>6&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l&63]);d-=f;return g.slice(0,g.length-d)+"==".slice(0,d)};

var game = (function(window){

var game_config = {
	namespace: 'sdrow',
	name: 'sdrow',
	score_key: 'sdrow'
};

var hero,
	asteroids = [],
	friction = 1.4,
	sounds = {},
	asteroid_levels = {
		1: {width: 10, height: 10},
		2: {width: 20, height: 20},
		3: {width: 35, height: 35},
	},
	coins = 0,
	hasPower = false,
	words = ['cat', 'fog', 'harm', 'crazy', 'game', 'fun'];

snd('coin', [
	[2,,0.0547,0.5447,0.1704,0.5662,,,,,,,,,,,,,1,,,,,0.5],
	[2,,0.0236,0.3286,0.2658,0.6069,,,,,,0.2147,0.5666,,,,,,1,,,,,0.5],
	[2,,0.0143,0.5022,0.26,0.5323,,,,,,0.3248,0.5518,,,,,,1,,,,,0.5]
]);
snd('powerup', [
	[2,,0.2307,,0.4397,0.3404,,0.1526,,0.0544,0.4236,,,0.3724,,,,,1,,,,,0.5],
	[2,,0.3894,,0.3024,0.4107,,0.1792,,,,,,0.0228,,0.5141,,,1,,,,,0.5]
	// [1,,0.0439,,0.4676,0.2578,,0.2415,,,,,,,,,,,1,,,,,0.5]
]);
snd('explosion', [
	[3,,0.3708,0.5822,0.3851,0.0584,,-0.0268,,,,-0.0749,0.7624,,,,,,1,,,,,0.5],
	[3,,0.1669,0.6956,0.4757,0.053,,0.25,,,,0.5472,0.7599,,,0.516,0.3194,-0.1415,1,,,,,0.5],
	[3,,0.1679,0.6792,0.4546,0.1048,,-0.3239,,,,-0.3376,0.6851,,,,,,1,,,,,0.5]
]);
snd('hit', [
	[0,,0.0658,,0.2198,0.4852,,-0.5898,,,,,,0.4405,,,,,1,,,,,0.5],
	[0,,0.0444,,0.1355,0.2247,,-0.3034,,,,,,0.416,,,,,1,,,0.1094,,0.5],
	[3,,0.0833,,0.1753,0.3698,,-0.3655,,,,,,,,,,,1,,,,,0.5],
	[1,,0.0892,,0.2721,0.38,,-0.379,,,,,,,,,,,1,,,0.1896,,0.5]
]);
snd('button', [
	[0,0.1696,0.5004,0.2598,0.3914,0.7047,,0.0141,-0.0005,,,0.6608,-0.8497,-0.1484,-0.0163,0.5521,0.2529,-0.5832,0.6323,-0.595,0.9155,0.2821,-0.0615,0.26]
]);
snd('gameover', [
	[2,0.18,0.24,,0.54,0.34,,,,1,0.31,,,,0.8522,,,,0.23,,,,,0.49]
]);

/**
 * [Player description]
 */
function Player() {
	this.type = 'player';
	this.speed_x = 0;
	this.speed_y = 0;
	this.max_speed = 300;
	this.acceleration = 2000;
	this.friction = 0.93;
	this.turn_speed = 180;
	this.width = 25;
	this.height = 15;
	this.color = '#0f0';
	this.generateWordTime = 5;
	this.wordGenerateInterval = 2;

	this.reset = function() {
		this.x = W / 2;
		this.y = H - 100;
		this.speed_x = this.speed_y = 0;
	}
	this.checkCollision = function() {
		for (var i = objs.length; i--;) {
			var obj = objs[i];
			if(obj.type === 'word' && this.hitTestObject(obj)) {
				this.reset();
				// removeChild(obj);
			}
		}
		setChildIndex(this, objs.length - 1);
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
	this.generateWordTime -= dt;

	if (this.generateWordTime < 0) {
		objs.push(new Word);
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
	this.y = random(0, 5);
	this.width = asteroid_levels[this.level].width;
	this.height = asteroid_levels[this.level].height;
	this.isDead = false;
	this.speed_y = random(20, 60);
	this.color = '#f00';
	this.value = words[~~(Math.random() * words.length)];
	this.isReversed = 1; //random(0,1);
	this.reversedValue = reverse(this.value);
	this.correctIndex = 0;

	this.checkCollision = function() {
		for (var i = objs.length; i--;) {
			var obj = objs[i];
			if(obj.type === 'bullet' && this.hitTestObject(obj)) {
				removeChild(obj);
				this.hit();
			}
		}
		setChildIndex(this, objs.length - 1);
	};

	this.hit = function() {
		return;

	}
}
Word.prototype = new DisplayObject();
Word.prototype.draw = function(ctx) {
	ctx.font = '30px Verdana';
	var c1 = this.isReversed ? '#FF0' : '#F00', // yellow - right ones
		c2 = this.isReversed ? '#F00' : '#FF0';
		substrLen = this.isReversed ? this.value.length - this.correctIndex : this.correctIndex ;
	ctx.fillStyle = c1;
	ctx.fillText(this.isReversed ? this.reversedValue : this.value, 0, 0);
	ctx.fillStyle = c2
	ctx.fillText((this.isReversed ? this.reversedValue : this.value).substr(0, substrLen), 0, 0);

	ctx.beginPath();
	ctx.moveTo(this.value.length * 10, 0);
	ctx.lineTo(hero.x - this.x, hero.y - this.y);
	var alpha = 0.6 * (1 - dist(this.x, this.y, hero.x, hero.y) / H);
	// console.log(alpha)
	ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
	ctx.stroke();
	ctx.beginPath();
}

Word.prototype.update = function(dt) {
	this.y += this.speed_y * dt;

	if(this.x > W)
		this.x = 0;
	if(this.x < 0)
		this.x = W;
	if(this.y < 0)
		this.y = H;
	if(this.y > H) {
		damage();
		removeChild(this);
	}

	this.checkCollision();
};

Word.prototype.checkCharacter = function(character) {
	if (this.value[this.correctIndex] === character) {
		this.correctIndex++;
		play('hit');
		// console.log(this.value, this.correctIndex)
		if (this.correctIndex === this.value.length) {
			createCoins(7, this.x, this.y);
			play('explosion');
			shake(1);
			removeChild(this);
		}
	}
}

/**
 * [Coin description]
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
	this.lifetime_sec = 8;
	this.color = '#ff0';
}
var cp = Coin.prototype = new DisplayObject();
cp.friction = 0.9;
cp.draw = function(ctx) {
	ctx.fillStyle = '#ff0';
	// ctx.lineWidth = 3;
	// ctx.lineWidth = 7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);
	ctx.shadowBlur = 5 + (Math.sin(pi_by_180 * Date.now() / 5) * 10);
	ctx.shadowColor = this.color;

	var radius = 7;//7 + (Math.sin(pi_by_180 * Date.now() / 2) * 3);
	var scaleX = Math.sin(pi_by_180 * Date.now() / 5);

	ctx.save();
	ctx.scale(scaleX, 1);
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.restore();
}

cp.update = function(dt) {
	this.lifetime_sec -= dt;
	if (this.lifetime_sec <= 0 && this.state !== 'taken')
		removeChild(this);
	this.speed_x *= this.friction;
	this.speed_y *= this.friction;
	this.x += this.speed_x * dt;
	this.y += this.speed_y * dt;

	var d = dist(this.x, this.y, hero.x, hero.y);
	if (d < 200) {
		this.x += (hero.x - this.x) * 0.1;
		this.y += (hero.y - this.y) * 0.1;
		if (d < 20) {
			this.state = 'taken';
			play('coin');
			coins++;
			checkPower();
			removeChild(this);
		}
	}
}

function checkPower() {
	if (!hasPower && coins > 10) {
		hasPower = true;
		play('powerup');
	}
}
function createCoins(n, x, y) {
	for (var i = n; i--;) {
		objs.push(new Coin(x, y, random(0, 360)));
	}
}
function onKey(e) {
	var obj;
	var c = String.fromCharCode(e.which).toLowerCase();
	for (var i = objs.length; i--;) {
		obj = objs[i];
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
        ctx.rect(random(W), random(H), size, size);
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
	resetScore();
	hero = new Player;
	hero.reset();
	addChild(hero);

	for(var i = 0; i < 4; i++)
		objs.push(new Word);

	PAUSE = false;
	window.addEventListener('keypress', onKey);
}

function damage() {
	play('explosion');
	score--;
}
function resize(e) {
	W = c.width = window.innerWidth;
	H = c.height = window.innerHeight;
}
function drawRect(fill_color, x, y, width, height, _ctx) {
    _ctx = _ctx || ctx;
    _ctx.beginPath();
    _ctx.fillStyle = fill_color || '#e22';
    _ctx.rect(x, y, width, height);
    _ctx.fill();
}
function reverse(word) {
	return word.split('').reverse().join('');
}

function snd (sid, settings){
	sounds[sid] = [];
	settings.forEach(function(s){
		var a = new Audio();
		a.src = jsfxr(s);
		sounds[sid].push(a);
	});
}
function play (sid){
	sounds[sid] && sounds[sid][random(0, sounds[sid].length - 1)].play();
}

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