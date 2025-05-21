function openPack() {
  const animation = document.getElementById('pack-animation');
  const rewardCard = document.getElementById('rewardCard');
  const particlesContainer = document.getElementById('particles-container');

  // Reset
  animation.classList.remove('torn');
  rewardCard.classList.remove('show');
  particlesContainer.innerHTML = '';

  setTimeout(() => {
    animation.classList.add('torn');

    // Generate particles
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = Math.random() * 2 * Math.PI;
      const radius = 80 + Math.random() * 40;
      p.style.setProperty('--x', `${Math.cos(angle) * radius}px`);
      p.style.setProperty('--y', `${Math.sin(angle) * radius}px`);
      particlesContainer.appendChild(p);
    }

    // Show reward
    setTimeout(() => {
      rewardCard.classList.add('show');
    }, 600);

  }, 100);
}
