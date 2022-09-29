const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all orders that have been placed, populate with data from the pizza collection
router.get('/', (req, res) => {
    // Find all orders and return them
    pool.query('SELECT * FROM "orders";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/order', error);
        res.sendStatus(500);  
    });
})

// POST a new order
router.post('/', async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            customer_name,
            street_address,
            city,
            zip,
            type,
            total,
            pizzas
        } = req.body;
        await client.query('BEGIN')
        const orderInsertResults = await client.query(`INSERT INTO "orders" ("customer_name", "street_address", "city", "zip", "type", "total")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;`, [customer_name, street_address, city, zip, type, total]);
        const orderId = orderInsertResults.rows[0].id;

        await Promise.all(pizzas.map(pizza => {
            const insertLineItemText = `INSERT INTO "line_item" ("order_id", "pizza_id", "quantity") VALUES ($1, $2, $3)`;
            const insertLineItemValues = [orderId, pizza.id, pizza.quantity];
            return client.query(insertLineItemText, insertLineItemValues);
        }));

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

// DELETE an order
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "orders" WHERE id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /api/order', error);
        res.sendStatus(500);
    })
});

module.exports = router;