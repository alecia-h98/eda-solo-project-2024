const express = require('express');
const pool = require('../modules/pool');
//const axios = 
const rejectUnauthenticated = require('../modules/authentication-middleware');

const router = express.Router();

//getting all items by catagory - main category page
router.get('/', (req, res) => {
    const query = `
    SELECT * FROM "item"
    ORDER BY "category";
    `;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: items not selected based off of their catagory(backend)', err);
        res.sendStatus(500);
    })
});


//grabbing by specific category
router.get('/:category', (req,res) => {
    const query = `
    SELECT "id", "name", "description", "is_favorite", "found", "season", "uses", "photo", "nutrition", "shelf_life", "harvesting", "imposters", "category"
    FROM "item"
    WHERE "category" = $1;
    `;
    pool.query(query,[req.params.category])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR GRABBING CATEGORY', err);
            res.sendStatus(500);
        })
});


//getting a specific item from the specified category list
router.get('/:itemId', (req, res) => {
    const query = `
    SELECT "id", "name", "description", "is_favorite", "found", "season", "uses", "photo", "nutrition", "shelf_life", "harvesting", "imposters", "category"
    FROM "item"
    WHERE "id" = $1;
    `;
    pool.query(query,[req.params.itemId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error:', err);
      res.sendStatus(500);
    })
});

//UPDATE THESE ONCE THE NEW TABLE IS INCLUDED INTO SQL.

//GRABBING THE FAVORITES LIST
//MAKE SURE IT IS PULLING THE LOG IN USER'S FAVORITE ITEMS
// router.get('/favorites', (req, res) => {
//     const query = `
//     SELECT "id", "name", "is_favorite"
//     FROM "item"
//     WHERE "is_favorite" = TRUE ;
//     `;
//     pool.query(query,[req.user.id])
//     .then(result => {
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('Error:', err);
//       res.sendStatus(500);
//     })  
// });

// PUT ROUTE TO SWITCH AN ITEM'S FAVORITE KEY
//dont think this is right
// MAKE SURE TO INCLUDE THE REQ.USER WHEN WRITING THIS
// router.put('/favorites/:favId', (req, res) => {
//     const sqlText = `
//     UPDATE "item" SET "is_favorite" = NOT "is_favorite" WHERE id= $1 RETURNING *;
//     `;
//     pool.query(sqlText, [req.params.favId]).then((result) => {
//         res.send(result.rows);
//     }).catch(err => {
//         res.sendStatus(500);
//         console.error(err);
//     })
// });

module.exports = router;