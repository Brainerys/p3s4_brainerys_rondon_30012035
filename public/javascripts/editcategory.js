document.querySelector('.category-sweet').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const categoryId = form.action.split('/').pop();
    
    try {
        const response = await fetch(`/categoria/editar/${categoryId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            Swal.fire({
                title: 'Actualizado!',
                text: result.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                location = '/categorias'
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
});