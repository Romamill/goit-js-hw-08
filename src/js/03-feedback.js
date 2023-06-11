
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const savedState = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

emailInput.value = savedState.email || '';
messageInput.value = savedState.message || '';

const saveFormState = throttle(() => {
    let state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500);

emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let state = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log('Form submitted:', state);

    emailInput.removeEventListener('input', saveFormState);
    messageInput.removeEventListener('input', saveFormState);

    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
});
