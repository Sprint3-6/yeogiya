import handleImageSource from './handleImageSource';
import '../components/ToastContainer/style.scss';

const root = document.getElementById('root') as HTMLElement;

const createChild = (text: string, type: string) => {
  const toastContainer = document.createElement('div');
  const toastImg = document.createElement('img');
  const toastText = document.createElement('div');

  toastImg.src = handleImageSource(type);
  toastText.innerText = text;

  toastContainer.classList.add('toast');
  toastContainer.classList.add(type);

  toastContainer.appendChild(toastImg);
  toastContainer.appendChild(toastText);

  toastContainer.addEventListener('click', () => toastContainer.remove());
  root.parentElement?.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.classList.add('out');
  }, 2000);

  setTimeout(() => {
    toastContainer.remove();
  }, 2280);
};

const toast = {
  success: (message: string) => {
    createChild(message, 'success');
  },

  warning: (message: string) => {
    createChild(message, 'warning');
  },

  error: (message: string) => {
    createChild(message, 'error');
  },
};

export default toast;
