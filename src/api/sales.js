import axios from './axios';

// Llamada al API para obtener todas las ventas
export const getSalesRequest = () => axios.get('/sales');

// Llamada al API para obtener una venta por ID
export const getSaleRequest = (id) => axios.get('/sales/' + id);

// Llamada al API para agregar una venta
export const createSaleRequest = (sale) =>
  axios.post('/sales', sale, {
    headers: {
      'Content-Type': 'application/json', // JSON en lugar de multipart/form-data
    },
  });

// Llamada al API para eliminar una venta
export const deleteSaleRequest = (id) => axios.delete('/sales/' + id);

// Llamada al API para editar una venta
export const updateSaleRequest = (id, sale) =>
  axios.put('/sales/' + id, sale);
