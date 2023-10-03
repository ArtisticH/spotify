// ----------------------------------------------------------------------------------
// 공통 

const $rightArrowContents = document.querySelectorAll('.js-right-arrow__contents');
// rewind 안 끝난 상태에서 mouseenter 했을때 효과 깨지는 거 고쳐야 함!
[...$rightArrowContents].forEach(rightArrowContent => {
  let $firstUnderline;
  let $backgroundBlack;
  let $invert;
  let $secondUnderline;

  rightArrowContent.addEventListener('mouseenter', () => {

    $firstUnderline = rightArrowContent.querySelector('.js-right-arrow__contents__title-box__title');
    $backgroundBlack = rightArrowContent.querySelector('.js-right-arrow__contents__arrow-circle');
    $invert = rightArrowContent.querySelector('.js-right-arrow__contents__arrow-circle__arrow-img');
    $secondUnderline = rightArrowContent.querySelector('.js-right-arrow__contents__title-box__second-line');

    $firstUnderline.classList.add('--underline');
    $backgroundBlack.classList.add('--background-color');
    $invert.classList.add('--invert');
    $secondUnderline.classList.add('hover');

  });

  rightArrowContent.addEventListener('mouseleave', async () => {
    $firstUnderline.classList.remove('--underline');
    $backgroundBlack.classList.remove('--background-color');
    $invert.classList.remove('--invert');
    $secondUnderline.classList.replace('hover', 'rewind');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    $secondUnderline.classList.remove('rewind');
  });
});

// ----------------------------------------------------------------------------------
// RELEASE

const $releaseImgBoxes = document.querySelectorAll('.js-release__img-box');

[...$releaseImgBoxes].forEach(imgBox => {
  let $title;
  let $playButton;

  imgBox.addEventListener('mouseenter', () => {
    $title = imgBox.querySelector('.js-img-box__title');
    $title.classList.add('--underline');

    if(imgBox.firstElementChild.classList.contains('js-release__img-box__play-box')) {
      $playButton = imgBox.querySelector('.js-release__img-box__play-box__play-button');
      $playButton.classList.add('--background');
    }
  });

  imgBox.addEventListener('mouseleave', () => {
    $title.classList.remove('--underline');

    if(imgBox.firstElementChild.classList.contains('js-release__img-box__play-box')) {
      $playButton.classList.remove('--background');
    }
  });
});


// ----------------------------------------------------------------------------------
// SPOTLIGHT

const $spotlightScrollItem = document.querySelectorAll('.spotlight__scroll__item');
const $spotlightScrollInner = document.querySelector('.spotlight__scroll__inner');
const $spotlightImg = document.querySelectorAll('.spotlight__scroll__item__img-box__img');

document.ondragstart = () => {
  return false;
}

let spotlightCount = 0;

document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowRight') {
    if(spotlightCount >= 10) return;

    const leftOfNextSpotlightScrollItem = $spotlightScrollItem[spotlightCount + 1].offsetLeft;
    $spotlightScrollInner.style.marginLeft = -leftOfNextSpotlightScrollItem + 'px';
    spotlightCount++;
  }

  if(e.key == 'ArrowLeft') {
    if(spotlightCount <= 0) return;

    const leftOfBeforeSpotlightScrollItem = $spotlightScrollItem[spotlightCount - 1].offsetLeft;
    $spotlightScrollInner.style.marginLeft = -leftOfBeforeSpotlightScrollItem + 'px';
    spotlightCount--;
  }
})

window.addEventListener('resize', () => {
  $spotlightScrollInner.style.marginLeft = -$spotlightScrollItem[spotlightCount].offsetLeft + 'px';
})

Array.from($spotlightImg).forEach(item => {
  item.addEventListener('mouseenter', async (e) => {

    const svgElem = item.parentNode.lastElementChild;
    const readElem = item.parentNode.querySelector('.spotlight__scroll__item__img-box__read');
    const readElemText = readElem.querySelector('.spotlight__scroll__item__img-box__read__text');
    const readElemMore = readElem.querySelector('.spotlight__scroll__item__img-box__read__more');

    svgElem.classList.add('bloom');
    readElem.classList.add('show');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 100)
    })

    readElemText.classList.add('show');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 100)
    })

    readElemMore.classList.add('show');

    item.addEventListener('mouseleave', async () => {
      svgElem.classList.replace('bloom', 'shrink');
      readElem.classList.remove('show');
      readElemText.classList.remove('show');
      readElemMore.classList.remove('show');

      await new Promise(resolve => {
        setTimeout(() => {
          svgElem.classList.remove('shrink');
          resolve();
        }, 1000);
      });

    });
  });
});

$spotlightScrollInner.addEventListener('mouseover', (e) => {
  console.log('target', e.target);
});

// ----------------------------------------------------------------------------------
// INBOX


const $inbox = document.getElementById('inbox');
const $path1_inboxCircle = document.getElementById('path1_inboxCircle');
const $path2_inboxCircle = document.getElementById('path2_inboxCircle');
const $path1_inboxCircle_lenghth = $path1_inboxCircle.getTotalLength();
const $path2_inboxCircle_length = $path2_inboxCircle.getTotalLength();
const $path1_inboxArrow = document.getElementById('path1_inboxArrow');
const $path2_inboxArrow = document.getElementById('path2_inboxArrow');
const $path1_inboxArrow_length = $path1_inboxArrow.getTotalLength();
const $path2_inboxArrow_length = $path2_inboxArrow.getTotalLength();

document.addEventListener('scroll', () => {
  const ratio = (window.pageYOffset + window.innerHeight - ($inbox.getBoundingClientRect().top + window.pageYOffset)) / $inbox.offsetHeight;

  if (ratio >= 0.4 && ratio < 1.15) {
    $path1_inboxCircle.classList.add('active');
    $path2_inboxCircle.classList.add('active');
    $path1_inboxArrow.classList.add('active');
    $path2_inboxArrow.classList.add('active');
  } else if (ratio <= 0.3 || ratio >= 1.17) {
    $path1_inboxCircle.classList.remove('active');
    $path2_inboxCircle.classList.remove('active');
    $path1_inboxArrow.classList.remove('active');
    $path2_inboxArrow.classList.remove('active');
  }
})


// ----------------------------------------------------------------------------------
// JOBS

const $jobRoles = document.getElementById('jobs_roles');
const $miamiArrowContainer = document.getElementById('miami_arrow_container');
const $miamiArrowCircle = document.getElementById('miami_arrow_circle');
const $miamiArrow = document.getElementById('miami_arrow');
const $jobsEditorial = document.getElementById('jobs_editorial');

$jobRoles.addEventListener('mouseenter', () => {
  $miamiArrowContainer.classList.toggle('hover');
  $miamiArrowCircle.classList.toggle('hover');
  $miamiArrow.classList.toggle('hover');
  $jobsEditorial.classList.toggle('hover');
});

$jobRoles.addEventListener('mouseleave', () => {
  $miamiArrowContainer.classList.toggle('hover');
  $miamiArrowCircle.classList.toggle('hover');
  $miamiArrow.classList.toggle('hover');
  $jobsEditorial.classList.toggle('hover');
});

// ----------------------------------------------------------------------------------
// TIME

// SE -> UK -> US
const $hours = document.querySelectorAll('.hour');
const $mins = document.querySelectorAll('.min');
const $secs = document.querySelectorAll('.sec');

function setTime(string, timezone, number) {
  let date = new Date().toLocaleString(string, {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const timeComponents = date.split(':');
  let hour = parseInt(timeComponents[0]);
  if(hour < 10) hour = '0' + hour;
  $hours[number].innerHTML = hour;

  let minute = parseInt(timeComponents[1]);
  if (minute < 10) minute = '0' + minute;
  $mins[number].innerHTML = minute;

  let second = parseInt(timeComponents[2]);
  if (second < 10) second = '0' + second;
  $secs[number].innerHTML = second;
}

setTime('en-US', 'Europe/Stockholm', 0);
setTime('en-GB', 'Europe/London', 1);
setTime('en-US', 'America/New_York', 2);

setInterval(() => {
  setTime('en-US', 'Europe/Stockholm', 0)
  setTime('en-GB', 'Europe/London', 1)
  setTime('en-US', 'America/New_York', 2)
},  1000)

// ----------------------------------------------------------------------------------
// FOOTER

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


const $footerArrowMain = document.getElementById('footerArrowMain');
const $footerArrow = document.getElementById('footerArrow');
const $footerArrow_avg = document.getElementById('footerArrow_avg');

$footerArrowMain.onclick = () => {
  const start = window.pageYOffset; 

  animate({
    duration: 400,
    timing: function quad(timeFraction) {
      return Math.pow(timeFraction, 2)
    },
    draw: function(progress) {
      window.scrollTo(0, start * (1 - progress));
    }
  });
}

$footerArrowMain.addEventListener('mouseenter', () => {
  $footerArrow.classList.toggle('hover');
  $footerArrow_avg.classList.toggle('hover');
});

$footerArrowMain.addEventListener('mouseleave', () => {
  $footerArrow.classList.toggle('hover');
  $footerArrow_avg.classList.toggle('hover');
});



/*
git remote add origin https://github.com/ArtisticH/Spotify-Clone.git
git branch -M main
git push -u origin main
*/