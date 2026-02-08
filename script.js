alert("JS работает");
const windowstart = document.getElementById("modal1");
const windowag = document.getElementById("modal2");
const windowdis = document.getElementById("modal3");
const nextwinbtn = document.getElementById("agree");
const nextlosebtn = document.getElementById("disagree");
const startBtn = document.getElementById("startBtn");
const startBtn1 = document.getElementById("startBtn1");
const heart = document.querySelector(".heart");
const nameText1 = document.querySelector(".name");
const input = document.getElementById("username");
const input1 = document.getElementById("username1");
const scroll = document.querySelector(".scroll");

scroll.addEventListener("click", () => {
  scroll.classList.toggle("open");
});

windowstart.classList.remove("hidden");
windowag.classList.add("hidden");
windowdis.classList.add("hidden");

function hideAllModals(){
    [windowstart, windowag, windowdis].forEach(m => m.classList.add("hidden"));
    document.querySelector(".heart1").style.display = "block";
}
function showModal(modal){
    hideAllModals();
    modal.classList.remove("hidden");
}
nextwinbtn.addEventListener("click", () => showModal(windowag));
nextlosebtn.addEventListener("click", () => showModal(windowdis));
function createHeart(){
  const hearts = ["❤️","💖","💗","💘","💝","💕","💞","💓","🩷","💜"];

  const heart = document.createElement("div");
  heart.classList.add("flying-heart");

  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  document.body.appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  },6000);
}
setInterval(createHeart, 400);

startBtn.addEventListener("click", () => {
    if(input.value.trim() !== ""){
        nameText1.textContent = input.value;
        hideAllModals();
    }
}); 
startBtn1.addEventListener("click", () => {
    if(input1.value.trim() !== ""){
        nameText1.textContent = input1.value;
        hideAllModals();
    }
});
var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  // create a large number of slightly complex vector shapes, and give them random positions and velocities:
		for (var i = 0; i < 100; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

			container.addChild(heart);
		}

  // var text = new createjs.Text("the longer I'm with you\nthe more I love you", "bold 24px Arial", "#312");
  // text.textAlign = "";
  // text.x = w / 2;
  // text.y = h / 2 - text.getMeasuredLineHeight();
  // stage.addChild(text);

  for (i = 0; i < 350; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  // start the tick and point it at the window so we can do some work before updating the stage:
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

  // iterate through all the children and move them according to their velocity:
		for (var i = 0; i < 6; i++) {
			var heart = container.getChildAt(i);
			if (heart.y < -50) {
				heart._x = Math.random() * w;
				heart.y = h * (1 + Math.random()) + 50;
				heart.perX = (1 + Math.random() * 2) * h;
				heart.offX = Math.random() * h;
				heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
				heart.velY = -Math.random() * 2 - 1;
				heart.scale = Math.random() * 2 + 1;
				heart._rotation = Math.random() * 40 - 20;
				heart.alpha = Math.random() * 0.75 + 0.05;
				heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
			}
			var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
			heart.y += heart.velY * heart.scaleX / 2;
			heart.x = heart._x + Math.cos(int) * heart.ampX;
			heart.rotation = heart._rotation + Math.sin(int) * 30;
		}

  captureContainer.updateCache("source-over");

  // draw the updates to stage:
  stage.update(event);
}

init();

$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart1").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart1").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});
$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});
$(".heart1").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if (!$(".heart1").hasClass("closeHer"))
		$(".heart1").addClass("openedHer").addClass("beating");
	else
		$(".heart1").addClass("no-anim").removeClass("beating");
	$(".heart1").removeClass("openHer").removeClass("closeHer");
});