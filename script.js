document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });
});

