// script.js - RE2R cinematic interactions
document.addEventListener('DOMContentLoaded', () => {

  /* ----- LOADER ----- */
  const loader = document.getElementById('site-loader');
  if(loader){
    // ensure loader visible a bit for cinematic feel, but not too long
    setTimeout(()=> {
      loader.classList.add('loaded');
      loader.style.opacity = 0;
      setTimeout(()=> loader.remove(), 400);
    }, 900); // 900ms minimal show
  }

  /* ----- HAMBURGER ----- */
  const toggleEls = document.querySelectorAll('.hamburger, .menu-toggle');
  const mobileNav = document.querySelector('nav.mobile');
  toggleEls.forEach(t=>{
    if(!t) return;
    t.addEventListener('click', ()=>{
      if(!mobileNav) return;
      mobileNav.classList.toggle('open');
      mobileNav.style.display = mobileNav.classList.contains('open') ? 'block' : 'none';
    });
  });

  /* ----- PARALLAX ----- */
  const body = document.body;
  window.addEventListener('scroll', () => {
    const offset = Math.round(window.scrollY * 0.45);
    body.style.setProperty('--parallax-offset', `${offset}px`);
    // update progress bar
    updateProgress();
    // back to top
    toggleToTop();
  }, { passive:true });

  /* ----- SEARCH SIMPLE (client-side) ----- */
  const searchInput = document.querySelector('input[type="search"]');
  if(searchInput){
    searchInput.addEventListener('input', (e)=>{
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.container h2, .container p, .container li').forEach(el=>{
        const txt = el.textContent.toLowerCase();
        if(q && txt.includes(q)) el.style.background = 'linear-gradient(90deg, rgba(255,51,51,0.06), transparent)';
        else el.style.background = 'transparent';
      });
    });
  }

  /* ----- LIGHTBOX for images ----- */
  const lb = document.createElement('div'); lb.className='lightbox'; lb.innerHTML = '<img src=\"\" alt=\"zoom\"><button aria-hidden=\"true\" style=\"position:absolute;top:18px;right:20px;background:transparent;border:none;color:#fff;font-size:28px;cursor:pointer;\">✕</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  lb.addEventListener('click', (e)=>{
    if(e.target === lb || e.target.tagName==='BUTTON') lb.classList.remove('active');
  });
  document.querySelectorAll('.scheda img, main img').forEach(img=>{
    img.style.cursor='zoom-in';
    img.addEventListener('click', ()=> {
      lbImg.src = img.src;
      lb.classList.add('active');
    });
  });

  /* ----- BACK TO TOP ----- */
  const toTop = document.getElementById('toTop');
  function toggleToTop(){ if(window.scrollY > 300) toTop.style.display = 'flex'; else toTop.style.display = 'none'; }
  if(toTop) toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  /* ----- READING PROGRESS ----- */
  const prog = document.getElementById('read-progress');
  function updateProgress(){
    if(!prog) return;
    const h = document.documentElement;
    const docHeight = h.scrollHeight - h.clientHeight;
    const pct = docHeight ? (window.scrollY / docHeight) * 100 : 0;
    prog.style.width = pct + '%';
  }

  /* ----- AUDIO CONTROL (ambient) ----- */
  const audioBtn = document.getElementById('audioToggle');
  if(audioBtn){
    let audio = document.getElementById('ambient-audio');
    if(!audio){
      audio = document.createElement('audio');
      audio.id = 'ambient-audio';
      audio.src = 'audio/ambient.mp3'; // optional, if exists
      audio.loop = true; audio.volume = 0.14;
      document.body.appendChild(audio);
    }
    audioBtn.addEventListener('click', () => {
      if(audio.paused){ audio.play(); audioBtn.textContent = '🔊'; audioBtn.classList.add('on'); }
      else { audio.pause(); audioBtn.textContent = '🔈'; audioBtn.classList.remove('on'); }
    });
  }

  /* INITIAL RUN */
  updateProgress();
  toggleToTop();

});
