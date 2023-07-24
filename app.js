
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
const $spotFlex = document.querySelector('.spotFlex');

$spotImg.forEach((img) => {

  img.addEventListener('mouseenter', (e) => {
    let index = [...$spotImg].indexOf(img);
    [...$spotImgRead].forEach((item) => {
      item.classList.remove('hover');
    });
    if(e.target === $spotImg[index] && (e.relatedTarget === $spotFlex || e.relatedTarget === e.target.parentNode)) {
      // spotSvg.classList.add('hover');
      $spotImgRead[index].classList.add('hover');
    }
  });


  img.addEventListener('mouseleave', (e) => {
    let index = [...$spotImg].indexOf(img);
    if((e.target === $spotImg[index]) && (e.relatedTarget === $spotFlex || e.relatedTarget === e.target.parentNode)) {
      // spotSvg.classList.remove('hover');
      $spotImgRead[index].classList.remove('hover');
    }
  });
});

// ----------------------------------------------------------------------------------
// SEC 3 - INBOX

(function() {
  const $content = document.getElementById('sec4');
  const $path1Svg1 = document.querySelector('.path1_svg1');
  const $path2Svg1 = document.querySelector('.path2_svg1');
  const $path1Svg1Length = $path1Svg1.getTotalLength();
  const $path2Svg1Length = $path2Svg1.getTotalLength();
  const $path1Svg2 = document.querySelector('.path1_svg2');
  const $path2Svg2 = document.querySelector('.path2_svg2');
  const $path1Svg2Length = $path1Svg2.getTotalLength();
  const $path2Svg2Length = $path2Svg2.getTotalLength();
  console.log($path1Svg1Length, $path2Svg1Length);
  console.log($path1Svg2Length, $path2Svg2Length);

  window.addEventListener('scroll', () => {
    const ratio = (window.scrollY + window.innerHeight - $content.offsetTop) / $content.offsetHeight;
    console.log(ratio);

    if (ratio >= 0.4 && ratio < 1.75) {
      $path1Svg1.classList.add('active');
      $path2Svg1.classList.add('active');
      $path1Svg2.classList.add('active');
      $path2Svg2.classList.add('active');
    } else if (ratio <= 0 || ratio >= 1.77) {
      $path1Svg1.classList.remove('active');
      $path2Svg1.classList.remove('active');
      $path1Svg2.classList.remove('active');
      $path2Svg2.classList.remove('active');
    }
  })
})();



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

// ----------------------------------------------------------------------------------
// TIME

// const $se = document.getElementById('s8_se').querySelector('.s8_time');
// const $uk = document.getElementById('s8_uk').querySelector('.s8_time');
// const $us = document.getElementById('s8_us').querySelector('.s8_time');

// function showLondonTime() {
//   const londonTime = new Date().toLocaleString('en-GB', {
//     timeZone: 'Europe/London',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false
//   });

//   const formattedTime = londonTime.replace(/:/g, ' : ');
//   $uk.textContent = formattedTime;
// }

// function showSeTime() {
//   const seTime = new Date().toLocaleString('en-US', {
//     timeZone: 'Europe/Stockholm',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false
//   });

//   const formattedTime = seTime.replace(/:/g, ' : ');
//   $se.textContent = formattedTime;
// }

// function showUsTime() {
//   const usTime = new Date().toLocaleString('en-US', {
//     timeZone: 'America/New_York',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false
//   });

//   const formattedTime = usTime.replace(/:/g, ' : ');
//   $us.textContent = formattedTime;
// }

// // 1초마다 showLondonTime 함수 실행
// setInterval(showLondonTime, 1000);
// setInterval(showUsTime, 1000);
// setInterval(showSeTime, 1000);

// ----------------------------------------------------------------------------------
// FOOTER


/*
git remote add origin https://github.com/ArtisticH/Spotify-Clone.git
git branch -M main
git push -u origin main
*/