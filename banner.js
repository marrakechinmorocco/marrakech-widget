
(function(){
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbw8p5D5_CDt-r-yYk15Fz7dC2qr_pvz9AGFlL0NiTzMov_29S_Kk0hi5ZuELtzZxL-agA/exec';
  const banner = document.getElementById('multiPromoBanner');
  const closeBtn = document.getElementById('closeBanner');
  const showBtn = document.getElementById('showBannerBtn');
  const promos = document.querySelectorAll('.promo-box');
  let index = 0;

  // Affiche le banner après chargement
  window.addEventListener('load', () => setTimeout(() => banner.classList.add('show'), 600));

  // Rotation des promos
  setInterval(() => {
    promos[index].classList.remove('active');
    index = (index + 1) % promos.length;
    promos[index].classList.add('active');
  }, 7000);

  // Gestion bouton fermer / afficher
  closeBtn.addEventListener('click', () => {
    banner.classList.remove('show');
    showBtn.style.display = 'block';
  });

  showBtn.addEventListener('click', () => {
    banner.classList.add('show');
    showBtn.style.display = 'none';
  });

  // Fonction pour obtenir le pays
  function getCountry(callback) {
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        if(data && data.country) callback(data.country);
        else fallbackGeolocation(callback);
      })
      .catch(() => fallbackGeolocation(callback));
  }

  // Fallback: géolocalisation navigateur
  function fallbackGeolocation(callback) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          // On pourrait convertir coords en pays via API externe si besoin
          callback('Inconnu'); 
        },
        err => callback('Inconnu')
      );
    } else {
      callback('Inconnu');
    }
  }

  // Gestion click sur les offres
  document.querySelectorAll('.offer-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const annonce = link.getAttribute('data-annonce');
      const href = link.getAttribute('href');

      getCountry(pays => {
        const img = new Image();
        img.src = scriptUrl 
                    + '?annonce=' + encodeURIComponent(annonce)
                    + '&url=' + encodeURIComponent(href)
                    + '&pays=' + encodeURIComponent(pays);
        setTimeout(() => window.open(href, '_blank'), 300);
      });
    });
  });
})();

