import ToastContainer from '../components/ToastContainer';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('toast-root') as HTMLElement;

const toasting = (text: string, type: string) => {
  const root = createRoot(domNode);
  root.render(<ToastContainer message={text} onClick={() => root.unmount()} type={type} />);

  setTimeout(() => {
    const toastDiv = document.getElementById('toast') as HTMLElement;
    if (toastDiv) toastDiv.classList.add('out');
  }, 2000);

  setTimeout(() => {
    root.unmount();
  }, 2280);
};

const toast = {
  success: (message: string) => {
    toasting(message, 'success');
  },

  warning: (message: string) => {
    toasting(message, 'warning');
  },

  error: (message: string) => {
    toasting(message, 'error');
  },
};

export default toast;
