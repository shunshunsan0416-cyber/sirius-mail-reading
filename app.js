const miniForm = document.querySelector('#mini-application-form');
const miniError = document.querySelector('#mini-form-error');
const miniSubmitButton = document.querySelector('#mini-submit-button');
const miniSuccess = document.querySelector('#mini-success-message');
const openChatLink = document.querySelector('#openchat-link');
const openChatHelp = document.querySelector('#openchat-help');
const footerOpenChatLink = document.querySelector('#footer-openchat-link');
const personalExpressLink = document.querySelector('#personal-express-link');
const pairExpressLink = document.querySelector('#pair-express-link');

if (window.SIRIUS_PERSONAL_EXPRESS_URL) {
  personalExpressLink.href = window.SIRIUS_PERSONAL_EXPRESS_URL;
}
if (window.SIRIUS_PAIR_EXPRESS_URL) {
  pairExpressLink.href = window.SIRIUS_PAIR_EXPRESS_URL;
}

if (window.SIRIUS_OPENCHAT_URL) {
  openChatLink.href = window.SIRIUS_OPENCHAT_URL;
  openChatLink.target = '_blank';
  openChatLink.rel = 'noopener';
  footerOpenChatLink.href = window.SIRIUS_OPENCHAT_URL;
  footerOpenChatLink.target = '_blank';
  footerOpenChatLink.rel = 'noopener';
} else {
  openChatLink.addEventListener('click', (event) => {
    event.preventDefault();
    openChatHelp.hidden = false;
    openChatHelp.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

miniForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  miniError.hidden = true;
  if (!miniForm.checkValidity()) {
    miniError.textContent = '必須項目を確認してください。';
    miniError.hidden = false;
    miniForm.reportValidity();
    return;
  }
  if (!window.SIRIUS_FORM_ENDPOINT) {
    miniError.textContent = 'フォームの送信先がまだ設定されていません。しばらくしてからもう一度お試しください。';
    miniError.hidden = false;
    return;
  }

  const fields = new FormData(miniForm);
  fields.set('agreed', fields.get('agreed') ? 'yes' : '');
  miniSubmitButton.disabled = true;
  miniSubmitButton.querySelector('span').textContent = '送信しています…';
  try {
    await fetch(window.SIRIUS_FORM_ENDPOINT, {
      method: 'POST', mode: 'no-cors', body: new URLSearchParams(fields),
    });
    miniForm.hidden = true;
    miniSuccess.hidden = false;
    miniSuccess.focus();
  } catch (_) {
    miniError.textContent = '送信できませんでした。通信状況をご確認のうえ、もう一度お試しください。';
    miniError.hidden = false;
    miniSubmitButton.disabled = false;
    miniSubmitButton.querySelector('span').textContent = 'メールでミニ鑑定を申し込む';
  }
});
const pairExpressImage = document.querySelector('img[alt="ペア鑑定 特急便"]');

if (pairExpressImage) {
  pairExpressImage.src = '%E3%83%98%E3%82%9A%E3%82%A2%E9%91%91%E5%AE%9A_%E7%89%B9%E6%80%A5%E4%BE%BF.png';
}
