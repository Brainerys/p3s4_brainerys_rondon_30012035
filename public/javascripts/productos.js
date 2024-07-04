
document.getElementById('productos-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch('/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            await Swal.fire({
                title: '¡Éxito!',
                text: result.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            });
            window.location.reload();
        } else {
            await Swal.fire({
                title: '¡Error!',
                text: result.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        await Swal.fire({
            title: '¡Error!',
            text: '¡Algo salió mal!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

const deleteButtons = document.querySelectorAll('.delete-product');
deleteButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const productId = event.target.getAttribute('data-id');

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/productos/eliminar/${productId}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
          Swal.fire(
            'Eliminado!',
            result.message,
            'success'
          ).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire(
            'Error!',
            result.message,
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          '¡Algo salió mal!',
          'error'
        );
      }
    }
  });
});