const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
