// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.navbar a');

  // Add click event listener to each navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // If the link is not the "home" link (which stays on the page)
      if (!this.classList.contains('active')) {
        // Prevent default only for demo purposes
        // In a real site, you would let the link redirect normally
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });

        // Add active class to the clicked link
        this.classList.add('active');

        // Show an alert for demo purposes
        alert(`Navigating to ${this.textContent} is disabled in this demo.`);
      }
    });
  });

  // Button hover effects (optional - already handled in CSS)
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      alert(`Navigating to ${this.textContent.trim()} is disabled in this demo.`);
    });
  });
});
