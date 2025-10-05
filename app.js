let wheel = document.getElementById('wheel');
let spinBtn = document.getElementById('spinBtn');
let catAnimationSprite = document.getElementById("cat-animation-sprite");

let spinDuration = 5;
let defaultSpinSpeed = 5;

let isRotating = false;

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


const GRAVITATIONAL_CONSTANT = 6.67e-11;
const GROUND_MASS = 6e24;

function calcForce(mass, distance) {
    return GRAVITATIONAL_CONSTANT * ((mass * GROUND_MASS) / (distance * distance));
}


const particlesCanvas = document.getElementById("particles-canvas");

if (particlesCanvas.getContext) {
    const ctx = particlesCanvas.getContext("2d");
    // drawing code here
} else {
    // canvas-unsupported code here
}




// TODO:
// Scatter some random strawberries in the background.
// Particle effect