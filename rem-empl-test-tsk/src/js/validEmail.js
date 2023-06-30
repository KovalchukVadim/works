function isValidEmail(em) {
    const emReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emReg.test(em);
}

function validateEmail() {
    const inpEmail = document.querySelector('.search-footer-email');
    const result = document.getElementById("result");
    const email = inpEmail.value;

    if (isValidEmail(email)) {
        result.textContent = `${email} чудово! пошта підходить.`;
        result.style.color = 'green'
    } else {
        result.textContent = `${email} не коректна пошта, будь-ласка введіть ще раз!`;
        result.style.color = 'red'
        result.style.fontSize = '14px'


    }
}