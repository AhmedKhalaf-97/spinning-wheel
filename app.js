let wheel = document.getElementById('wheel');
let spinBtn = document.getElementById('spinBtn');
let catAnimationSprite = document.getElementById("cat-animation-sprite");

let spinDuration = 5;
let defaultSpinSpeed = 5;

let isRotating = false;

let bodyBackground = document.getElementById("body-background");

decorateBackground();

function decorateBackground() {
    let horizontalCount = Math.floor(window.innerWidth * 0.012);
    let vertialCount = Math.floor(window.innerHeight * 0.009);

    console.log(horizontalCount);
    console.log(vertialCount);
    for (let i = 0; i < horizontalCount; i++) {
        for (let j = 0; j < vertialCount; j++) {
            let childImg = document.createElement("img");
            childImg.src = "/images/strawberry.png";


            bodyBackground.appendChild(childImg);
        }
    }
}

spinBtn.addEventListener("click", () => {
    if (!isRotating) {
        animateCat(1, 3);
        rotateWheel(randomizeRotation(), defaultSpinSpeed);
    }
});

function rotateWheel(rotationDegree, spinSpeed) {
    isRotating = true;

    wheel.style.transform = `rotate(${rotationDegree + (360 * spinSpeed)}deg)`;
    wheel.style.transition = `transform ${spinDuration}s ease-in-out`;

    setTimeout(() => {
        normalizeWheelRotationDeg();
        checkIndex(rotationDegree / 360); // Checks if it stopped at 100 %.            
    }, spinDuration * 1000);
}

function randomizeRotation() {
    let seed = Math.random();
    let value = Math.ceil(seed * 360);

    return value;
}

function normalizeWheelRotationDeg() {
    let rotationDeg = wheel.style.getPropertyValue('transform');

    if (!rotationDeg) {
        return;
    }

    rotationDeg = rotationDeg.split('(')[1].split('d')[0];

    wheel.style.transition = '';
    wheel.style.transform = `rotate(${rotationDeg % 360}deg)`;
}

// upper limit: 0.186, lower limit: 0.0625
function checkIndex(index) {

    if (0.0625 < index && index < 0.186) {
        animateCat(8, 9);
        console.log("Winner!");
        if (animationReq)
            cancelAnimation();
        startParticlesEffect();
        isRotating = false;
    }
    else {
        setTimeout(() => {
            animateCat(4, 7);
            isRotating = false;
            rotateWheel(0.125 * 360, 0);
            setTimeout(animateCat, 3000, 7, 8);
        }, 2000);

    }
}


function animateCat(startFrame, endFrame) {
    if (startFrame > endFrame) {
        catAnimationSprite.style.backgroundPositionX = `${endFrame * -180}px`;
        return;
    }

    if (startFrame === endFrame) {
        catAnimationSprite.style.backgroundPositionX = `${startFrame * -180}px`;
    }
    else {
        catAnimationSprite.style.backgroundPositionX = `${startFrame * -180}px`;

        setTimeout(animateCat, 300, ++startFrame, endFrame);
    }
}

/* Section below: Canvas API Heart Particles Animation */

const particlesCanvas = document.getElementById("particles-canvas");
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const ctx = particlesCanvas.getContext("2d");

let animationReq;

const heartImgs = new Array(3).fill().map(() => (new Image()));
heartImgs[0].src = "/images/heart00.png";
heartImgs[1].src = "/images/heart01.png";
heartImgs[2].src = "/images/heart02.png";


const heart = {
    x: 0,
    y: 0,
    vy: 0,
    imgIndex: 0,
    draw() {
        ctx.drawImage(heartImgs[this.imgIndex], this.x, this.y, 64, 64);
    }
}

// Fill the array with heart objects. The number of heart objects is proportioned to the device's screen width.
const heartsCount = Math.floor(particlesCanvas.width * 0.15);
let heartObjs = new Array(heartsCount).fill().map(() => ({ ...heart }));


// Start particles effect.
function startParticlesEffect() {
    setInitialPostition();
    startAnimation();
}

// Initial Position.
function setInitialPostition() {
    for (let i = 0; i < heartObjs.length; i++) {
        heartObjs[i].x = Math.random() * ((particlesCanvas.width - 60) - 0) + 0;
        heartObjs[i].y = Math.random() * (particlesCanvas.height - 0) + 0;

        heartObjs[i].vy = (Math.random() * (2 - 1) + 1);

        heartObjs[i].imgIndex = Math.floor((Math.random() * (3 - 0) + 0));
    }
}

// Draw and Animate.
function startAnimation() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    for (let i = 0; i < heartObjs.length; i++) {
        heartObjs[i].draw();


        heartObjs[i].y -= heartObjs[i].vy;

        if (heartObjs[i].y < 0) {
            heartObjs[i].vy = -heartObjs[i].vy * (Math.random() * (4 - 2) + 2);
        }
    }

    animationReq = window.requestAnimationFrame(startAnimation);
}

function cancelAnimation() {
    window.cancelAnimationFrame(animationReq);
}
