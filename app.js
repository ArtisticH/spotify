// INTRO

// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     introFlower.style.display = 'block';
//   }, 1500);

//   setTimeout(() => {
//     introFlower.style.left = `-${introFlower.offsetWidth}px`;
//     introFlower.style.width = '30%';
//     introLogo.remove();
//   }, 4000);

//   setTimeout(() => {
//     intro.remove();
//   }, 4500);
// });

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    introFlower.style.display = 'block';
    console.log(introFlower.offsetWidth)
  }, 1500);

  setTimeout(() => {
    introFlower.style.left = `-${introFlower.offsetWidth}px`;
    introFlower.style.width = '30%';
    introLogo.remove();
  }, 4000);
});



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