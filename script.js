let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let circle = document.getElementById("circle");
let imagesDiv = document.getElementById("images");
let classSelect = document.getElementById("classSelect");

let rotating = false;
let rotationInterval;
const stopSound = new Audio("sound.wav");

// 📸 سه عکس برای هر صنف
const roboticsImages = {
  1: ["classone1.jpg", "classone2.jpg", "classone3.jpg"],
  2: ["classtow1.jpg", "classtow2.jpg", "classtow3.jpg"],
  3: ["classthree1.jpg", "classthree2.jpg", "classthree3.jpg"],
  4: ["foue1.jpg", "four2.jpg", "four3.jpg"],
  5: ["classfive1.jpg", "classfive2.jpg", "classfive3.jpg"],
  6: ["classsix1.jpg", "classsix2.jpg", "classsix3.jpg"]
};

// 🎬 شروع چرخش
startBtn.addEventListener("click", () => {
  if (!rotating) {
    rotating = true;
    startBtn.disabled = true;
    imagesDiv.innerHTML = "";
    let rotationDegree = 0;

    rotationInterval = setInterval(() => {
      rotationDegree += 5;
      circle.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg)`;
    }, 10);
  }
});

// ⛔ توقف و نمایش عکس‌ها
stopBtn.addEventListener("click", () => {
  if (rotating) {
    clearInterval(rotationInterval);
    rotating = false;
    startBtn.disabled = false;

    stopSound.play().catch(() => {});
    let degree = parseInt(circle.style.transform.split("rotate(")[1]) || 0;
    let normalized = degree % 360;
    let numberIndex = Math.floor(normalized / 60) + 1;
    if (numberIndex > 6) numberIndex = 6;

    let selectedClass = classSelect.value;
    let imgs = roboticsImages[selectedClass];

    imagesDiv.innerHTML = `<h3>📘 صنف ${selectedClass} - تصاویر رباتیک:</h3>`;
    imgs.forEach(src => {
      let img = document.createElement("img");
      img.src = src;
      img.className = "robot-img";
      imagesDiv.appendChild(img);
    });

    circle.style.transition = "transform 0.5s ease-out";
    circle.style.transform += " scale(1.05)";
    setTimeout(() => {
      circle.style.transform = circle.style.transform.replace(" scale(1.05)", "");
    }, 500);
  }
});
