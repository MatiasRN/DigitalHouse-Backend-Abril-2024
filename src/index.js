const express = require( 'express' );
const app = express();
const cors = require( "cors" )
const PORT = 3000;

// Importar los datos desde un archivo JSON
const products = require( '../data/products.json' );

app.use( cors() )
// Endpoint para buscar items

app.get( "/status", ( req, res ) => {
    res.status( 200 ).send( "OK" )
} )

app.get( '/api/items', ( req, res ) => {
    const { q, skip = 0, limit = 30 } = req.query;

    // Filtrar productos basados en la consulta de búsqueda
    let filteredProducts = products.products.filter( product =>
        product.title.toLowerCase().includes( q.toLowerCase() )
    );

    // Calcular el total de productos encontrados antes de aplicar paginación
    const total = filteredProducts.length;

    // Aplicar paginación a los productos filtrados
    filteredProducts = filteredProducts.slice( parseInt( skip ), parseInt( skip ) + parseInt( limit ) );

    // Crear el objeto de respuesta
    const response = {
        products: filteredProducts,
        total: total,
        skip: parseInt( skip ),
        limit: parseInt( limit )
    };

    res.json( response );
} );

// Endpoint para obtener detalles de un producto específico
app.get( '/api/items/:id', ( req, res ) => {
    const { id } = req.params;
    console.log( "id", id )
    const product = products.products.find( product => product.id == id );
    if ( product ) {
        res.json( product );
    } else {
        res.status( 404 ).send( 'Producto no encontrado' );
    }
} ); 

module.exports = app;
