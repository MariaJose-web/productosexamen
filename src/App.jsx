import { useState } from 'react';
import './App.css';
import ListaProductos from './components/ListaProductos';
import FormularioProducto from './components/FormularioProductos';

function App() {

  return (
    <>
      <ListaProductos></ListaProductos>

      <FormularioProducto></FormularioProducto>
    </>
  )
};

export default App; 
