import Swal from 'sweetalert2';

export const showSuccessDialog = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Berhasil',
    text: message,
    confirmButtonColor: '#3085d6',
  });
};

export const showErrorDialog = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Gagal',
    text: message,
    confirmButtonColor: '#d33',
  });
};

export const showConfirmDialog = (title, text, confirmText = 'Ya', cancelText = 'Batal') => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};