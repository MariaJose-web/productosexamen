import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
const URL = import.meta.env.VITE_API_URL;

function FormularioProducto() {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [mensaje, setMensaje] = useState('');




        const registrarProducto = (e) => {
            // Evita que la página se recargue al enviar el formulario
            e.preventDefault();

            // Creamos el objeto con los datos (coincidiendo con lo que espera tu API)
            const nuevoProducto = {
                nombre: nombre,
                precio: Number(precio) // Nos aseguramos de enviar el precio como número
            };

            // Hacemos la petición POST
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Indicamos al servidor que enviamos un JSON
                },
                body: JSON.stringify(nuevoProducto) // Convertimos el objeto a texto JSON
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al guardar el producto');
                    }
                    return response.json();
                })
                .then((data) => {
                    setMensaje('¡Producto añadido con éxito!');
                    // Limpiamos los campos del formulario
                    setNombre('');
                    setPrecio('');
                })
                .catch((error) => {
                    console.error('Hubo un problema:', error);
                    setMensaje('Error de conexión con el servidor');
                });

    }

    return (
        <>
            <div>
                <h2>Añadir Nuevo Producto</h2>

                <form onSubmit={registrarProducto}>
                    <div>
                        <label>Nombre del Producto:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Precio (€):</label>
                        <input
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">
                        Guardar Producto
                    </button>
                </form>

                {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{mensaje}</p>}
            </div>
        </>
    )

};

export default FormularioProducto; 