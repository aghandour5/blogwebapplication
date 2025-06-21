document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

function register() {
    document.getElementById('login').style.transform = 'translateX(-520px)';
    document.getElementById('register').style.transform = 'translateX(0)';
}

function login() {
    document.getElementById('login').style.transform = 'translateX(0px)';
    document.getElementById('register').style.transform = 'translateX(520px)';
}