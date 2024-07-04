

document.getElementById('categoria-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
        const response = await fetch('/categoria', {
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
const deleteButtons = document.querySelectorAll('.delete-category');
deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const categoryId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`/categoria/eliminar/${categoryId}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (result.hasProducts) {
                const confirmResult = await Swal.fire({
                    title: '¿Estás seguro?',
                    text: result.message,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo!',
                    cancelButtonText: 'Cancelar'
                });
                if (confirmResult.isConfirmed) {
                    const responseResult = await fetch(`/categoria/eliminar/${categoryId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ deleteProducts: true })
                    });

                    const deleteProductsResult = await responseResult.json();
                    if (deleteProductsResult.success) {
                        Swal.fire({
                            title: 'Eliminado!',
                            text: 'La categoría y los productos asociados han sido eliminados.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000,
                        }
                        ).then(() => {
                            window.location.reload();
                        });
                    }
                    else {
                        Swal.fire(
                            'Error!',
                            deleteProductsResult.message,
                            'error'
                        );
                    }
                }
            } else {
                Swal.fire(
                    {
                        title: 'Eliminado!',
                        text: result.message,
                        icon: result.success ? 'success' : 'error',
                        showConfirmButton: false,
                        timer: 2000,

                    }

                ).then(() => {
                    if (result.success) window.location.reload();
                });

            }

        } catch (error) {
            Swal.fire(
                'Error!',
                '¡Algo salió mal!',
                'error'
            );
        }

    })
});