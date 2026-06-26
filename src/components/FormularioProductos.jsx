import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
const URL = import.meta.env.VITE_API_URL;

function FormularioProducto() {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [mensaje, setMensaje] = useState('');

    const registrarProducto = (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre: nombre,
            precio: Number(precio) 
        };

        // Hacemos la petición POST
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(nuevoProducto) 
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al guardar el producto');
                }
                return response.json();
            })
            .then((data) => {
                setMensaje('¡Producto añadido con éxito!');
                setNombre('');
                setPrecio('');
                window.location.reload(); 
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
                    <div class="mb-3">
                        <label class="form-label">Nombre del Producto:</label>
                        <input
                            class="form-control"
                            placeholder='Nombre Producto'
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Precio (€):</label>
                        <input
                            class="form-control"
                            placeholder='Precio Producto en euros'
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                    </div>

                    <button class="btn btn-outline-info" type="submit">
                        Guardar Producto
                    </button>
                </form>

                {mensaje && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{mensaje}</p>}
            </div>
        </>
    )

};

export default FormularioProducto; 