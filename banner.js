(function(){
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbw8p5D5_CDt-r-yYk15Fz7dC2qr_pvz9AGFlL0NiTzMov_29S_Kk0hi5ZuELtzZxL-agA/exec';
  const banner = document.getElementById('multiPromoBanner');
  const closeBtn = document.getElementById('closeBanner');
  const showBtn = document.getElementById('showBannerBtn');
  const promos = document.querySelectorAll('.promo-box');
  let index = 0;

  window.addEventListener('load', () => setTimeout(() => banner.classList.add('show'), 600));

  setInterval(() => {
    promos[index].classList.remove('active');
    index = (index + 1) % promos.length;
    promos[index].classList.add('active');
  }, 7000);

  closeBtn.addEventListener('click', () => {
    banner.classList.remove('show');
    showBtn.style.display = 'block';
  });

  showBtn.addEventListener('click', () => {
    banner.classList.add('show');
    showBtn.style.display = 'none';
  });

  document.querySelectorAll('.offer-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const annonce = link.getAttribute('data-annonce');
      const href = link.getAttribute('href');

      fetch('https://ipapi.co/json/')
      .then(r => r.json()).then(d => {
        const pays = d && d.country_name ? d.country_name : 'Inconnu';
        const img = new Image();
        img.src = scriptUrl + '?annonce=' + encodeURIComponent(annonce)
                    + '&url=' + encodeURIComponent(href)
                    + '&pays=' + encodeURIComponent(pays);
        setTimeout(() => window.open(href, '_blank'), 300);
      }).catch(() => {
        const img = new Image();
        img.src = scriptUrl + '?annonce=' + encodeURIComponent(annonce)
                    + '&url=' + encodeURIComponent(href)
                    + '&pays=Inconnu';
        setTimeout(() => window.open(href, '_blank'), 300);
      });
    });
  });
})();
