// INTRO

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    introFlower.style.display = 'block';
  }, 1500);

  setTimeout(() => {
    introFlower.style.left = `-${introFlower.offsetWidth}px`;
    introFlower.style.width = '30%';
    introLogo.remove();
  }, 4000);

  setTimeout(() => {
    intro.remove();
  }, 4500);
});
