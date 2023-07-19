
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

// const $spotImg = document.querySelector('.spotImg');
// const $spotSvg = document.querySelector('.spotSvg');

// $spotImg.addEventListener('mouseover', () => {
//   $spotSvg.classList.toggle('hover');
// })

// $spotImg.addEventListener('mouseout', () => {
//   $spotSvg.classList.toggle('hover');
// })

const widthArr = ['256px', '185px', '240px'];
const widthArrMin600 = ['352px', '256px', '292px'];
const widthArrMin1024 = ['536px', '312px', '424px'];
const $spotBoxs = document.querySelectorAll('.spotBox');
const spotBoxsArr = [...$spotBoxs];

function spotWidth(arr) {
  spotBoxsArr.forEach(item => {
    let index = spotBoxsArr.indexOf(item) % 3;
    item.style.width = arr[index];
  })
}

spotWidth(widthArr);

window.addEventListener('resize', () => {
  if(window.innerWidth >= 600 && window.innerWidth < 1024) {
    spotWidth(widthArrMin600);
  } else if(window.innerWidth >= 1024) {
    spotWidth(widthArrMin1024);
  }
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