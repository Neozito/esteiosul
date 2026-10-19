(() => {
  'use strict';
  const config = window.ESTEIO_CONFIG || {};
  const number = String(config.whatsapp || '5545999370987').replace(/\D/g, '');
  const link = 'https://wa.me/' + number + '?text=' + encodeURIComponent(config.mensagem || 'Olá! Gostaria de conhecer a proteção veicular Esteio.');
  document.querySelectorAll('[data-whatsapp]').forEach(a => a.href = link);
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu');
  const closeMenu = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); };
  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if(!e.target.closest('.header')) closeMenu(); });
  window.matchMedia('(min-width:901px)').addEventListener('change', e => { if(e.matches) closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const anchors = [...menu.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, {rootMargin:'-15% 0px -55% 0px', threshold:0});
    anchors.forEach(a => { const section = document.querySelector(a.getAttribute('href')); if(section) observer.observe(section); });
  }
})();
