// ----------------------------------------------------------------------------------
// 공통 

const $rightArrowContents = document.querySelectorAll('.js-right-arrow__contents');
// rewind 안 끝난 상태에서 mouseenter 했을때 효과 깨지는 거 고쳐야 함!
[...$rightArrowContents].forEach(rightArrowContent => {
  let $firstUnderline;
  let $backgroundBlack;
  let $invert;
  let $secondUnderline;

  rightArrowContent.addEventListener('pointerenter', () => {

    $firstUnderline = rightArrowContent.querySelector('.js-right-arrow__contents__title-box__title');
    $backgroundBlack = rightArrowContent.querySelector('.js-right-arrow__contents__arrow-circle');
    $invert = rightArrowContent.querySelector('.js-right-arrow__contents__arrow-circle__arrow-img');
    $secondUnderline = rightArrowContent.querySelector('.js-right-arrow__contents__title-box__second-line');

    $firstUnderline.classList.add('--underline');
    $backgroundBlack.classList.add('--background-color');
    $invert.classList.add('--invert');
    $secondUnderline.classList.add('hover');


  });

  rightArrowContent.addEventListener('pointerleave', async () => {
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
// 새로고침

// window.addEventListener('beforeunload', () => {
// });

// ----------------------------------------------------------------------------------
// INTRO

const $mainImageBoxes = document.querySelectorAll('.main__img-title__images__image-box');
let indexForZindexofImageBoxes = 15;
let indexForStack = 0;
let scalePercentage = 100;

const $introFlower = document.querySelector('.intro__flower');
const $introLogo = document.querySelector('.intro__logo');
const $main = document.querySelector('.main');
const $header = document.querySelector('.header');

[...$mainImageBoxes].forEach(imageBox => {
  imageBox.style.zIndex = `${indexForZindexofImageBoxes}`;
  imageBox.style.transform = `translate(-50% -50%) scale(${scalePercentage / 100})`;

  indexForZindexofImageBoxes--;
  scalePercentage -= 5;
});

/*
css에서
.intro__logo display: block <-> none;
.header, .main visibility: hidden; <-> 없애기

위에서 imageBox.classList.add('stack'); 미리 추가해놓고 실제는 없애라
*/

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  document.body.style.overflowY = 'hidden';
  document.body.style.backgroundColor = '#ffd0d5';


  setTimeout(() => {
    $introFlower.style.display = 'block';
  }, 1500);

  setTimeout(() => {
    const introFlowerWidth = $introFlower.offsetWidth;

    $introLogo.style.display = 'none';
    $main.style.visibility = 'visible';
    $header.style.visibility = 'visible';

    document.body.style.overflowY = '';
    document.body.style.backgroundColor = '';

    animate({
      duration: 2000,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        $introFlower.style.left = -(introFlowerWidth * progress) + '%';
      }
    });

    let intervalId = setInterval(() => {
      [...$mainImageBoxes][indexForStack].classList.add('stack');
      indexForStack++;

      if(indexForStack >= $mainImageBoxes.length) {
        clearInterval(intervalId);
        imgAutoSlide();
      }

    }, 30);
  }, 4000);
});

const mainSubjects = [
  "BEHIND THE SCENES",
  "Q+A",
  "BEHIND THE SCENES",
  "METHODS",
  "DESIGN SYSTEMS",
  "BEHIND THE SCENES",
  "PRODUCT DESIGN",
  "PRODUCT DESIGN",
  "BEHIND THE SCENES",
  "DESIGN OPS",
  "PRODUCT DESIGN",
  "BEHIND THE SCENES",
  "BEHIND THE SCENES",
  "Q+A",
  "PRODUCT DESIGN"
];

const mainTitles = [
  "Collaboration Secrets: Design X Engineering",
  "Ask Spotify Design 07",
  "Making Moves: Designing Motion for 2022 Wrapped",
  "Navigating the Discovery Phase",
  "Can I get an Encore? Spotify’s Design System, Three Years On",
  "From Web Page to Web Player: How Spotify Designed a New Homepage Experience",
  "Designing for the World: An Introduction to Localization",
  "Finding your T-Shape as a Specialist Designer",
  "Backstage Tickets to the World of Service Design at Spotify",
  "Growing, Scaling, and Tuning: Meet Spotify’s Global Head of Design Ops",
  "Finding your T-Shape as a Generalist Designer",
  "A Designer's Balancing Act: Staying Creative and Organized in Figma",
  "How to Stand Out as a Spotify Internship Applicant",
  "Ask Spotify Design 06",
  'Beyond "Good Job": How to Give Impactful Feedback'
];

const $progressCurrentNum = document.querySelector('.main__progress-scroll__progress__current-number');
const $progressSubject = document.querySelector('.main__img-title__title-box__box__subject');
const $progressTitle = document.querySelector('.main__img-title__title-box__box__title');
const backgroundColorBlue = '#a4c8d7';
const backgroundColorOrange = '#fcba4a';

let progressCurrentNum = 1;
let countReverse = 14;

function imgAutoSlide() {
  $progressCurrentNum.textContent = '01';
  $progressSubject.textContent = mainSubjects[0];
  $progressTitle.textContent = mainTitles[0];
  $main.style.backgroundColor = '';
  $header.style.backgroundColor = '';

  let progressInterval = setInterval(async () => {
    let currentNum = progressCurrentNum + 1 < 10 ? '0' + (progressCurrentNum + 1) : progressCurrentNum + 1;
    $progressCurrentNum.textContent = currentNum
    $progressSubject.textContent = mainSubjects[progressCurrentNum];
    $progressTitle.textContent = mainTitles[progressCurrentNum];
    console.log(currentNum, mainSubjects[progressCurrentNum], mainTitles[progressCurrentNum], progressCurrentNum);
    $mainImageBoxes[progressCurrentNum - 1].style.left = `200%`;


    switch(progressCurrentNum) {
      case 4: case 6: case 7: case 9: case 10: case 14:
        $main.style.backgroundColor = backgroundColorOrange;
        $header.style.backgroundColor = backgroundColorOrange;
        break;
      case 3:
        $main.style.backgroundColor = backgroundColorBlue;
        $header.style.backgroundColor = backgroundColorBlue;
        break;
      default:
        $main.style.backgroundColor = '';
        $header.style.backgroundColor = '';
    }

    progressCurrentNum++;

    if(progressCurrentNum >= 15) {
      clearInterval(progressInterval); 
      progressCurrentNum = 1;
      console.log('끝', progressCurrentNum)
      
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 5000)
      })

      let intervalId = setInterval(() => {
        [...$mainImageBoxes][countReverse].style.left = '50%';
        countReverse--;  
        console.log(countReverse)
        if(countReverse < 0) {
          clearInterval(intervalId);
          countReverse = 14;
          imgAutoSlide();
        }
      }, 30);
  
      return;
    }
  }, 5000);

  return;
}

// ----------------------------------------------------------------------------------
// HEADER

// 메뉴 세 라인, 클릭 효과
const $menuLines = document.querySelector('.header__menu-lines');
const $menuLinesFirst = document.querySelector('.header__menu-lines__line--first');
const $menuLinesSecond = document.querySelector('.header__menu-lines__line--second');
const $menuLinesThird = document.querySelector('.header__menu-lines__line--third');
const $menuPopUp = document.querySelector('.menu-pop');
const $menuPopUpCategoryAbsolute = document.querySelector('.menu-pop__category--absolute');
const paddingToAdd = window.innerWidth - document.documentElement.clientWidth;

$menuLines.onclick = () => {
  $menuLinesFirst.classList.toggle('active');
  $menuLinesSecond.classList.toggle('active');
  $menuLinesThird.classList.toggle('active');
  $menuPopUp.classList.toggle('active');
  document.body.classList.toggle('active');
  $menuPopUpCategoryAbsolute.classList.toggle('active');

  // body overflow가 hidden되면 스크롤바가 갑자기 사라지면서 너비가 조정되니까
  // body에 그만큼 오른쪽 패딩을 먹여야 한다.
  if(document.body.classList.contains('active')) {
    document.body.style.paddingRight = paddingToAdd + 'px';
    $menuPopUpCategoryAbsolute.style.paddingRight = paddingToAdd + 'px';
  } else {
    document.body.style.paddingRight = '';
    $menuPopUpCategoryAbsolute.style.paddingRight = '';
  }
};

window.addEventListener('resize', () => {
  if(window.innerWidth >= 600) {
    $menuPopUp.classList.remove('active');
    document.body.classList.remove('active');
    $menuLinesFirst.classList.remove('active');
    $menuLinesSecond.classList.remove('active');
    $menuLinesThird.classList.remove('active');  
    $menuPopUpCategoryAbsolute.classList.remove('active');
  
    document.body.style.paddingRight = '';
    $menuPopUpCategoryAbsolute.style.paddingRight = '';
  }
})

// 메뉴 텍스트, 호버 효과
const $menuTextBox = document.querySelectorAll('.header__menu-texts__text-box');

[...$menuTextBox].forEach(item => {
  item.addEventListener('pointerenter', () => {
    item.querySelector('.header__menu-texts__text-box__circle').classList.toggle('hover');
    item.querySelector('.header__menu-texts__text-box__text').classList.toggle('hover');
  });

  item.addEventListener('pointerleave', () => {
    item.querySelector('.header__menu-texts__text-box__circle').classList.toggle('hover');
    item.querySelector('.header__menu-texts__text-box__text').classList.toggle('hover');
  });
});

// ----------------------------------------------------------------------------------
// MAIN

// 스크롤 다운
const $mainScrollDown = document.querySelector('.main__progress-scroll__scroll');
const $mainScrollDownCircle = document.querySelector('.main__progress-scroll__scroll__circle');
const $mainScrollDownCircleArrow = document.querySelector('.main__progress-scroll__scroll__circle__arrow');
const $release = document.querySelector('.release');

$mainScrollDown.onclick = () => {
  const start = window.pageYOffset; 
  const end = $release.getBoundingClientRect().top + window.pageYOffset; 

  animate({
    duration: 300,
    timing: function linear(timeFraction) {
      return timeFraction;
    },
    draw: function(progress) {
      if(progress <= 0) return;
      window.scrollTo(0, start + (end - start) * progress);
    }
  });
}

$mainScrollDown.addEventListener('pointerenter', () => {
  $mainScrollDownCircle.classList.toggle('hover');
  $mainScrollDownCircleArrow.classList.toggle('hover');
});

$mainScrollDown.addEventListener('pointerleave', () => {
  $mainScrollDownCircle.classList.toggle('hover');
  $mainScrollDownCircleArrow.classList.toggle('hover');
});



// ----------------------------------------------------------------------------------
// RELEASE

const $releaseImgBoxes = document.querySelectorAll('.js-release__img-box');

[...$releaseImgBoxes].forEach(imgBox => {
  let $title;
  let $playButton;

  imgBox.addEventListener('pointerenter', () => {
    $title = imgBox.querySelector('.js-img-box__title');
    $title.classList.add('--underline');

    if(imgBox.firstElementChild.classList.contains('js-release__img-box__play-box')) {
      $playButton = imgBox.querySelector('.js-release__img-box__play-box__play-button');
      $playButton.classList.add('--background');
    }
  });

  imgBox.addEventListener('pointerleave', () => {
    $title.classList.remove('--underline');

    if(imgBox.firstElementChild.classList.contains('js-release__img-box__play-box')) {
      $playButton.classList.remove('--background');
    }
  });
});


// ----------------------------------------------------------------------------------
// SPOTLIGHT
/*
translate3d는 항상 어디에서 어디 가는지를 명시해줘야 자연스럽게 되지, 
안 그럼 0, 0에서 출발
예를 들면 -452에서 -700을 가려면 -452에서 -700가는 걸 명시해줘야지, 그냥 띡하니 -700하면 0에서 -700으로 출발한다.
*/
const $spotlightScrollItem = document.querySelectorAll('.js-spotlight__scroll__item');
const $spotlightScrollInner = document.querySelector('.js-spotlight__scroll__inner');
const $spotlightImg = document.querySelectorAll('.js-spotlight__scroll__item__img-box__img');

document.ondragstart = () => {
  return false;
}

let spotlightCount = 0;
let currentOffsetLeft = 0;

// 키보드 
document.addEventListener('keydown', (e) => {
  if(e.key == 'ArrowRight') {
    if(spotlightCount >= 10) return;

    const rightGoalOffsetLeft = $spotlightScrollItem[spotlightCount + 1].offsetLeft; // 양수
    const neededValue = currentOffsetLeft - rightGoalOffsetLeft; // 음수
    
    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        // progress가 음수일 수도 있다.
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + neededValue * progress}px, 0px, 0px)`;
        if(progress >= 1) {
          spotlightCount++;
          currentOffsetLeft = rightGoalOffsetLeft;
        } 
      }
    });
  }

  if(e.key == 'ArrowLeft') {
    if(spotlightCount <= 0) return;

    const leftGoalOffsetLeft = $spotlightScrollItem[spotlightCount - 1].offsetLeft; // 양수
    const neededValue = leftGoalOffsetLeft - currentOffsetLeft; // 음수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-leftGoalOffsetLeft + (neededValue * (1 - progress))}px, 0px, 0px)`;
        if(progress >= 1) {
          spotlightCount--;
          currentOffsetLeft = leftGoalOffsetLeft;
        } 
      }
    });
  }
});

// 사이즈 새로고침 했을 때 끝에서부터 반복되는거? -> 
// 브라우저 사이즈가 변경될 때마다 예를 들어 $spotlightScrollItem[1].offsetLeft의 값이 364, 424, 696으로 바뀌기 때문에 
// 현재 기준으로 currentOffsetLeft을 계산해야 한다. 
window.addEventListener('resize', () => {
  currentOffsetLeft = $spotlightScrollItem[spotlightCount].offsetLeft;
  $spotlightScrollInner.style.transform = `translate3d(${-$spotlightScrollItem[spotlightCount].offsetLeft}px, 0px, 0px)`;
});

let currentElem = null;
let svgElem;
let readElem;
let readElemText; 
let readElemMore;

$spotlightScrollInner.addEventListener('pointerover', async (e) => {
  if(currentElem) return;
  if(e.target.className !== 'js-spotlight__scroll__item__img-box__img') return;
  currentElem = e.target;

  svgElem = currentElem.parentNode.lastElementChild;
  readElem = currentElem.parentNode.querySelector('.spotlight__scroll__item__img-box__read');
  readElemText = readElem.querySelector('.spotlight__scroll__item__img-box__read__text');
  readElemMore = readElem.querySelector('.spotlight__scroll__item__img-box__read__more');

  svgElem.classList.add('bloom');
  readElem.classList.add('show');

  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  });

  readElemText.classList.add('show');

  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  });

  readElemMore.classList.add('show');
});

$spotlightScrollInner.addEventListener('pointerout', async (e) => {
  if (!currentElem) return;

  svgElem.classList.replace('bloom', 'shrink');
  readElem.classList.remove('show');
  readElemText.classList.remove('show');
  readElemMore.classList.remove('show');

  currentElem = null;

  await new Promise(resolve => {
    setTimeout(() => {
      svgElem.classList.remove('shrink');
      resolve();
    }, 1000);
  });
});

const $spotlightCursor = document.querySelector('.js-spotlight-cursor');
const $spotlightCursorCircle = document.querySelector('.js-spotlight-cursor__circle');

// 마우스 커서
$spotlightScrollInner.addEventListener('pointerover', (e) => {
  $spotlightScrollInner.appendChild($spotlightCursor);
  $spotlightCursor.className = 'js-spotlight-cursor show';

  const imgClassList = e.target.className;

  if(imgClassList === 'js-spotlight__scroll__item__img-box__img') {
    $spotlightCursor.className = 'js-spotlight-cursor show scale';
    $spotlightCursorCircle.className = 'js-spotlight-cursor__circle scale';
  }

  $spotlightScrollInner.addEventListener('pointermove', (e) => {
    const topOfCursor = e.clientY - $spotlightScrollInner.getBoundingClientRect().top - ($spotlightCursor.offsetHeight / 2);
    const leftOfCursor = e.clientX - $spotlightScrollInner.getBoundingClientRect().left - ($spotlightCursor.offsetWidth / 2);

    $spotlightCursor.style.top = topOfCursor + 'px';
    $spotlightCursor.style.left = leftOfCursor + 'px'; 
  });

  $spotlightScrollInner.addEventListener('pointerout', (e) => {
    $spotlightCursor.className = 'js-spotlight-cursor';

    if(imgClassList === 'js-spotlight__scroll__item__img-box__img') {
      $spotlightCursor.className = 'js-spotlight-cursor show';
      $spotlightCursorCircle.className = 'js-spotlight-cursor__circle';
    }  
  })
});

let firstPointerDown;
let xValue;

// 드래그 앤 드롭
$spotlightScrollInner.addEventListener('pointerdown', (e) => {

  $spotlightCursor.classList.add('pointerdown');
  $spotlightCursorCircle.className = 'js-spotlight-cursor__circle scale';


  firstPointerDown = 0;
  xValue = 0;
  firstPointerDown = e.clientX - xValue;
  console.log(
    ['pointerdown'],
    ['firstPointerDown', firstPointerDown],
    ['e.clientX', e.clientX],
    ['xValue', xValue]
  );
  // 슬라이드가 드래그 되는 효과
  $spotlightScrollInner.addEventListener('pointermove', moveEvent);
});

$spotlightScrollInner.addEventListener('pointerup', () => {

  $spotlightCursor.classList.remove('pointerdown');
  $spotlightCursorCircle.className = 'js-spotlight-cursor__circle';
  
  $spotlightScrollInner.removeEventListener('pointermove', moveEvent);

  // 슬라이드가 튕기거나 혹은 다음 이미지로 움직이거나
  bounceEvent();
});


function moveEvent(e) {
  // xValue는 왼쪽으로 드래그 할때는 음수, 오른쪽으로 드래그 할 때는 양수
  xValue = e.clientX - firstPointerDown;
  console.log(
    ['moveEvent'],
    ['xValue', xValue],
    ['e.clientX', e.clientX],
    ['firstPointerDown', firstPointerDown],
    ['currentOffsetLeft', currentOffsetLeft],
    ['-currentOffsetLeft + xValue', -currentOffsetLeft + xValue]
  );
  // 왼쪽 오른쪽 둘 다 적용
  $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue}px, 0px, 0px)`;
}

function bounceEvent() {
  const standard = $spotlightScrollItem[spotlightCount+1].getBoundingClientRect().left - $spotlightScrollItem[spotlightCount].getBoundingClientRect().right;
  const absolutexValue = Math.abs(xValue);

  if(absolutexValue < standard * 2.5 || spotlightCount == 0 || spotlightCount == 10) {
      animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        // 왼쪽 오른쪽 둘 다 적용, xValue가 소멸하면서 원래 자리로 돌아오는 효과

        console.log(
          ['튕길 때'],
          ['xValue', xValue],
          ['currentOffsetLeft', currentOffsetLeft],
          ['-currentOffsetLeft +  xValue * (1 - progress)', -currentOffsetLeft +  xValue * (1 - progress)]
        );
    
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft +  xValue * (1 - progress)}px, 0px, 0px)`;
      }
    });

  } 

  // 왼쪽으로 드래그
  if(absolutexValue >= standard * 2.5 && xValue < 0) {

    if(spotlightCount == 10) return;

    const nextImgOffsetLeft = $spotlightScrollItem[spotlightCount + 1].offsetLeft; // 양수
    const neededValue = nextImgOffsetLeft + (-currentOffsetLeft + xValue); // 양수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        console.log(
          ['다음 이미지로, 왼쪽'],
          ['xValue', xValue],
          ['neededValue', neededValue],
          ['nextImgOffsetLeft', nextImgOffsetLeft],
          ['-currentOffsetLeft + xValue + -neededValue * progress', -currentOffsetLeft + xValue + -neededValue * progress]
        );
        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue + -neededValue * progress}px, 0px, 0px)`;

        if(progress >= 1) {
          spotlightCount++;
          currentOffsetLeft = nextImgOffsetLeft;      
        }
      }
    });
  }

  // 오른쪽으로 드래그
  if(absolutexValue >= standard * 2.5 && xValue > 0) {

    if(spotlightCount == 0) return;
    const beforeImgOffsetLeft = $spotlightScrollItem[spotlightCount - 1].offsetLeft; // 양수
    const neededValue = currentOffsetLeft - xValue - beforeImgOffsetLeft; // 양수

    animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        console.log(
          ['다음 이미지로, 오른쪽'],
          ['xValue', xValue],
          ['neededValue', neededValue],
          ['beforeImgOffsetLeft', beforeImgOffsetLeft],
          ['-currentOffsetLeft + xValue + neededValue * progress', -currentOffsetLeft + xValue + neededValue * progress]
        );

        if(progress <= 0) return;
        $spotlightScrollInner.style.transform = `translate3d(${-currentOffsetLeft + xValue + neededValue * progress}px, 0px, 0px)`;

        if(progress >= 1) {
          spotlightCount--;
          currentOffsetLeft = beforeImgOffsetLeft;      
        }
      }
    });
  }
}


// ----------------------------------------------------------------------------------
// INBOX


const $inbox = document.querySelector('.js-inbox');
const $inboxSvgCirclePath1 = document.querySelector('.js-inbox__title__text-box__svg-circle__path1');
const $inboxSvgCirclePath2 = document.querySelector('.js-inbox__title__text-box__svg-circle__path2');
const $inboxSvgCirclePath1_lenghth = $inboxSvgCirclePath1.getTotalLength(); // 244.7532196044922
const $inboxSvgCirclePath2_length = $inboxSvgCirclePath2.getTotalLength(); // 294.6005859375
const $inboxSvgArrowPath1 = document.querySelector('.js-inbox__title__svg-arrow__path1');
const $inboxSvgArrowPath2 = document.querySelector('.js-inbox__title__svg-arrow__path2');
const $inboxSvgArrowPath1_length = $inboxSvgArrowPath1.getTotalLength(); // 48.15165710449219
const $inboxSvgArrowPath2_length = $inboxSvgArrowPath2.getTotalLength(); // 195.17434692382812

/*
window.pageYOffset: 세로 스크롤에 의해 가려진 위쪽 영역 높이
window.innerHeight: 전체 창 너비
document.documentElement.clientHeight: 스크롤바가 차지하는 영역을 제외한 창 너비
*/

document.addEventListener('scroll', () => {
  const ratio = (window.pageYOffset + document.documentElement.clientHeight - ($inbox.getBoundingClientRect().top + window.pageYOffset)) / $inbox.offsetHeight;

  if (ratio >= 0.4 && ratio < 1.15) {
    $inboxSvgCirclePath1.classList.add('active');
    $inboxSvgCirclePath2.classList.add('active');
    $inboxSvgArrowPath1.classList.add('active');
    $inboxSvgArrowPath2.classList.add('active');
  } else if (ratio <= 0.3 || ratio >= 1.17) {
    $inboxSvgCirclePath1.classList.remove('active');
    $inboxSvgCirclePath2.classList.remove('active');
    $inboxSvgArrowPath1.classList.remove('active');
    $inboxSvgArrowPath2.classList.remove('active');
  }
})


// ----------------------------------------------------------------------------------
// JOBS

const $toolsImgBoxes = document.querySelectorAll('.js-tools__img-box');

[...$toolsImgBoxes].forEach(imgBox => {
  let title;

  imgBox.addEventListener('pointerenter', () => {
    title = imgBox.querySelector('.js-img-box__title');
    title.classList.add('--underline');
  });

  imgBox.addEventListener('pointerleave', () => {
    title.classList.remove('--underline');
  });
});

const $jobs = document.querySelector('.js-jobs');
const $jobsMiamiArrow = document.querySelector('.js-jobs__miami__arrow');
const $jobsMiamiArrowCircle = document.querySelector('.js-jobs__miami__arrow__circle');
const $jobsMiamiArrowCircleArrow = document.querySelector('.js-jobs__miami__arrow__circle__arrow');
const $jobsEditorial = document.querySelector('.js-jobs__editorial');

$jobs.addEventListener('mouseenter', () => {
  jobsAdd($jobsMiamiArrow, $jobsMiamiArrowCircle, $jobsMiamiArrowCircleArrow, $jobsEditorial)
});

$jobs.addEventListener('mouseleave', () => {
  jobsRemove($jobsMiamiArrow, $jobsMiamiArrowCircle, $jobsMiamiArrowCircleArrow, $jobsEditorial)
});

function jobsAdd(item1, item2, item3, item4) {
  item1.classList.add('hover');
  item2.classList.add('hover');
  item3.classList.add('hover');
  item4.classList.add('hover');
}

function jobsRemove(item1, item2, item3, item4) {
  item1.classList.remove('hover');
  item2.classList.remove('hover');
  item3.classList.remove('hover');
  item4.classList.remove('hover');
}

// ----------------------------------------------------------------------------------
// TIME
// SE -> UK -> US
const $hours = document.querySelectorAll('.js-time__main-box__times__time__clock__hour');
const $mins = document.querySelectorAll('.js-time__main-box__times__time__clock__minute');
const $secs = document.querySelectorAll('.js-time__main-box__times__time__clock__second');

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

const $backToTopContents = document.querySelector('.js-footer__back-to-top__contents');
const $backToTopContentsArrow = document.querySelector('.js-footer__back-to-top__contents__arrow');
const $backToTopContentsArrowImg = document.querySelector('.js-footer__back-to-top__contents__arrow_img');

$backToTopContents.onclick = () => {
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

$backToTopContents.addEventListener('pointerenter', () => {
  $backToTopContentsArrow.classList.toggle('hover');
  $backToTopContentsArrowImg.classList.toggle('hover');
});

$backToTopContents.addEventListener('pointerleave', () => {
  $backToTopContentsArrow.classList.toggle('hover');
  $backToTopContentsArrowImg.classList.toggle('hover');
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
