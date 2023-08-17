
// ----------------------------------------------------------------------------------
// RELEASE

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


    setTimeout(() => {
      $secondLine.classList.remove('rewind');
    }, 300);
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
  console.log(e.target)
  $spotCursor.classList.add('active');

  animate({
    duration: 400,
    timing: function quad(timeFraction) {
      return Math.pow(timeFraction, 2)
    },
    draw: function(progress) {
      $spotCursor.style.opacity = progress + '';
    }
  });

  $spotFlex.addEventListener('mousemove', (event) => {
    let width = $spotCursor.offsetWidth;
    let height = $spotCursor.offsetHeight;
    $spotCursor.style.top = event.clientY - $spotFlex.getBoundingClientRect().top - height / 2 + 'px';
    $spotCursor.style.left = event.clientX - $spotFlex.getBoundingClientRect().left - width / 2 + 'px';  
  
  });




  let imgElem = e.target.closest('.spotImg');
  if(!imgElem) return;
  if(e.relatedTarget.classList.contains('spotImgRead')) return;

  $spotFlex.style.cursor = 'pointer';
  let svgElem = imgElem.closest('.spotImg_container').lastElementChild;
  let imgReadElem = imgElem.nextElementSibling;
  imgReadElem.classList.add('hover');
  svgElem.classList.add('hover');

  imgElem.addEventListener('mouseout', (event) => {
    if(event.relatedTarget.classList.contains('spotImgRead')) return;
    $spotFlex.style.cursor = '';
    imgReadElem.classList.remove('hover');
    svgElem.classList.remove('hover');
  
  });
  
  }
);

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


// $spotFlex.addEventListener('mouseenter', () => {
//   $spotCursor.classList.add('active');

  // animate({
  //   duration: 400,
  //   timing: function quad(timeFraction) {
  //     return Math.pow(timeFraction, 2)
  //   },
  //   draw: function(progress) {
  //     $spotCursor.style.opacity = progress + '';
  //   }
  // });

  // $spotFlex.addEventListener('mousemove', (e) => {
  //   let width = $spotCursor.offsetWidth;
  //   let height = $spotCursor.offsetHeight;
  //   $spotCursor.style.top = e.clientY - $spotFlex.getBoundingClientRect().top - height / 2 + 'px';
  //   $spotCursor.style.left = e.clientX - $spotFlex.getBoundingClientRect().left - width / 2 + 'px';  
  
  // });

//   $spotFlex.addEventListener('mouseleave', () => {
//     $spotCursor.classList.remove('active');
//   });
  

// })


// $spotImg.forEach((img) => {

//   img.addEventListener('mouseenter', (e) => {
//     let index = [...$spotImg].indexOf(img);
//     [...$spotImgRead].forEach((item) => {
//       item.classList.remove('hover');
//     });
//     if(e.target === $spotImg[index] && (e.relatedTarget === $spotFlex || e.relatedTarget === e.target.parentNode)) {
//       // spotSvg.classList.add('hover');
//       $spotImgRead[index].classList.add('hover');
//     }

//     img.addEventListener('mouseleave', (e) => {
//       let index = [...$spotImg].indexOf(img);
//       if((e.target === $spotImg[index]) && (e.relatedTarget === $spotFlex || e.relatedTarget === e.target.parentNode)) {
//         // spotSvg.classList.remove('hover');
//         $spotImgRead[index].classList.remove('hover');
//       }
//     });
  
//   });


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
//     $spotCursorCircle.style.width = '30px';
//     $spotCursorCircle.style.height = '30px';
//     $spotCursorCircleLeft.style.transform = 'rotate(180deg) scale(0)';
//     $spotCursorCircleRight.style.transform = 'rotate(180deg) scale(0)';
//     $spotFlex.style.cursor = 'pointer';    
//   }
  
//   $spotFlex.addEventListener('mouseout', () => {

//     if(event.target.closest('.spotImg')) {
//       $spotCursorCircle.style.width = '';
//       $spotCursorCircle.style.height = '';
//       $spotCursorCircleLeft.style.transform = '';
//       $spotCursorCircleRight.style.transform = '';
//       $spotFlex.style.cursor = '';    
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