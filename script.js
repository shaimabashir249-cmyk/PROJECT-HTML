let track = document.getElementById("track");
let items = document.querySelectorAll(".item");
let slider = document.querySelector(".slider");
let overlay = document.getElementById("texts-overlay");

let index = 0; // البداية

// النصوص لكل صورة
const texts = [
  "Stylish Bag",
  "Boxes Crochet",
  "Fashion Baby",
  "Bandana Head",
  "Fashion Crochet"
];

function updateSlider() {
  let itemWidth = items[0].offsetWidth;
  let style = window.getComputedStyle(track);
  let gap = parseInt(style.gap || 24);
  let sliderCenter = slider.offsetWidth / 2;
  let cardCenter = itemWidth / 2;

  let offset = -(index * (itemWidth + gap)) + (sliderCenter - cardCenter);
  track.style.transform = `translateX(${offset}px)`; // مهم: backticks

  items.forEach(i => i.classList.remove("active"));
  items[index].classList.add("active");

  // تغيير النص حسب الصورة النشطة
  overlay.textContent = texts[index];
}

// أزرار Prev / Next
document.getElementById("next").onclick = () => {
  if(index < items.length - 1){
    index++;
    updateSlider();
  }
}

document.getElementById("prev").onclick = () => {
  if(index > 0){
    index--;
    updateSlider();
  }
}

// بداية التشغيل
updateSlider();

 function closeMenu() {
    document.getElementById("toggler").checked = false;
  }


