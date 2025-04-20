// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.navbar a');

  // Add click event listener to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remove active class from all links
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });

      // Add active class to the clicked link
      this.classList.add('active');
      // Biarkan browser melanjutkan navigasi normal
    });
  });

  // Button click (biar tombol bisa jalan normal juga)
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Tidak ada preventDefault, biar link berjalan normal
    });
  });
});
