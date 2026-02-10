// Live clock
(function(){
  const clockEl = document.getElementById('clock');
  function updateClock(){
    const now = new Date();
   
    const opts = { hour: 'numeric', minute: '2-digit', hour12: true };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', opts).format(now);
  }
  updateClock();
  // minute heure
  const msToNextMinute = (60 - new Date().getSeconds()) * 1000;
  setTimeout(function(){
    updateClock();
    setInterval(updateClock, 60 * 1000);
  }, msToNextMinute);
})();

// le drag up
(function(){
  const indicator = document.querySelector('.home-indicator');
  if(!indicator) return;

  let dragging = false;
  let startY = 0;
  let deltaY = 0;

  const screen = document.querySelector('.screen');
  const thresholdRatio = 0.08; 

  function onPointerDown(e){
    dragging = true;
    indicator.classList.add('dragging');
    startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    indicator.setPointerCapture && indicator.setPointerCapture(e.pointerId);
    indicator.style.transition = 'none';
  }
  function onPointerMove(e){
    if(!dragging) return;
    const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    deltaY = y - startY; 
    const translate = Math.max(-100, Math.min(0, deltaY)); 
    indicator.style.transform = `translateX(-50%) translateY(${translate}px)`;
  }
  function onPointerUp(){
    if(!dragging) return;
    dragging = false;
    indicator.classList.remove('dragging');

    const screenHeight = screen ? screen.getBoundingClientRect().height : 0;
    const threshold = -Math.max(40, screenHeight * thresholdRatio); // require sufficient upward drag
    if(deltaY <= threshold){
      // nav index //
      window.location.href = 'index.html';
    } else {
      indicator.style.transition = 'transform 200ms ease';
      indicator.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(()=>{ indicator.style.transition = 'none'; }, 200);
    }
    deltaY = 0;
  }

  // Pointer events //
  indicator.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
})();
