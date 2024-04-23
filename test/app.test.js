// app.test.js
const request = require( 'supertest' );
const app = require( "../src/index" );

describe( 'GET /status', () => {
    it( 'App is running', async () => {
        const response = await request( app )
            .get( '/status' )
            .expect( 200 );
    } );
} );
