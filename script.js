document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('active');
        });
    });
});
