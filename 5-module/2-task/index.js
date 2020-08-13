function toggleText() {
  let oButton = document.querySelector('.toggle-text-button');
  let oText = document.querySelector('#text');

  oButton.addEventListener('click', () => {
    if (oText.hidden) {
      oText.hidden = false;
    } else {
      oText.hidden = true;
    }
  });
}
