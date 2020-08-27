export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._aStepsX = [];
    this.elem = this._makeStepSlider();

    this._setEventHandlers();
  }

  _makeStepSlider() {
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

  _offsetSlider() {
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.querySelector('.slider__step-active').className = '';
    this.elem.querySelector('.slider__steps').children[this.value].className = 'slider__step-active';

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = this._aStepsX[this.value] * 100 / (this._aStepsX[this._aStepsX.length - 1] - this._aStepsX[0]);

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  _countSteps() {
    let cSteps = this.elem.querySelector('.slider__steps').children;
    for (let step of cSteps) {
      this._aStepsX.push(step.offsetLeft);
    }
  }

  _setEventHandlers() {
    this.elem.addEventListener('click', (event) => {
      let nOffsetX = event.pageX - this.elem.offsetLeft;

      this._countSteps();      

      for (let i = 0, ln = this._aStepsX.length; i < ln; i++) {
        if (this._aStepsX[i] > nOffsetX) {
          ( this._aStepsX[i] - nOffsetX > nOffsetX - this._aStepsX[i - 1] ) ? (this.value = i - 1) : (this.value = i);
          break;
        }
      }

      this._offsetSlider();

      let sliderEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      this.elem.dispatchEvent(sliderEvent);
    });
  }

}