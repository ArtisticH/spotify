// ----------------------------------------------------------------------------------
// 공통 

const $rightArrowContents = document.querySelectorAll('.js-right-arrow__contents');
// rewind 안 끝난 상태에서 mouseenter했을때 효과 깨지는 거 고쳐야 함!
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

const $spotImg = document.querySelectorAll('.spotImg');
const $spotImgRead = document.querySelectorAll('.spotImgRead');
const $spotFlex = document.querySelector('.spotFlex');
const $spotCursor = document.getElementById('spotCursor');
const $spotCursorCircle = document.getElementById('spotCursor_circle');
const $spotCursorCircleLeft = document.getElementById('spotCursor_circle_left');
const $spotCursorCircleRight = document.getElementById('spotCursor_circle_right');

$spotImg.forEach(img => {
  img.ondragstart = () => {
    return false;
  }
})

$spotFlex.addEventListener('mouseover', (e) => {

  $spotCursor.classList.add('active');

  let imgElem = e.target.closest('.spotImg');
  if(!imgElem) return;
  if(e.relatedTarget.classList.contains('spotImgRead')) return;

  imgElem.style.cursor = 'pointer';
  let svgElem = imgElem.closest('.spotImg_container').lastElementChild;
  let imgReadElem = imgElem.nextElementSibling;
  imgReadElem.classList.add('hover');
  svgElem.classList.add('hover');

  imgElem.addEventListener('mouseout', (event) => {
    if(event.relatedTarget.classList.contains('spotImgRead')) return;
    imgElem.style.cursor = '';
    imgReadElem.classList.remove('hover');
    svgElem.classList.remove('hover');  
  });
  }
);

$spotFlex.addEventListener('mousemove', (event) => {
  let width = $spotCursor.offsetWidth;
  let height = $spotCursor.offsetHeight;
  $spotCursor.style.top = event.clientY - $spotFlex.getBoundingClientRect().top - height / 2 + 'px';
  $spotCursor.style.left = event.clientX - $spotFlex.getBoundingClientRect().left - width / 2 + 'px';
});







// $spotFlex.addEventListener('mouseenter', (e) => {
//   $spotCursor.classList.add('active');

//   animate({
//     duration: 400,
//     timing: function quad(timeFraction) {
//       return Math.pow(timeFraction, 2)
//     },
//     draw: function(progress) {
//       $spotCursor.style.opacity = progress + '';
//     }
//   });

//   $spotFlex.addEventListener('mousemove', (event) => {
//     event.stopPropagation();
//     let width = $spotCursor.offsetWidth;
//     let height = $spotCursor.offsetHeight;
//     $spotCursor.style.top = event.clientY - $spotFlex.getBoundingClientRect().top - height / 2 + 'px';
//     $spotCursor.style.left = event.clientX - $spotFlex.getBoundingClientRect().left - width / 2 + 'px';  
//   });
// });


let count = 0;
let position = 0;
// $spotFlex일때만 활성화되게끔
document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowRight') {
    if(count >= 10) {
      $spotFlex.style.marginLeft = -position + 'px';  
    } else {
      count++;
      let afterLeft = $spotImg[count].getBoundingClientRect().left;
      let beforeLeft = $spotImg[count - 1].getBoundingClientRect().left;
      let movedMarginLeft = afterLeft - beforeLeft;
      position += movedMarginLeft;
      $spotFlex.style.marginLeft = -position + 'px';  
    }
  }
})

document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowLeft') {
    let afterLeft = $spotImg[count].getBoundingClientRect().left;
    let beforeLeft = $spotImg[count - 1].getBoundingClientRect().left;
    let movedMarginLeft = afterLeft - beforeLeft;
    position -= movedMarginLeft;
    $spotFlex.style.marginLeft = -position + 'px';
    count--;
    console.log(count, afterLeft, beforeLeft, movedMarginLeft, position);
  }
})


// let observer = new IntersectionObserver((e) => {
//   e.addEventListener('keydown', (event) => {
//     console.log(event.key);
//   })
// });
// observer.observe($spotFlex);

// });

// $spotFlex.addEventListener('mouseover', (event) => {
//   if(event.target.closest('.spotFlex')) {
//     $spotCursor.classList.add('active');

//     animate({
//       duration: 400,
//       timing: function quad(timeFraction) {
//         return Math.pow(timeFraction, 2)
//       },
//       draw: function(progress) {
//         $spotCursor.style.opacity = progress + '';
//       }
//     });
//   }

//   $spotFlex.addEventListener('mousemove', (e) => {

//     let width = $spotCursor.offsetWidth;
//     let height = $spotCursor.offsetHeight;
//     $spotCursor.style.top = e.clientY - $spotFlex.getBoundingClientRect().top - height / 2 + 'px';
//     $spotCursor.style.left = e.clientX - $spotFlex.getBoundingClientRect().left - width / 2 + 'px';
        
//   });

//   if(event.target.closest('.spotImg')) {
//     console.log(9)
    // $spotCursorCircle.style.width = '30px';
    // $spotCursorCircle.style.height = '30px';
    // $spotCursorCircleLeft.style.transform = 'rotate(180deg) scale(0)';
    // $spotCursorCircleRight.style.transform = 'rotate(180deg) scale(0)';
//     $spotFlex.style.cursor = 'pointer';    
//   }
  
//   $spotFlex.addEventListener('mouseout', () => {

//     if(event.target.closest('.spotImg')) {
      // $spotCursorCircle.style.width = '';
      // $spotCursorCircle.style.height = '';
      // $spotCursorCircleLeft.style.transform = '';
      // $spotCursorCircleRight.style.transform = '';
      // $spotFlex.style.cursor = '';    
//     }
//      $spotCursor.classList.remove('active');
//   });
// });

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