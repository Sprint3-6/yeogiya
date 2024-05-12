export default function handleImageSource(type: string) {
  switch (type) {
    case 'success':
      return '/assets/images/toast-success.png';
    case 'warning':
      return '/assets/images/toast-warning.png';
    case 'error':
      return '/assets/images/toast-error.png';
    default:
      return '/assets/images/toast-success.png';
  }
}
