// INTRO

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    introFlower.style.display = 'block';
  }, 1500);

  setTimeout(() => {
    let width = introFlower.offsetWidth;

    animate({
      duration: 100,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        introFlower.style.left = -(width * progress) + 'px';
        // 118% -> 10% 로 width 변경
        introFlower.style.width = 118 - (118 - 10) * progress + '%';
      }
    })

    introLogo.remove();
  }, 4000);
});

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction)

    draw(progress); 

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}



// ----------------------------------------------------------------------------------
// HEADER

const triFirst = document.querySelector('.triangle.first');
const triSec = document.querySelector('.triangle.second');
const triThird = document.querySelector('.triangle.third');

menuTriangle.onclick = () => {
  triFirst.classList.toggle('active');
  triSec.classList.toggle('active');
  triThird.classList.toggle('active');
};

// 이거를 intro 후에 나타나도록 바꿔
button.onclick = () => {
  forflex.classList.toggle('active');
};

// ----------------------------------------------------------------------------------
// MAIN

let mainimg_containers = document.querySelectorAll('.mainimg_container');
console.log(mainimg_containers)

imgclick.onclick = function() {
  animate({
    duration: 200,
    timing: function(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      firstimg.style.opacity = 1 * progress + '';
      firstimg.style.left = 200 - (200 - 50) * progress + '%';
    }
  })
}