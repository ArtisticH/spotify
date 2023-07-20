
// ----------------------------------------------------------------------------------
// SEC 1 - RELEASE

const $imgBox = document.querySelectorAll('.imgBox');

[...$imgBox].forEach(item => {
  item.addEventListener('mouseenter', () => {
    const $topic = item.querySelector('.img_topic');
    $topic.classList.add('hover');

    if(item.firstElementChild.id === 'forPlaySvg') {
      const $play = item.querySelector('#playLoc');
      $play.classList.add('hover');
    }
  });

  item.addEventListener('mouseleave', () => {
    const $topic = item.querySelector('.img_topic');
    $topic.classList.remove('hover');

    if(item.firstElementChild.id === 'forPlaySvg') {
      const $play = item.querySelector('#playLoc');
      $play.classList.remove('hover');
    }
  });
});


const $hoverArea = document.querySelectorAll('.rightArrow_loc');

[...$hoverArea].forEach(item => {
  item.addEventListener('mouseenter', () => {
    const $firstLine = item.querySelector('.rightArrow_loc_title');
    const $backBlack = item.querySelector('.rightArrow_loc_circle');
    const $invert = item.querySelector('.rightArrow_loc_arrow');
    const $secondLine = item.querySelector('.rightArrow_loc_line');

    $firstLine.classList.add('hover');
    $backBlack.classList.add('hover');
    $invert.classList.add('hover');
    $secondLine.classList.add('hover');
  });

  item.addEventListener('mouseleave', () => {
    const $firstLine = item.querySelector('.rightArrow_loc_title');
    const $backBlack = item.querySelector('.rightArrow_loc_circle');
    const $invert = item.querySelector('.rightArrow_loc_arrow');
    const $secondLine = item.querySelector('.rightArrow_loc_line');

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


// ----------------------------------------------------------------------------------
// SEC 2 - SPOTLIGHT

const $spotImg = document.querySelectorAll('.spotImg');
const $spotImgRead = document.querySelectorAll('.spotImgRead');

$spotImg.forEach((img) => {
  img.addEventListener('mouseenter', (e) => {
    let index = [...$spotImg].indexOf(img);
    if(e.target === $spotImg[index] && e.relatedTarget !== $spotImg[index]) {
      $spotImgRead[index].classList.add('hover');
      console.log('enter', $spotImg[index], $spotImgRead[index]);
    }
  });

  img.addEventListener('mouseleave', (e) => {
    let index = [...$spotImg].indexOf(img);
    if(e.target === $spotImg[index] && e.relatedTarget !== $spotImg[index] && e.relatedTarget !== $spotImgRead[index]) {
      $spotImgRead[index].classList.remove('hover');
      console.log('leave', $spotImg[index], $spotImgRead[index]);
    }
  });
});


// ----------------------------------------------------------------------------------
// SEC 5 - JOBS


jobs_rols.addEventListener('mouseenter', () => {
  miami_arrow_container.classList.toggle('hover');
  miami_arrow_circle.classList.toggle('hover');
  miami_arrow.classList.toggle('hover');
  jobs_editorial.classList.toggle('hover');
});

jobs_rols.addEventListener('mouseleave', () => {
  miami_arrow_container.classList.toggle('hover');
  miami_arrow_circle.classList.toggle('hover');
  miami_arrow.classList.toggle('hover');
  jobs_editorial.classList.toggle('hover');
});

/*
git remote add origin https://github.com/ArtisticH/Spotify-Clone.git
git branch -M main
git push -u origin main
*/