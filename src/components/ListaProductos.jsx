import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const URL = import.meta.env.VITE_API_URL;

function ListaProductos() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {

        async function recuperar() {
            const response = await fetch(URL);
            const data = await response.json()
            setProductos(data);
        }
        recuperar();
    }, []);
    return (
        <>
            <h2>Lista de Productos</h2>

            <ol class="list-group list-group-numbered">
                {productos.map((item, index) => (
                    <li
                        class="list-group-item"
                        key={index}> Id {item.id}: {item.nombre} {item.precio}€</li>
                ))}
            </ol>
        </>
    )
};

export default ListaProductos; 