export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._aStepsX = [];
    this.elem = this._drawStepSlider();

    this._setEventHandlers();
  }

  _drawStepSlider() {
    let oSlider = document.createElement('div');
    oSlider.className = 'slider';

    let sInnerPart = `<div class="slider__thumb"><span class="slider__value"></span></div><div class="slider__progress"></div><div class="slider__steps"></div>`;
    oSlider.insertAdjacentHTML('afterbegin', sInnerPart);

    let sSliderSteps = '';
    for (let i = 0; i < this.steps; i++) {
      sSliderSteps += '<span></span>';
    }
    let oSliderStepsDiv = oSlider.querySelector('.slider__steps');

    oSliderStepsDiv.insertAdjacentHTML('afterbegin', sSliderSteps);
    oSliderStepsDiv.children[this.value].className = 'slider__step-active';

    return oSlider;
  }

  // Делаем массив, в котором каждое значение равно отступу метки слева, например: [0, 100, 200, 300, 400]
  _countSteps() {
    if (this._aStepsX.length !== 0) {
      return;
    }
    let cSteps = this.elem.querySelector('.slider__steps').children;
    for (let step of cSteps) {
      this._aStepsX.push(step.offsetLeft);
    }
  }

  // Поиск ближайшей отметки относительно текущего положения бегунка (thumb). Результат помещаем в this.value
  _findClosestMark(nOffsetX) {
    if (nOffsetX > this._aStepsX[this._aStepsX.length - 1]) {
      nOffsetX = this._aStepsX[this._aStepsX.length - 1];
    } else if (nOffsetX < 0) {
      nOffsetX = 0;
    }
    
    let index = this._aStepsX.findIndex(elem => elem > nOffsetX);

    if (this._aStepsX[index] - nOffsetX > nOffsetX - this._aStepsX[index - 1]) {
      return this.value = index - 1;
    }
    return this.value = index;
  }

  // Смещение слайдера к ближайшей отметке относительно this.value
  _offsetSlider() {
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__step-active').className = '';
    this.elem.querySelector('.slider__steps').children[this.value].className = 'slider__step-active';

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = Math.round(this._aStepsX[this.value] * 100 / (this._aStepsX[this._aStepsX.length - 1] - this._aStepsX[0]));

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  // Установка всех Обработчиков событий
  _setEventHandlers() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    thumb.ondragstart = () => false;

    this.elem.addEventListener('click', (event) => {
      let nOffsetX = event.pageX - Math.round(this.elem.getBoundingClientRect().left);

      this._countSteps();
      this._findClosestMark(nOffsetX);
      this._offsetSlider();
      this._generateEvent();
    });

    let delta;
    let oSlider = this.elem;
    let that = this;

    thumb.addEventListener('pointerdown', (event) => {
      this._countSteps(); 
      let currentMouseXoffset = event.pageX - Math.round(this.elem.getBoundingClientRect().left);
      let currentThumbXoffset = Math.round(thumb.getBoundingClientRect().left);
      delta = currentMouseXoffset - currentThumbXoffset;

      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', doMove);
      function doMove(event) {
        currentMouseXoffset = event.pageX - Math.round(oSlider.getBoundingClientRect().left);

        let leftPercents = Math.round((currentMouseXoffset) * 100 / (that._aStepsX[that._aStepsX.length - 1]));

        let persentValue = (leftPercents >= 100 && '100%') || (leftPercents <= 0 && '0%') || `${leftPercents}%`;
        thumb.style.left = persentValue;
        progress.style.width = persentValue;
      }

      document.addEventListener('pointerup', pointerUp);
      function pointerUp() {
        that.elem.classList.remove('slider_dragging');
        that._findClosestMark(currentMouseXoffset);
        that._offsetSlider();
        that._generateEvent();
        document.removeEventListener('pointermove', doMove);
        document.removeEventListener('pointerup', pointerUp);
      }
    });
  }

  // Генерация события
  _generateEvent() {
    let sliderEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    });
    this.elem.dispatchEvent(sliderEvent);
  }

}