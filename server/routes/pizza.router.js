const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('GET /api/pizza');
    pool.query('SELECT * from "pizza";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/pizza', error)
        res.sendStatus(500);
    });
})

module.exports = router;