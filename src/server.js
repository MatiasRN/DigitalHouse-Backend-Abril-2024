const app = require( './index' );
const PORT = 3000;

app.listen( PORT, () => {
    console.log( `Servidor corriendo en http://localhost:${ PORT }` );
} );