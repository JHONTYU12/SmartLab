// Referencias a los elementos del formulario
const form = document.getElementById('registerForm');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const registerBtn = document.getElementById('registerBtn');

// Referencias a los mensajes de error
const nombreError = document.getElementById('nombreError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Función para validar el formulario
function validateForm() {
    let isValid = true;

    // Validar que el nombre no tenga números
    if (!/^[a-zA-Z\s]+$/.test(nombreInput.value)) {
        nombreError.textContent = 'El nombre no debe contener números.';
        isValid = false;
    } else {
        nombreError.textContent = '';
    }

    // Validar el correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailError.textContent = 'Por favor, ingresa un correo válido.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validar la contraseña
    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // Validar que las contraseñas coincidan
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
    }

    return isValid;
}

// Escuchar el clic del botón de registro
registerBtn.addEventListener('click', () => {
    if (validateForm()) {
        // Redirigir al login después de un registro exitoso
        window.location.href = 'login.html';
    }
});
