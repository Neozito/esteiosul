(() => {
  'use strict';
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const feedback = document.querySelector('#contact-feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const get = name => String(form.elements.namedItem(name).value).trim();
    const name = get('nome');
    const phone = get('telefone');
    const message = get('mensagem');
    if (!name || !message || phone.replace(/\D/g, '').length < 8) {
      feedback.textContent = 'Preencha seu nome, um telefone válido e sua mensagem.';
      return;
    }
    const number = String((window.ESTEIO_CONFIG || {}).whatsapp || '5545999370987').replace(/\D/g, '');
    const lines = ['Olá! Vim pelo site da Esteio.', '', 'Nome: ' + name, 'Telefone: ' + phone];
    const email = get('email');
    if (email) lines.push('E-mail: ' + email);
    lines.push('Assunto: ' + get('assunto'), '', 'Mensagem:', message);
    feedback.textContent = 'Abrindo o WhatsApp com sua mensagem…';
    window.location.assign('https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n')));
  });
})();
