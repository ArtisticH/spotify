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
         document.body.style.overflowY = 'auto';
       }

    }, 30);

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

(function() {
  const $release = document.querySelectorAll('.release');

  [...$release].forEach(item => {
    item.addEventListener('mouseenter', () => {
      const $topic = item.querySelector('.topic');
      $topic.classList.add('hover');

      if(item.firstElementChild.id === 'forplaysvg') {
        const $play = item.querySelector('#play');
        $play.classList.add('hover');
      }
    });

    item.addEventListener('mouseleave', () => {
      const $topic = item.querySelector('.topic');
      $topic.classList.remove('hover');

      if(item.firstElementChild.id === 'forplaysvg') {
        const $play = item.querySelector('#play');
        $play.classList.remove('hover');
      }
    });
  });
})();

(function () {
  const $hoverArea = document.querySelectorAll('.right_arrow_location');

  [...$hoverArea].forEach(item => {
    item.addEventListener('mouseenter', () => {
      const $firstLine = item.querySelector('.arrow_exp');
      const $backBlack = item.querySelector('.arrow_circle');
      const $invert = item.querySelector('.right_arrow');
      const $secondLine = item.querySelector('.arrow_line_second');

      $firstLine.classList.add('hover');
      $backBlack.classList.add('hover');
      $invert.classList.add('hover');
      $secondLine.classList.add('hover');
    });

    item.addEventListener('mouseleave', () => {
      const $firstLine = item.querySelector('.arrow_exp');
      const $backBlack = item.querySelector('.arrow_circle');
      const $invert = item.querySelector('.right_arrow');
      const $secondLine = item.querySelector('.arrow_line_second');

      $firstLine.classList.remove('hover');
      $backBlack.classList.remove('hover');
      $invert.classList.remove('hover');
      $secondLine.classList.replace('hover', 'rewind');

      // 왜 타이머 함수의 delay를 300으로 맞춰야 할까?
      /* hover out 시 
        transition: 0.3s ease-in-out;
        2초 동안 효과가 나타나고 
        그 다음에 바로 'rewind' 사라지기 위해서
      */
      setTimeout(() => {
        $secondLine.classList.remove('rewind');
      }, 300);
    });
  });
})();

