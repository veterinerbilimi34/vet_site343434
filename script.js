function setLang(lang){
  document.querySelectorAll('.lang').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.lang-'+lang).forEach(el=>el.classList.add('active'));
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('lang', lang==='tr'?'tr':'en');
}
function initLang(){
  const saved = localStorage.getItem('lang');
  if(saved){ setLang(saved); } else { setLang('tr'); }
}
window.addEventListener('DOMContentLoaded', initLang);

// PWA install prompt (ileride manifest+service worker ekleyince çalışır)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('installBtn');
  if(btn){ btn.style.display = 'inline-block'; }
});
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
function installPWA(){
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(()=>{ deferredPrompt=null; });
  }
}
