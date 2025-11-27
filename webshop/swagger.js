const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Records API',
      version: '1.0.0',
      description: 'Ett enkelt REST-API med Node.js, Express och SQLite.'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Record: {
          type: 'object',
          properties: {
            record_id: { type: 'integer' },
            record_title: { type: 'string' },
            price: { type: 'number', format: 'float' },
            description: { type: 'string', nullable: true },
            image_src: { type: 'string', nullable: true },
            artist_id: { type: 'integer' },
            genre_id: { type: 'integer' }
          }
        }
      }
    }
  },
  apis: ['./routes/api/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };