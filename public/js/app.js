// 오른쪽 화살표 효과
(async function rightArrows() {
  const $rightArrows = document.querySelectorAll('.rightarrow__box');
  let $rightArrowTitle;
  let $rightArrowLine;
  let $rightArrowCircle;
  let $rightArrowImg;

  function enterEvent(e) {
    $rightArrowTitle = e.target.querySelector('.rightarrow__box__title-line__title');
    $rightArrowLine = e.target.querySelector('.rightarrow__box__title-line__line');;
    $rightArrowCircle = e.target.querySelector('.rightarrow__box__arrow');;
    $rightArrowImg = e.target.querySelector('.rightarrow__box__arrow__img');

    $rightArrowTitle.classList.add('overed');
    $rightArrowLine.classList.add('overed');
    $rightArrowCircle.classList.add('overed');
    $rightArrowImg.classList.add('overed');
  }

  async function leaveEvent(e) {
    $rightArrowTitle.classList.remove('overed');
    $rightArrowLine.classList.replace('overed', 'rewind');
    $rightArrowCircle.classList.remove('overed');
    $rightArrowImg.classList.remove('overed');

    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    $rightArrowLine.classList.remove('rewind');
  }

  for(let rightArrow of $rightArrows) {
    rightArrow.addEventListener('pointerenter', enterEvent);
  }

  for(let rightArrow of $rightArrows) {
    rightArrow.addEventListener('pointerleave', leaveEvent);
  }
})();

// 인트로
class Intro {
  constructor() {
    // 인트로
    this.$introLogo = document.querySelector('.intro-logo');
    this.$introFlower = document.querySelector('.intro-flower');
    this.init = this.init.bind(this);
    this.showFlower = this.showFlower.bind(this);
    this.disappearIntro = this.disappearIntro.bind(this);
  }
  animate({timing, draw, duration}) {
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
  // 처음에 로고 있고 꽃이 1.5초 후에 등장
  // 4.5초 후에 로고 사라지고, 스크롤 풀리고, 
  // 0.5초간 꽃 사라지며 슬라이드 등장
  init() {
    // 맨처음으로 올려
    window.scrollTo(0, 0);
    // 스크롤 멈춰
    document.body.style.overflowY = 'hidden';
    // 1.5초 후에 꽃 보여주고
    // 4.5초 후에 로고와 꽃 사라진다. 
    setTimeout(this.showFlower, 1500);
    setTimeout(this.disappearIntro, 4500);
  }
  showFlower() {
    // 꽃 등장
    this.$introFlower.style.display = 'block';
  }
  disappearIntro() {
    // 스크롤 풀리고 로고 사라져
    this.$introLogo.style.display = 'none';
    document.body.style.overflowY = '';
    // 꽃 0.5초 동안 줄어들며 사라지고
    // 📍 마지막에 사라지는 거 추가
    this.animate({
      duration: 500,
      timing: function(timeFraction) {
        return timeFraction;
      },
      // 📍 여기 화살표 함수인거 주목, 그냥 함수는 this가 undefined된다. 
      // scale은 1 -> 0.5
      draw: (progress) => {
        this.$introFlower.style.transform = `translate3d(${-100 * progress}%, 0, 0) scale(${(-0.5 * progress) + 1})`;
      }
    });
    main.showMain();
  }
}
const intro = new Intro();
// document.addEventListener('DOMContentLoaded', intro.init);
// 헤더
class Header {
  constructor() {
    // 메뉴 클릭시 메뉴 화면 등장
    this.$menu = document.querySelector('.header-menu');
    this.$menu.onclick = this.click.bind(this);
    this.$lines = document.querySelectorAll('.header-line');
    this.$menuBack = document.getElementById('white');
    this.$menuText = document.getElementById('text');
    this.$broswerWidth = document.documentElement.clientWidth;
    this._X = null;
    // 글자 메뉴 호버효과
    this.$navs = document.querySelectorAll('.nav');
    [...this.$navs].forEach(item => {
      item.onpointerenter = this.navIn.bind(this);
    });
  }
  navIn(e) {
    const target = e.currentTarget;
    const circle = target.querySelector('.nav-circle');
    const text = target.querySelector('.nav-text');  
    circle.classList.add('pointer');
    text.classList.add('pointer');
    target.onpointerleave = () => {
      circle.classList.remove('pointer');
      text.classList.remove('pointer');  
    }
  }
  click() {
    // 삼지창에서 X자로, X자에서 삼지창으로
    for(let line of this.$lines) {
      line.classList.toggle('clicked');
    }
    // 메뉴 등장
    this.$menuBack.classList.toggle('show');
    this.$menuText.classList.toggle('show');
    if(this.$menuBack.classList.contains('show')) {
      this._X = true; // 삼지창이 된 상태
    } else {
      this._X = false; // 다시 원래 상태로, 메뉴가 안 보이는 상태로 돌아가자
    }
    if(this._X) {
      // 스크롤바 사라짐
      document.body.style.overflow = 'hidden';
      // 스크롤바 사라지면서 너비가 넓어지니까 그만큼 패딩으로 채워야 한다. 
      // 현재 넓어진 너비에서 처음 스크롤바 있을때 저장한 너비를 빼서 오른쪽 패딩으로 추가하기
      document.body.style.paddingRight = (document.documentElement.clientWidth - this.$broswerWidth) + 'px';
      this.$menuText.style.paddingRight = (document.documentElement.clientWidth - this.$broswerWidth) + 'px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      this.$menuText.style.paddingRight = '';
    }
  }
}
new Header();
// 메인
class Main {
  constructor() {
    this.$main = document.getElementById('main');
    // 툴팁
    this.$btns = document.querySelectorAll('.main-btn');
    [...this.$btns].forEach(item => {
      item.onpointerenter = this.tooltip.bind(this);
    })
    // this.$tooltip = null;
    // 스크롤텍스트 호버 효과
    this.$scroll = document.querySelector('.main-scroll');
    this.$scroll.onpointerenter = this.scroll.bind(this);
    this.$scrollBack = document.querySelector('.main-circle-back');
    this.$scrollCircle = document.querySelector('.main-circle-arrow');
    // 클릭시 스크롤 다운
    this.$scroll.onclick = this.scrollDown.bind(this);
    this.$release = document.getElementById('release');
    // 카드에 대한 모든 효과
    // 카드 슬라이드
    this.$title = document.querySelector('.main-title');
    this.$sub = document.querySelector('.main-sub');
    // 이미지를 담는 공간
    this.$imgArea = document.querySelector('.main-img-area');
    // 이미지 박스
    this.$img = Array.from(document.querySelectorAll('.main-img-box'));
    // 현재 슬라이드 넘버
    this.$current = document.querySelector('.main-current');
    // 채워지는 바
    this.$stickFill = document.querySelector('.main-stick-fill');
    // this._stack은 처음에 슬라이드가 중앙으로 촤라락 올때 쓰인다. 
    this._stack = 14;
    this._slide = 14;
    // 슬라이드가 변하면서 보여지는 배경색, 스케일, 제목들...
    this._translate = `translate(-50%, -50%)`;
    // 인덱스 14부터 0으로... 
    // 처음에 앞에서 5개는 scale이 1이다. 
    this._scale = [
    'scale(0.5)', 'scale(0.55)', 'scale(0.6)', 'scale(0.65)', 'scale(0.7)',
    'scale(0.75)', 'scale(0.8)', 'scale(0.85)', 'scale(0.9)', 'scale(0.95)',
    'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)',
    ];
    // this._stack % 5로 쓰일 예정, 
    // 즉 인덱스 4, 3, 2, 1, 0순으로.. 반복
    this._rotate = ['rotate(-3deg)', 'rotate(4deg)', 'rotate(-7deg)', 'rotate(5deg)', 'rotate(0deg)',
    ];
    this._sub = [
      "PRODUCT DESIGN",
      "Q+A",
      "BEHIND THE SCENES",
      "BEHIND THE SCENES",
      "PRODUCT DESIGN",
      "DESIGN OPS",
      "BEHIND THE SCENES",
      "PRODUCT DESIGN",
      "PRODUCT DESIGN",
      "BEHIND THE SCENES",
      "DESIGN SYSTEMS",
      "METHODS",
      "BEHIND THE SCENES",
      "Q+A",
      "BEHIND THE SCENES",
    ];
    this._main = [
      `Beyond "Good Job": How to Give Impactful Feedback`,
      "Ask Spotify Design 06",
      "How to Stand Out as a Spotify Internship Applicant",
      "A Designer's Balancing Act: Staying Creative and Organized in Figma",
      "Finding your T-Shape as a Generalist Designer",
      "Growing, Scaling, and Tuning: Meet Spotify’s Global Head of Design Ops",
      "Backstage Tickets to the World of Service Design at Spotify",
      "Finding your T-Shape as a Specialist Designer",
      "Designing for the World: An Introduction to Localization",
      "From Web Page to Web Player: How Spotify Designed a New Homepage Experience",
      "Can I get an Encore? Spotify’s Design System, Three Years On",
      "Navigating the Discovery Phase",
      "Making Moves: Designing Motion for 2022 Wrapped",
      "Ask Spotify Design 07",
      "Collaboration Secrets: Design X Engineering",
    ];
    this._backColor = [
      "#ffbc4a", "#ffd0d5", "#ffd0d5", "#ffd0d5", "#ffbc4a",
      "#ffbc4a", "#ffd0d5", "#ffbc4a", "#ffbc4a", "#ffd0d5",
      "#ffbc4a", "#a5c9d8", "#ffd0d5", "#ffd0d5", "#ffd0d5"
    ];
    // 헤더가 내려오는 효과
    this.$header = document.getElementById('header');
    // 메뉴가 삼지창 아닐때 하나씩 내려오는 효과
    this.$navs = document.querySelectorAll('.nav');
    // 직접 클릭해 슬라이드 변경
    this.$next = document.querySelector('.btn-next');
    this.$prev = document.querySelector('.btn-prev');
    this.$shuffle = document.querySelector('.btn-shuffle');
    // 자동 슬라이드의 타이머 함수 반환값, 나중에 이걸로 슬라이드 끝낼거야
    this._clearSlide = null;
    this.$prev.onclick = this.prev.bind(this);
    this.$next.onclick = this.next.bind(this);
    this.$shuffle.onclick = this.shuffle.bind(this);
    // 셔플 클릭 후 랜덤으로 담을 0와14 사이의 숫자 배열
    this._random = null;
    // 드래그애드롭
    this.$img.forEach(item => {
      item.onpointerdown = this.dragAndDrop.bind(this);
    });



    this.mouseTarget = null;
    this.shiftX = null;
    this.rectX = null;
    this.ratio = null;
    this.browserWidth = null;
    this.direction = null;

    this.moveAt = this.moveAt.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
    this.forPointerUp = this.forPointerUp.bind(this);

  }
  animate({timing, draw, duration}) {
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
  // 메인 등장
  showMain() {
    this.$main.style.visibility = 'visible';
    // 📍 슬라이드 카드 등장
    this.showCards();
  }  
  // 툴팁 호버 효과
  tooltip(e) {
    const target = e.currentTarget;
    const tooltip = target.querySelector('.main-tooltip');
    tooltip.classList.add('show');
    target.onpointerleave = () => {
      tooltip.classList.remove('show');
    }
  }
  // 스크롤 원 효과
  scroll(e) {
    const target = e.currentTarget;
    this.$scrollBack.classList.add('show');
    this.$scrollCircle.classList.add('show');
    target.onpointerleave = () => {
      this.$scrollBack.classList.remove('show');
      this.$scrollCircle.classList.remove('show');  
    }
  }
  // 스크롤 클릭시
  scrollDown() {
    const start = window.pageYOffset;
    const end = this.$release.getBoundingClientRect().top + start;
    this.animate({
      duration: 200,
      timing: function linear(timeFraction) {
        return timeFraction;
      },
      draw: (progress) => {
        if(progress <= 0) return;
        window.scrollTo(0, start + (end - start) * progress);
      }
    });    
  }
  async showCards() {
    if(this._slide === 14) {
      // 처음에 슬라이드가 중앙에 올때 prev버튼 비활성화
      this.$prev.classList.add('not');
      // 슬라이드가 다 날라가고 중앙으로 모일때 처음으로 변경해줘야 해
      this.$main.style.backgroundColor = `${this._backColor[this._slide]}`;
      this.$header.style.backgroundColor = `${this._backColor[this._slide]}`; 
      this.$sub.textContent = this._sub[this._slide];
      this.$title.textContent = this._main[this._slide];
      this.$current.textContent = '01';
    }
    // 처음에 this._stack = 14부터 시작,
    // left: 200%으로 바깥에 나가있는 이미지 박스를 중앙에 불러들일건데
    // this.$img는 노드의 배열로, absolute로 쌓이기 때문에 HTML에서 아래에 있는 요소가 가장 겉을(?)이루고 있다. 
    // 그래서 처음 화면에 딱 보이는 겉 요소는 HTML에서 가장 아래에 있는 인덱스 14번째 요소이다. 
    // 인터벌로 40ms간격으로 슬라이드를 가져온다. 
    // 40ms간격으로 이미지를 쏘면 400ms동안 이미지가 움직인다.
    let intervalId = setInterval(() => {
      // left: 200% => 50%
      // this._translate는 transform의 다른 요소들을 설정하기 위해 어쩔 수 없이 같이 써야돼
      this.$img[this._stack].style.transform = `${this._translate} ${this._scale[this._stack]} ${this._rotate[this._stack % 5]}`;
      this.$img[this._stack].style.left = '50%';
      // 그 다음놈 가져와
      this._stack--;
      if(this._stack < 0) {
        // 다 보낸 후 인덱스가 -1이 되면 이 인터벌을 끝내자. 
        clearInterval(intervalId);
        // 그 다음에 헤더 등장하고, 만약 삼지창이 아니면 내려오는 메뉴 등장
        this.$header.classList.add('show');
        for(let category of this.$navs) {
          category.classList.add('show');
        }
        // 슬라이드가 다 안착했다면
        // this.$img의 transition: left 0.4s ease-out,
        // 자동 슬라이드 시작
        new Promise((resolve) => {
          setTimeout(() => {
            this.autoSlide();
            // 바로 진행 바 시작 => 이후 알아서 무한으로 전환
            // this._slide === 14은 슬라이드가 중앙에 모인후, 그 이후를 의미
            if(this._slide === 14) {
              this.$stickFill.classList.add('progress');
            }
            resolve();
          }, 400);
        });    
      }
    }, 40);
  }
  /*
  그니까 처음에 showCards()로 슬라이드들이 중앙에 모인다.
  이때 40ms간격으로 쏘고, 오는데 400ms가 걸린다. 
  그럼 마지막 슬라이드바를 쏘고 인터벌 중단하고 400ms후에 마지막 놈이 안착한다. 
    이때 autoSlide()를 호출한다. 진행바도 실행한다. 
    바로 처음에 시작하자마자 타이틀, 서브타이틀, 배경색, 윈위치, 현재 넘버 등을 바꾸고
    5초 동안 진행바가 진행하면서 
    5초 후엔 날아간다. 
    그리고 다음 슬라이드에 대해서 똑같이 반복...
    시작 ----5초----- 날아가
    그리고 마지막 슬라이드때 5초가 지나면 날아가지 않고
    다시 showCards()..
  */
  async autoSlide() {
    // 처음에 슬라이드가 중앙에 올때 prev버튼은 비활성화되어있다. 
    // 근데 자동 슬라이드로 슬라이드가 2로 넘어가면 이 비활성화를 해제해야 한다.
    if(this.$prev.classList.contains('not') && this._slide === 13) {
      this.$prev.classList.remove('not');
    }
    // 가장 맨 앞에 있는 친구가 원래 크기와 각도로 돌아온다. 
    // 가장 맨 처음에 this._slide = 14부터 시작...
    this.$img[this._slide].style.transform = `translate(-50%, -50%) scale(1) rotate(0deg)`;
    // 배경화면 변경
    this.$main.style.backgroundColor = `${this._backColor[this._slide]}`;
    this.$header.style.backgroundColor = `${this._backColor[this._slide]}`;
    this.$sub.textContent = this._sub[this._slide];
    this.$title.textContent = this._main[this._slide];
    // 진행 바 숫자 바뀌는거
    // this._slide가 14일때 진행바는 01이니까 
    // this._slide와 현재 진행바 숫자가 합쳐쳐 15가 되야 하니까
    this.$current.textContent = (15 - this._slide) < 10 ? `0${(15 - this._slide)}` : `${(15 - this._slide)}`;
    // 스케일은 처음에 5친구는 1이고 그이후 작아져서 마지막 친구는 0.5이다. 
    // 맨 앞 친구가 주목을 받을때 뒤에 한명 크키를 키워야 한다. 
    // 내 뒤에서 5번째 친구
    if(this._slide > 4) {
      // this._slide가 4일때는 이미 뒤에 애들이 다 스케일 1임. 
      this.$img[this._slide - 5].style.transform = `translate(-50%, -50%) scale(1) ${this._rotate[this._slide  % 5]}`;
    } 
    // 5초간 기다려 => CSS에서 진행 바 진행 타임도 5초야, 
    new Promise((resolve) => {
      this._clearSlide = setTimeout(() => {
        // 이미지 날려
        if(this._slide > 0) {
          // 마지막 아니라면
          // 밖으로 날아가 🦋
          this.$img[this._slide].style.left = '200%';
          this._slide--;
          resolve();
          // 다음 자동 호출
          return this.autoSlide();      
        } else if(this._slide === 0) {
          // 마지막 슬라이드의 5초 후가 지나면, 
          // 다시 처음으로 셋팅
          // 마지막 친구는 안 날라가더라
          // 다시 중앙으로 처음처럼 모여!
          this._stack = 14;
          this._slide = 14;
          this.$stickFill.classList.remove('progress');
          resolve();
          return this.showCards();
        }
      }, 5000);
    });
  }
  // 인위적으로 넘기기
  next() {
    // 자동으로 날아가는거 멈추기
    // 진행바는 어찌할 수가 없소
    clearTimeout(this._clearSlide);
    if(this._slide > 0) {
      // 인위적으로 날리기
      this.$img[this._slide].style.left = '200%';
      this._slide--;
      // 다시 자동 시작
      return this.autoSlide();      
    } else if(this._slide === 0) {
      this._stack = 14;
      this._slide = 14;
      this.$stickFill.classList.remove('progress');
      return this.showCards();
    }
  }
  prev() {
    // 첫 화면에선 이전 버튼 눌러도 아무 효과 없어.
    if(this._slide === 14) {
      alert('첫 화면입니다');
      return;
    }
    // 13일때 이전 버튼 누르면 가장 첫 화면이 되니까 버튼 비활성화
    if(this._slide === 13) {
      this.$prev.classList.add('not');
    }
    // 날아가기 멈춰
    clearTimeout(this._clearSlide);
    this._slide++;
    // 지나간 슬라이드 다시 돌아와
    this.$img[this._slide].style.left = '50%';
    // 동시에 현재 슬라이드 rotate 변화
    this.$img[this._slide - 1].style.transform = `translate(-50%, -50%) scale(1) ${this._rotate[this._slide % 5]}`;
    // 만약 현재 인덱스 12이였는데 이전 버튼을 눌렀어. 
    // 그럼 12일때 뒤에서 5번째인 인덱스 7요소가 스케일이 1로 컸었는데 이 친구를 다시 줄여야 해
    if(this._slide > 5) {
      this.$img[this._slide - 6].style.transform = `translate(-50%, -50%) ${this._scale[this._slide]} ${this._rotate[this._slide  % 5]}`;
    } 
    return this.autoSlide();
  }
  // 랜덤 버튼 클릭하면
  // 모두 다 날리고, 타이틀, 서브타이틀 사라지고
  // 뒤에서 랜덤 작업한 다음에
  // 다시 중앙으로 와서 
  // 이전 버튼 비활성화, 현재 숫자 01, 진행바 다시 시작, 타이틀과 서브타이틀 랜덤으로 처음부터, 사진 다 날아오기
  // 근데 랜덤으로 날릴때는 처음에 날아올때와 반대 모양으로 날리기, 
  async shuffle() {
    // 타이머 중지
    clearTimeout(this._clearSlide);
    // 이미지 다 날리고
    let intervalId = setInterval(() => {
      this.$img[this._slide].style.left = '200%';
      this._slide--;
      if(this._slide < 0) {
        clearInterval(intervalId);
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            this.makeShuffle();
          }, 400);
        });       
      }
    }, 40);
    this.$sub.textContent = ``;
    this.$title.textContent = ``;   
    this.$stickFill.classList.remove('progress');
  }
  makeShuffle() {
    this._random = [];
    // 0부터 14의 랜덤 숫자를 가진 length 15개의 배열
    this.random();
    // 실제 DOM 요소 바꾸기
    this.shuffleDOM();
    // 다시 시작
    this._stack = 14;
    this._slide = 14;
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        return this.showCards();    
      }, 2500);
    })
  }
  // 0부터 14의 랜덤 숫자를 가진 length 15개의 배열, 재귀 함수
  random() {
    const number = Math.floor(Math.random() * 15);
    if(!this._random.includes(number)) {
      this._random = this._random.concat(number);
    }
    if(this._random.length === 15) {
      return;
    } else {
      this.random();
    }
  }
  shuffleDOM() {
    const fragment = new DocumentFragment();
    const title = [];
    const sub = [];
    const back = [];
    // 이미지 DOM + 타이틀 재배치
    for(let num of this._random) {
      fragment.append(this.$img[num].cloneNode(true));
      title.push(this._main[num]);
      sub.push(this._sub[num]);
      back.push(this._backColor[num]);
    }
    // 원래 이미지 요소 지우고
    for(let item of this.$img) {
      item.remove();
    }
    this.$imgArea.append(fragment);
    this.$img = Array.from(document.querySelectorAll('.main-img-box'));    
    this._main = title;
    this._sub = sub;
    this._backColor = back;
  }
  dragAndDrop(e) {
    clearTimeout(this._clearSlide);
    this.$stickFill.classList.remove('progress');

    this.mouseTarget = e.currentTarget;
    this.mouseTarget.style.transform = `translate(-50%, -50%) scale(1.1) rotate(0deg)`;
    this.mouseTarget.style.transition = `left 0.1s ease-out, transform 0.3s ease-out`;
    this.mouseTarget.style.cursor = `grabbing`;
    this.mouseTarget.style.zIndex = `1000`;
    this.rectX = this.mouseTarget.getBoundingClientRect().left;
    this.shiftX = e.clientX - this.rectX;

    this.moveAt(e.clientX);
    
    document.addEventListener('pointermove', this.pointerMove);
    this.mouseTarget.addEventListener('pointerup', this.pointerUp);
    this.mouseTarget.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }
  moveAt(clientX) {
    this.mouseTarget.style.left = `calc(50% + ${clientX - this.shiftX - this.rectX}px)`;
  }
  pointerMove(e) {
    this.moveAt(e.clientX);
  }
  pointerUp(e) {
    this.browserWidth = document.documentElement.clientWidth;
    // 오른쪽으로 움직일때와 왼쪽으로 움직일때
    // 오른쪽은 ${clientX - this.shiftX - this.rectX}의 값이 양수일때
    // 왼쪽은 ${clientX - this.shiftX - this.rectX}의 값이 음수일때
    // 오른쪽은 (right - 브라우저 너비) / 브라우저 너비가 0.3이상일때
    // 왼쪽은 (요소 너비 - right) / 브라우저 너비가 0.3이상일때
    if(e.clientX - this.shiftX - this.rectX > 0) {
      // 오른쪽
      this.ratio = (this.mouseTarget.getBoundingClientRect().right - this.browserWidth) / this.browserWidth;
      this.direction = 'right';
    } else if(e.clientX - this.shiftX - this.rectX < 0) {
      // 왼쪽
      this.ratio = (this.mouseTarget.getBoundingClientRect().width - this.mouseTarget.getBoundingClientRect().right) / this.browserWidth;
      this.direction = 'left';
    }

    // 브라우저 너비별로 다르게
    if(this.browserWidth < 600) {
      this.forPointerUp(0.2);
    } else if(this.browserWidth >= 600 && this.browserWidth < 1024) {
      this.forPointerUp(0.05);
    } else if(this.browserWidth >= 1024) {
      switch(this.direction) {
        case 'right':
          this.forPointerUp(0.1);
          break;
        case 'left': 
          this.forPointerUp(-0.35);
          break;
      }
    } 
    this.mouseTarget.style.transform = `translate(-50%, -50%) scale(1) rotate(0deg)`;
    this.mouseTarget.style.transition = `left 0.4s ease-out, transform 0.3s ease-out`;
    this.mouseTarget.style.cursor = ``;
    this.mouseTarget.style.zIndex = ``;  
    this.$stickFill.classList.add('progress');
    document.removeEventListener('pointermove', this.pointerMove);
    this.mouseTarget.removeEventListener('pointerup', this.pointerUp);
  }
  forPointerUp(RATIO) {
    if(this.ratio >= RATIO) {
      // 넘겨
      if(this._slide > 0) {
        this.$img[this._slide].style.left = '200%';
        this._slide--;
        this.$sub.textContent = `${this._sub[this._slide]}`;
        this.$title.textContent = `${this._main[this._slide]}`;   
        this.autoSlide();      
      } else if(this._slide === 0) {
        this._stack = 14;
        this._slide = 14;
        // 배경화면 자연스럽게 변경
        this.$main.style.backgroundColor = `${this._backColor[this._slide]}`;
        this.$header.style.backgroundColor = `${this._backColor[this._slide]}`;
        this.$stickFill.classList.remove('progress');
        this.showCards();
      }
    } else {
      this.mouseTarget.style.left = `50%`;
      this.autoSlide();
    }
  }
}
const main = new Main();
main.showMain();
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Events
// 📍 왜 어떤건 pointerover가 안 되고 어떤 건 pointerover가 되는지?

class Events {
  constructor() {
    this.$menuBackground = document.getElementById('menuBackground');
    this.$menuContents = document.getElementById('menuContents');
    this.$headerMenuLines = document.querySelectorAll('.header__menu__line');
    this.documentClientWidth = document.documentElement.clientWidth;

    this.$headerCateText = null;
    this.$headerCateCircle = null;
    this.$navs = document.querySelectorAll('.header__categories__category');

    this.$mainScrollBackground = document.querySelector('.main__bar__scroll__circle__background');
    this.$mainScrollArrow = document.querySelector('.main__bar__scroll__circle__arrow');
    this.mainScrollStart = null;
    this.mainScrollEnd = null;
    // this.$mainTooltip = null;
    this.$release = document.getElementById('release');

    this.$releaseTitle = null;
    this.$releasePlay = null;

    this.$spotlightInner = document.querySelector('.spotlight__contents__inner');
    this.$spotlightItems = Array.from(document.querySelectorAll('.spotlight__contents__item'));
    this.$spotlightImgBoxImges = Array.from(document.querySelectorAll('.spotlight__contents__item__img-box__img'));
    this.$spotCursor = document.getElementById('spotlightCursor');
    this.$spotCursorLeft = document.querySelector('.spotcursorLeft');
    this.$spotCursorRight = document.querySelector('.spotcursorRight');
    this.spotInnerLeft = null;
    this.firstInnerLeft = document.querySelector('.spotlight__contents__inner').getBoundingClientRect().left;
    this.currentSpotItem = 0;
    this.currentSpotFlower = null;
    this.currentSpotTarget = null;
    this.currentSpotRead = null;
    this.spotRatio = null;
    this.spotZindex = null;

    this.$jobsArrow = document.querySelector('.jobs__arrow');
    this.$jobsEditorial = document.querySelector('.jobs__editorial');

    this.$footerScollBack = document.querySelector('.footer__scroll__contents__arrow__background');
    this.$footerScrollArrow = document.querySelector('.footer__scroll__contents__arrow__img');
    this.footerScrollStart = null;

    this.spotlightPointerMove = this.spotlightPointerMove.bind(this);
    this.spotlightPointerUp = this.spotlightPointerUp.bind(this);  
    this.spotKeydown = this.spotKeydown.bind(this);
    this.spotFlower = this.spotFlower.bind(this);
    this.leaveSpotFlower = this.leaveSpotFlower.bind(this);
    this.spotCursor = this.spotCursor.bind(this);
    this.spotCursorMoveAt = this.spotCursorMoveAt.bind(this);
    this.spotCursorMove = this.spotCursorMove.bind(this);
    this.spotCursorOut = this.spotCursorOut.bind(this);
    this.spotCursorDown = this.spotCursorDown.bind(this);
    this.jobs = this.jobs.bind(this);

    this.$spotlightImgBoxImges.forEach(item => {
      item.addEventListener('pointerover', this.spotFlower);
    });
  }

  animate({timing, draw, duration}) {
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

  handleEvent(event) {
    const EVENT_TYPE = event.type;
    if(EVENT_TYPE === 'resize') {
      this.resize(event);
      return;
    }
    const target = event.target.closest(`[data-${EVENT_TYPE}]`);
    if(!target) return;
    const method = target.dataset[EVENT_TYPE];
    // this[method](event, target);
  }


  resize(e) {
    this.documentClientWidth = document.documentElement.clientWidth;
    if(document.documentElement.clientWidth >= 600) {
      this.$menuBackground.classList.remove('clicked');
      this.$menuContents.classList.remove('clicked');
      document.body.classList.remove('hidden');
      for(let line of this.$headerMenuLines) {
        line.classList.remove('clicked');
      }    
      for(let category of this.$navs) {
        category.classList.add('show');
      }
      document.body.style.paddingRight = '';
      this.$menuContents.style.paddingRight = '';
    }
    // spotlight에서 현재의 요소가 가장 앞에 오게 조정
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
    this.firstInnerLeft = document.querySelector('.spotlight__contents__inner').getBoundingClientRect().left;
  }

  releaseBox(e, target) {
    this.$releaseTitle = target.querySelector('.release__contents__box__title');
    if(target.querySelector('.release__contents__box__play-btn')) {
      this.$releasePlay = target.querySelector('.release__contents__box__play-btn');
    }
    if(e.type === 'pointerover') {
      this.$releaseTitle.classList.add('overed');
      if(this.$releasePlay) {
        this.$releasePlay.classList.add('overed');
      }
    } else if(e.type === 'pointerout') {
      this.$releaseTitle.classList.remove('overed');
      if(this.$releasePlay) {
        this.$releasePlay.classList.remove('overed');
        this.$releasePlay = null;
      }
    }
  }
  // 📍 클릭때마다 원점으로 가는 거 고치고, 키보드와 연계해서 이어질 수 있도록
  /*
  spotShiftX는 마우스 커서와 spotlightInner의 왼쪽 모서리 사이
  spotShiftX가 동일하게 움직여야 한다.
  */
  spotlight(e, target) {
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    this.spotShiftX = e.clientX - this.spotInnerLeft;
    this.$spotlightInner.style.transition = 'none';
    // 방향을 알기 위한 포인트
    this.firstClientX = e.clientX;

    this.spotlightMoveAt(e.clientX);

    this.$spotlightInner.addEventListener('pointermove', this.spotlightPointerMove);
    this.$spotlightInner.addEventListener('pointerup', this.spotlightPointerUp);
    this.$spotlightInner.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  spotlightMoveAt(clientX) {
    this.$spotlightInner.style.marginLeft = -(this.spotShiftX  - clientX + this.firstInnerLeft) + 'px';
  }

  spotlightPointerMove(e) {
    this.spotlightMoveAt(e.clientX);
  }

  // 방향 구분, 양 끝단에서 이벤트 못하게
  spotlightPointerUp(e) {
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    // 양수면 왼쪽으로 드래그, 음수면 오른쪽으로 드래그
    if(this.firstClientX - e.clientX > 0) {
      this.spotRatio = this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().right / this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().width;
      if(this.spotRatio <= 0.5) {
        // 다음 요소로 이동
        this.currentSpotItem++;
        this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
      } else {
        // 원래 위치로
        this.$spotlightInner.style.marginLeft = this.$spotlightInner.getBoundingClientRect().left + -this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + 'px';
      }  
    } else if(this.firstClientX - e.clientX < 0){
      // 방향이 오른쪽으로 드래그이면
      this.spotRatio = this.$spotlightItems[this.currentSpotItem - 1].getBoundingClientRect().right / this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().width;
      if(this.spotRatio >= 0.5) {
        this.currentSpotItem--;
        this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
      } else {
        this.$spotlightInner.style.marginLeft = this.$spotlightInner.getBoundingClientRect().left + -this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + 'px';
      }
    }
    this.$spotlightInner.style.transition = '';
    this.$spotlightInner.removeEventListener('pointermove', this.spotlightPointerMove);
    this.$spotlightInner.removeEventListener('pointerup', this.spotlightPointerUp);

    this.$spotCursor.classList.remove('downed');
    this.$spotCursorLeft.classList.remove('none');
    this.$spotCursorRight.classList.remove('none');

    this.spotCursorMoveAt(e.clientX, e.clientY);
    this.$spotlightInner.removeEventListener('pointerdown', this.spotCursorDown);
  }

  spotKeydown(e) {
    // 17..5 , -286.5, -519.5... 의 변화
    this.spotInnerLeft = this.$spotlightInner.getBoundingClientRect().left;
    if(e.key == 'ArrowRight') {
      if(this.currentSpotItem >= 11) return;
      this.currentSpotItem++;
      this.$spotlightInner.style.marginLeft = `-${this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left - this.spotInnerLeft}px`;
    } else if(e.key == 'ArrowLeft') {
      if(this.currentSpotItem === 0) return;
      this.currentSpotItem--;
      this.$spotlightInner.style.marginLeft = `${-this.$spotlightItems[this.currentSpotItem].getBoundingClientRect().left + this.spotInnerLeft}px`;
    }
  }

  // 📍 꽃 svg가 왼쪽의 이미지를 가리는거 => 타이틀 가리는거
  // 📍 enter과 over의 차이, enter는 잘 안되는 경우
  spotFlower(e) {
    if(e.target.className !== 'spotlight__contents__item__img-box__img') return;
    if(this.currentSpotFlower) return;
    this.currentSpotTarget = e.target;
    this.currentSpotRead = this.currentSpotTarget.nextElementSibling;
    this.spotZindex = this.currentSpotTarget.closest('.spotlight__contents__item');
    this.spotZindex.style.zIndex = '0';
    this.currentSpotFlower = this.currentSpotTarget.parentNode.querySelector('.spotlight__contents__item__img-box__svg');
    this.currentSpotFlower.classList.add('bloom');
    this.currentSpotRead.classList.add('show');
    for(let child of this.currentSpotRead.children) {
      child.classList.add('show');
    }
    // 마우스 커서 모양 변형
    this.$spotCursor.classList.add('overed');
    this.$spotCursor.style.left = e.clientX - (this.$spotCursor.getBoundingClientRect().width / 2) + 'px';
    this.$spotCursor.style.top = e.clientY - (this.$spotCursor.getBoundingClientRect().height / 2) + 'px';
    this.currentSpotTarget.addEventListener('pointerout', this.leaveSpotFlower);
  }

  leaveSpotFlower(e) {
    this.spotZindex.style.zIndex = '';
    this.currentSpotFlower.classList.remove('bloom');
    this.currentSpotRead.classList.remove('show');
    for(let child of this.currentSpotRead.children) {
      child.classList.remove('show');
    }
    this.$spotCursor.classList.remove('overed');
    this.currentSpotTarget.removeEventListener('pointerout', this.leaveSpotFlower);
    this.currentSpotFlower = null;
  }

  spotCursor(e) {
    // 완전체로 등장
    this.$spotCursor.style.display = 'flex';

    this.spotCursorMoveAt(e.clientX, e.clientY);

    this.$spotlightInner.addEventListener('pointerdown', this.spotCursorDown);
    this.$spotlightInner.addEventListener('pointermove', this.spotCursorMove);
    this.$spotlightInner.addEventListener('pointerout', this.spotCursorOut);
  }

  spotCursorMoveAt(clientX, clientY) {
    this.$spotCursor.style.left = clientX - (this.$spotCursor.getBoundingClientRect().width / 2) + 'px';
    this.$spotCursor.style.top = clientY - (this.$spotCursor.getBoundingClientRect().height / 2) + 'px';
  }

  spotCursorMove(e) {
    this.spotCursorMoveAt(e.clientX, e.clientY);
  }

  spotCursorOut() {
    this.$spotCursor.style.display = 'none';
  }

  spotCursorDown(e) {
    this.$spotCursor.classList.add('downed');
    this.$spotCursorLeft.classList.add('none');
    this.$spotCursorRight.classList.add('none');

    this.spotCursorMoveAt(e.clientX, e.clientY);
    this.$spotlightInner.addEventListener('pointerup', this.spotCursorUp);
  }

  jobs(e) {
    if(e.type === 'pointerover') {
      this.$jobsArrow.classList.add('show');
      this.$jobsEditorial.classList.add('show');
    } else if(e.type === 'pointerout') {
      this.$jobsArrow.classList.remove('show');
      this.$jobsEditorial.classList.remove('show');
    }
  }

  backToTop(e, target) {
    if(e.type === 'pointerover') {
      this.$footerScollBack.classList.add('overed');
      this.$footerScrollArrow.classList.add('overed');
    } else if(e.type === 'pointerout') {
      this.$footerScollBack.classList.remove('overed');
      this.$footerScrollArrow.classList.remove('overed');
    } else if(e.type === 'click') {
      this.footerScrollStart = window.pageYOffset;

      this.animate({
        duration: 400,
        timing: function quad(timeFraction) {
          return Math.pow(timeFraction, 2)
        },
        draw: (progress) => {
          if(progress <= 0) return;
          window.scrollTo(0, this.footerScrollStart * (1 - progress));
        }    
      });
    }
  }
}

const events = new Events();

class InboxScroll {
  constructor() {
    this.$inbox = document.getElementById('inbox');
    this.$inboxSvgCircle1 = document.querySelector('.inbox__svg__circle__path1');
    this.$inboxSvgCircle2 = document.querySelector('.inbox__svg__circle__path2');
    this.$inboxSvgArrowHead = document.querySelector('.inbox__svg__arrow__head');
    this.$inboxSvgArrowBody = document.querySelector('.inbox__svg__arrow__body');
    this.circle1Length = this.$inboxSvgCircle1.getTotalLength(); // 245
    this.circle2Length = this.$inboxSvgCircle2.getTotalLength(); // 295
    this.headLength = this.$inboxSvgArrowHead.getTotalLength(); // 49
    this.bodyLength = this.$inboxSvgArrowBody.getTotalLength(); // 196
    this.ratio = null;

    this.inbox = this.inbox.bind(this);
  }

  inbox(e) {
    this.ratio = (window.pageYOffset + document.documentElement.clientHeight - this.$inbox.offsetTop) / this.$inbox.offsetHeight;
    if(this.ratio >= 0.43 && this.ratio < 1.8) {
      this.$inboxSvgCircle1.classList.add('show');
      this.$inboxSvgCircle2.classList.add('show');
      this.$inboxSvgArrowHead.classList.add('show');
      this.$inboxSvgArrowBody.classList.add('show');
    } else if(this.ratio >= 1.8 || this.ratio < 0.43) {
      this.$inboxSvgCircle1.classList.remove('show');
      this.$inboxSvgCircle2.classList.remove('show');
      this.$inboxSvgArrowHead.classList.remove('show');
      this.$inboxSvgArrowBody.classList.remove('show');
    }
  }
}

const inboxScroll = new InboxScroll();
window.addEventListener('scroll', inboxScroll.inbox);

class Time {
  constructor() {
    this.$hours = document.querySelectorAll('.time__clock__hour');
    this.$minutes = document.querySelectorAll('.time__clock__minute');
    this.$seconds = document.querySelectorAll('.time__clock__second');
  }

  init(string, timezone, index) {
    const date = new Date().toLocaleString(string, {
      timeZone: timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    
    const timeComponents = date.split(':');

    let hour = parseInt(timeComponents[0]);
    if(hour < 10) hour = '0' + hour;
    this.$hours[index].innerHTML = hour;

    let minute = parseInt(timeComponents[1]);
    if(minute < 10) minute = '0' + minute;
    this.$minutes[index].innerHTML = minute;

    let second = parseInt(timeComponents[2]);
    if(second < 10) second = '0' + second;
    this.$seconds[index].innerHTML = second;
  }

  time() {
    this.init('en-US', 'Europe/Stockholm', 0);
    this.init('en-GB', 'Europe/London', 1);
    this.init('en-US', 'America/New_York', 2);
  }
}

const time = new Time();
time.time();
setInterval(() => {
  time.time();
}, 1000)

// git push -u origin main

