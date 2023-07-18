// INTRO

let mainimg_containers = document.querySelectorAll('.mainimg_container');
let index = 15;
let i = 0;


document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    introFlower.style.display = 'block';
  }, 1500);

  [...mainimg_containers].forEach(item => {
     item.style.zIndex = `${index}`;
     index--;
   })

  setTimeout(() => {
    let flowerWidth = introFlower.offsetWidth;

    animate({
      duration: 200,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        introFlower.style.left = -(flowerWidth * progress) + 'px';
        // 118% -> 10% 로 width 변경
        introFlower.style.width = 118 - (118 - 10) * progress + '%';
      }
    })

    introLogo.remove();
    titleMain.style.opacity = '1';

    let intervalId = setInterval(() => {

       [...mainimg_containers][i].classList.add('stack');
       i++;

       if (i >= mainimg_containers.length) {
         clearInterval(intervalId);
         forflex.classList.add('active');
       }

    }, 10);

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

// ----------------------------------------------------------------------------------
// MAIN


// ----------------------------------------------------------------------------------
// SEC 1 - RELEASE
