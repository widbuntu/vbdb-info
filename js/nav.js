// JavaScript to switch tabs
document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active class from all tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
        });
        
        // Add active class to clicked tab's panel
        document.getElementById(targetTab).classList.add('active');
    });
    });