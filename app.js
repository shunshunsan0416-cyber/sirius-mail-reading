const form = document.querySelector('#application-form');
const errorBox = document.querySelector('#form-error');
const submitButton = document.querySelector('#submit-button');
const successMessage = document.querySelector('#success-message');
const paymentLink = document.querySelector('#payment-link');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorBox.hidden = true;
  if (!form.checkValidity()) {
    errorBox.textContent = '必須項目を確認してください。';
    errorBox.hidden = false;
    form.reportValidity();
    return;
  }
  if (!window.SIRIUS_FORM_ENDPOINT || !window.SIRIUS_STORES_URL) {
    errorBox.textContent = 'フォームの送信先または決済先がまだ設定されていません。しばらくしてからもう一度お試しください。';
    errorBox.hidden = false;
    return;
  }
  const fields = new FormData(form);
  fields.set('agreed', fields.get('agreed') ? 'yes' : '');
  submitButton.disabled = true;
  submitButton.querySelector('span').textContent = '送信しています…';
  try {
    await fetch(window.SIRIUS_FORM_ENDPOINT, {
      method: 'POST', mode: 'no-cors', body: new URLSearchParams(fields),
    });
    form.hidden = true;
    paymentLink.href = window.SIRIUS_STORES_URL;
    successMessage.hidden = false;
    successMessage.focus();
  } catch (_) {
    errorBox.textContent = '送信できませんでした。通信状況をご確認のうえ、もう一度お試しください。';
    errorBox.hidden = false;
    submitButton.disabled = false;
    submitButton.querySelector('span').textContent = 'この内容で申し込む';
  }
});
