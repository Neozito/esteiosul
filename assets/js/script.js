
const slides = document.querySelectorAll('.slide');
const tabs = document.querySelectorAll('.hero-tab');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');
let current = 0;
let autoSlider;

function showSlide(index) {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === current));
}
function startAutoSlider() {
  if (!slides.length) return;
  clearInterval(autoSlider);
  autoSlider = setInterval(() => showSlide(current + 1), 5500);
}
tabs.forEach(tab => tab.addEventListener('click', () => { showSlide(Number(tab.dataset.slide)); startAutoSlider(); }));
prevBtn?.addEventListener('click', () => { showSlide(current - 1); startAutoSlider(); });
nextBtn?.addEventListener('click', () => { showSlide(current + 1); startAutoSlider(); });
showSlide(0);
startAutoSlider();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle?.addEventListener('click', () => nav?.classList.toggle('open'));

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

const WHATSAPP_NUMBER = '5545999370987';
document.querySelectorAll('.whatsapp-form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const title = form.dataset.formTitle || 'Contato pelo site';
    let message = `Olá Esteio Sul!\n\n${title}\n`;
    for (const [key, value] of data.entries()) {
      if (String(value).trim()) message += `\n${key}: ${value}`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  });
});
