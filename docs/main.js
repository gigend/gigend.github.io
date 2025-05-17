function loadElement(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal load ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === 'function') callback();
    })
    .catch(error => console.error(error));
}

// Navbar Dropdown
function initDropdownNavbar() {
  let dropButtons = document.querySelectorAll('.dropbtn');
  dropButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      let dropdown = this.nextElementSibling;
      let icon = this.querySelector('.caret-icon');

      document.querySelectorAll('.dropdown-content').forEach((d) => {
        if (d !== dropdown) {
          d.style.opacity = '0';
          d.style.transform = 'translateY(-10px)';
          setTimeout(() => (d.style.display = 'none'), 300);

          const otherIcon = d.previousElementSibling.querySelector('.caret-icon');
          if (otherIcon) otherIcon.classList.remove('rotate');
        }
      });

      if (dropdown.style.display === 'block') {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => (dropdown.style.display = 'none'), 300);
        if (icon) icon.classList.remove('rotate');
      } else {
        dropdown.style.display = 'block';
        setTimeout(() => {
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0)';
        }, 10);
        if (icon) icon.classList.add('rotate');
      }
    });
  });

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
}

// Submenu Dropdown
function initAllDropdownButtons() {
  const triggers = document.querySelectorAll('.dropdown-trigger');

  triggers.forEach((trigger) => {
    const submenu = trigger.nextElementSibling;
    const caret = trigger.querySelector('.caret-icon');

    trigger.addEventListener('click', () => {
      const isVisible = submenu.classList.contains('show');

      // Tutup semua yang lain
      document.querySelectorAll('.sub-buttons').forEach(el => el.classList.remove('show'));
      document.querySelectorAll('.dropdown-trigger .caret-icon').forEach(i => i.classList.remove('rotate'));

      if (!isVisible) {
        submenu.classList.add('show');
        if (caret) caret.classList.add('rotate');
      }
    });
  });

  // Klik di luar = tutup semua
  document.addEventListener('click', (e) => {
    triggers.forEach(trigger => {
      const submenu = trigger.nextElementSibling;
      const caret = trigger.querySelector('.caret-icon');

      if (!trigger.contains(e.target) && !submenu.contains(e.target)) {
        submenu.classList.remove('show');
        if (caret) caret.classList.remove('rotate');
      }
    });
  });
}

// Gacha
function feelingLucky() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://gigend.blogspot.com/feeds/posts/summary?max-results=0&alt=json-in-script&callback=readLucky';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function readLucky(root) {
  var feed = root.feed;
  var total = parseInt(feed.openSearch$totalResults.$t, 10);
  var luckyNumber = Math.floor(Math.random() * total);
  luckyNumber++;
  fetchLuck(luckyNumber);
}

function fetchLuck(luck) {
  script = document.createElement('script');
  script.src = 'https://gigend.blogspot.com/feeds/posts/summary?start-index=' + luck + '&max-results=1&alt=json-in-script&callback=showLucky';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
}

function showLucky(root) {
  var entry = root.feed.entry[0];
  for (var j = 0; j < entry.link.length; ++j) {
    if (entry.link[j].rel == 'alternate') {
      window.location = entry.link[j].href;
    }
  }
}

// Dark Mode
(function () {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
  }

  document.addEventListener("click", function (e) {
    if (e.target.id === "darkModeToggleNav") {
      document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "enabled" : "disabled");
    }
  });
})();

// Load modular element on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  const isInPages = location.pathname.includes('/pages/');
  const isInDocs = location.pathname.includes('/docs/');
  const isLocalFile = location.protocol === 'file:';

  // Deteksi apakah sedang dibuka dari /docs/ atau root /
  const basePath = isLocalFile || isInDocs ? '/docs/' : '/';

  // Load navbar
  loadElement("navbar", basePath + "element/navbar.html", () => {
    initDropdownNavbar();       // navbar dropdown
    initAllDropdownButtons(); // <- fungsi general baru
  });

  // Load footer dan isi logo-nya sesuai path
  loadElement("footer", basePath + "element/footer.html", () => {
    const logo = document.getElementById("footer-logo");
    if (logo) {
      logo.src = basePath + "assets/images/gigend-logo-small.png";
    }
  });
});

// Reveal CSS animation as you scroll down a page
new WOW().init();

