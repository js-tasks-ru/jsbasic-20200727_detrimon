import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this._makeProductCardDOM(slides);

    this._makePlusEvent();

    this._initCarousel(slides.length);
  }

  // Функция формирования DOM компонента Карусель
  _makeProductCardDOM(slides) {
    let oComponent = document.createElement('div');
    oComponent.classList.add('carousel');

    let sCarouselArrows = '<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div><div class="carousel__arrow carousel__arrow_left"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>';
    oComponent.insertAdjacentHTML('afterbegin', sCarouselArrows);

    let oCarouselInner = document.createElement('div');
    oCarouselInner.classList.add('carousel__inner');

    slides.forEach(slide => {
      let sInnerPart = `
        <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
      oCarouselInner.insertAdjacentHTML('beforeend', sInnerPart);
    });

    oComponent.append(oCarouselInner);   

    return oComponent;
  }

  _initCarousel(nSlidesLength) {
    // Общие переменные и первичная инициализация
    let oLeftArrow = this.elem.querySelector('.carousel__arrow_left');
    let oRightArrow = this.elem.querySelector('.carousel__arrow_right');
    let oCarousel = this.elem.querySelector('.carousel__inner');
    let currentSlide = 1;
  
    hideArrow(currentSlide, oLeftArrow, oRightArrow);
  
    // Вешаем обработчики событий
    oRightArrow.addEventListener('click', doMove);
    oLeftArrow.addEventListener('click', doMove);
   
    // Описание обработчика событий doMove
    function doMove(event) {
      let slideWidth = oCarousel.offsetWidth;
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
  
      if (slideNumber === nSlidesLength) {
        rightArrow.style.display = 'none';
      } else {
        rightArrow.style.display = '';
      }
    }
  }

  _makePlusEvent() {
    let oElement = this.elem;

    oElement.addEventListener('click', (event) => {
      if (event.target.closest('button')) {
        event.stopPropagation();
        let sId = event.target.closest('.carousel__slide').dataset.id;
        let eProductAdd = new CustomEvent('product-add', {
          detail: sId,
          bubbles: true
        });
        oElement.dispatchEvent(eProductAdd);
      }    
    });
  }


}
