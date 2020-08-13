function initCarousel() {
  // Общие переменные и первичная инициализация
  let oLeftArrow = document.querySelector('.carousel__arrow_left');
  let oRightArrow = document.querySelector('.carousel__arrow_right');
  let oCarousel = document.querySelector('.carousel__inner');
  let slideWidth = oCarousel.offsetWidth;
  let currentSlide = 1;

  hideArrow(currentSlide, oLeftArrow, oRightArrow);

  // Вешаем обработчики событий
  oRightArrow.addEventListener('click', doMove);
  oLeftArrow.addEventListener('click', doMove);
 
  // Описание обработчика событий doMove
  function doMove(event) {
    let isLeft = false;

    if (event.currentTarget === oLeftArrow) {
      isLeft = true;
    }
    oCarousel.style.transform = `translateX(-${(isLeft ? (currentSlide - 2) : currentSlide) * slideWidth}px)`;

    if (isLeft) {
      currentSlide--;
    } else {
      currentSlide++;
    }

    hideArrow(currentSlide, oLeftArrow, oRightArrow);
  }

  // Вспомогательная фунция по определению того, какую стрелку и в какой ситуации нужно скрывать
  function hideArrow(slideNumber, leftArrow, rightArrow) {
    if (slideNumber === 1) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }

    if (slideNumber === 4) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  }
}
