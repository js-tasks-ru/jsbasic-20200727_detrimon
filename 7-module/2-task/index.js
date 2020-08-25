import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this._makeModal();
    this._doCloseModalEvent();
  }

  _makeModal() {
    let oModal = document.createElement('div');
    oModal.classList.add('modal');

    let sInnerElement = `<div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
        </div>

        <div class="modal__body">
        </div>
      </div>`;

    oModal.insertAdjacentHTML('afterbegin', sInnerElement);

    return oModal;
  }

  open() {
    let oBody = document.body;
    oBody.classList.add('is-modal-open');
    oBody.append(this.modal);
    this._makeKeyListener();
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    this.modal.querySelector('.modal__body').innerHTML = node.outerHTML;
  }

  close() {
    let oBody = document.body;
    this.modal.remove();
    oBody.classList.remove('is-modal-open');
  }

  _doCloseModalEvent() {
    this.modal.querySelector('.modal__close')
              .addEventListener("click", () => this.close());
  }

  _makeKeyListener() {
    /* Домучал это место :) В общем мне не нравилось, что при нажатии Esc, событие срабатывает много раз и
    выполняется много лишних и бесполезных удалений. Поэтому при открытии модального окна я навешиваю листенер,
    а при закрытии удаляю его */
    let that = this;
    document.body.addEventListener('keydown', createListener);
    function createListener(event) {
      document.body.removeEventListener('keydown', createListener);
      if (event.code === 'Escape') {      
        that.close();
      }
    }
  }
}
