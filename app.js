const miniForm = document.querySelector('#mini-application-form');
const miniError = document.querySelector('#mini-form-error');
const miniSubmitButton = document.querySelector('#mini-submit-button');
const miniSuccess = document.querySelector('#mini-success-message');
const openChatLink = document.querySelector('#openchat-link');
const openChatHelp = document.querySelector('#openchat-help');

if (window.SIRIUS_OPENCHAT_URL) {
  openChatLink.href = window.SIRIUS_OPENCHAT_URL;
  openChatLink.target = '_blank';
  openChatLink.rel = 'noopener';
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
