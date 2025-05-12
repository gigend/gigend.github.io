// Gacha - Feeling Lucky
function feelingLucky() {
  alert('Gacha konten sedang diproses...');
}

function showLucky(root) {
  var feed = root.feed;
  var entries = feed.entry || [];
  var entry = feed.entry[0];
  for (var j = 0; j < entry.link.length; ++j) {
    if (entry.link[j].rel == 'alternate') {
      window.location = entry.link[j].href;
    }
  }
}

function fetchLuck(luck) {
  script = document.createElement('script');
  script.src = 'https://gigend.blogspot.com/feeds/posts/summary?start-index=' + luck + '&max-results=1&alt=json-in-script&callback=showLucky';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function readLucky(root) {
  var feed = root.feed;
  var total = parseInt(feed.openSearch$totalResults.$t, 10);
  var luckyNumber = Math.floor(Math.random() * total);
  luckyNumber++;
  fetchLuck(luckyNumber);
}

function feelingLucky() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://gigend.blogspot.com/feeds/posts/summary?max-results=0&alt=json-in-script&callback=readLucky';
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Script untuk Navbar
document.addEventListener('DOMContentLoaded', function () {
  // Tutup dropdown saat klik di luar
  document.addEventListener('click', function (event) {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.parentElement.contains(event.target)) {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => (dropdown.style.display = 'none'), 300);

        const icon = dropdown.previousElementSibling.querySelector('.caret-icon');
        if (icon) icon.classList.remove('rotate');
      }
    });
  });

  let dropButtons = document.querySelectorAll('.dropbtn');
  dropButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      let dropdown = this.nextElementSibling;
      let icon = this.querySelector('.caret-icon');

      if (dropdown.style.display === 'block') {
        // Tutup dropdown
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => (dropdown.style.display = 'none'), 300);

        if (icon) icon.classList.remove('rotate');
      } else {
        // Tutup semua dropdown lain
        document.querySelectorAll('.dropdown-content').forEach((d) => {
          if (d !== dropdown) {
            d.style.opacity = '0';
            d.style.transform = 'translateY(-10px)';
            setTimeout(() => (d.style.display = 'none'), 300);

            const otherIcon = d.previousElementSibling.querySelector('.caret-icon');
            if (otherIcon) otherIcon.classList.remove('rotate');
          }
        });

        // Buka dropdown sekarang
        dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0)';
        }, 10);

        if (icon) icon.classList.add('rotate');
      }
    });
  });
});

// Dark Mode Script
(function () {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
  }

  document.getElementById('darkModeToggleNav').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
})();

// Reveal CSS animation as you scroll down a page
new WOW().init();

