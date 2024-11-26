// Referencias a los elementos del formulario
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

// Referencias a los mensajes de error
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Función para validar el formulario
function validateLoginForm() {
    let isValid = true;

    // Validar el correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.textContent = 'Por favor, ingresa un correo válido.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validar que la contraseña no esté vacía
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'La contraseña no puede estar vacía.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
}

// Escuchar el clic del botón de inicio de sesión
loginBtn.addEventListener('click', () => {
    if (validateLoginForm()) {
        // Redirigir al home del usuario después de un inicio exitoso
        window.location.href = '/frontend/html/homeUser.html';
    }
});
