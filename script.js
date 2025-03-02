const card = document.getElementById('card');
const container = document.querySelector('.container');

card.addEventListener('mouseenter', () => {
  card.classList.remove('flip-back');
  card.classList.add('flip');
});

card.addEventListener('mouseleave', () => {
  card.classList.remove('flip');
  card.classList.add('flip-back');
});

let isFlipping = false;

// track when animations start/end
card.addEventListener('animationstart', () => {
  isFlipping = true;
});

card.addEventListener('animationend', (e) => {
  if (e.animationName === 'flipBackAnimation') {
    // hold the final position briefly
    setTimeout(() => {
      // remove class but maintain position with inline style
      card.style.transform = 'rotateY(-25deg) rotateX(10deg) translateZ(50px)';
      card.classList.remove('flip-back');
      
      // force a clean animation restart
      void card.offsetWidth;
    }, 100);
  }
  
  isFlipping = false;
});

// mouse tracking tilt effect
container.addEventListener('mousemove', (e) => {
  if (isFlipping || card.classList.contains('flip') || card.classList.contains('flip-back')) return;
  
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // calculate rotation based on mouse position
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateY = ((x - centerX) / centerX) * 15; // max 15 degrees
  const rotateX = -((y - centerY) / centerY) * 10; // max 10 degrees
  
  card.style.transform = `rotateY(${-25 + rotateY}deg) rotateX(${10 + rotateX}deg) translateZ(50px)`;
});

container.addEventListener('mouseleave', () => {
  // only reset if not flipping
  if (!isFlipping && !card.classList.contains('flip') && !card.classList.contains('flip-back')) {
    card.style.transform = 'rotateY(-25deg) rotateX(10deg) translateZ(50px)';
  }
});