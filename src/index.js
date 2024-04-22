const express = require( 'express' );
const app = express();
const PORT = 3000;

// Importar los datos desde un archivo JSON
const products = require( '../data/products.json' );

// Endpoint para buscar items
app.get( '/api/items', ( req, res ) => {
    const query = req.query[ 'q' ].toLowerCase();
    const filteredProducts = products.products.filter( product =>
        product.title.toLowerCase().includes( query )
    );
    res.json( filteredProducts );
} );

// Endpoint para obtener detalles de un producto específico
app.get( '/api/items/:id', ( req, res ) => {
    const { id } = req.params;
    const product = products.products.find( product => product.id === id );
    if ( product ) {
        res.json( product );
    } else {
        res.status( 404 ).send( 'Producto no encontrado' );
    }
} );

// Iniciar el servidor
app.listen( PORT, () => {
    console.log( `Servidor corriendo en http://localhost:${ PORT }` );
} );
