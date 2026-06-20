(function(){
  const root=document.documentElement;
  const toggle=document.getElementById('themeToggle');
  const prefersDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(prefersDark)root.classList.add('dark');
  toggle.addEventListener('click',()=>root.classList.toggle('dark'));

  const nav=document.getElementById('navbar');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>10),{passive:true});
  const burger=document.getElementById('burger'), mobileMenu=document.getElementById('mobileMenu');
  burger.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const canvas=document.getElementById('heroCanvas'), ctx=canvas.getContext('2d');
  let w,h,dots=[]; const N=70;
  function isDark(){return root.classList.contains('dark')}
  function resize(){w=canvas.width=canvas.offsetWidth*devicePixelRatio;h=canvas.height=canvas.offsetHeight*devicePixelRatio}
  function initDots(){dots=[];for(let i=0;i<N;i++)dots.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.8+1})}
  function draw(){
    ctx.clearRect(0,0,w,h);
    const dotColor=isDark()?'rgba(95,168,255,0.55)':'rgba(37,99,235,0.45)';
    const lineColor=isDark()?'rgba(47,123,255,0.14)':'rgba(37,99,235,0.10)';
    const maxDist=Math.min(w,h)*.18;
    for(const d of dots){d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>w)d.vx*=-1;if(d.y<0||d.y>h)d.vy*=-1}
    for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){
      const dd=Math.hypot(dots[i].x-dots[j].x,dots[i].y-dots[j].y);
      if(dd<maxDist){ctx.strokeStyle=lineColor;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(dots[i].x,dots[i].y);ctx.lineTo(dots[j].x,dots[j].y);ctx.stroke()}
    }
    for(const d of dots){ctx.beginPath();ctx.arc(d.x,d.y,d.r*devicePixelRatio,0,Math.PI*2);ctx.fillStyle=dotColor;ctx.fill()}
    requestAnimationFrame(draw);
  }
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  resize();initDots();
  if(!reduce)requestAnimationFrame(draw); else draw();
  window.addEventListener('resize',()=>{resize();initDots()},{passive:true});
})();