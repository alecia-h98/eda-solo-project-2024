const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//DONE
//getting all categories - main category page
router.get('/', (req, res) => {
    const query = `
    SELECT * FROM "category";
    `;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('ERROR: cannot render item list', err);
        res.sendStatus(500);
    })
});

//DONE
router.get('/:categoryId', (req, res) => {
    const query = `
  SELECT category.id, category.name, item.category_id, item.id, item.name
    FROM category
    join item
    on category.id = item.category_id
    WHERE category.id = $1;
    `;
    pool.query(query,[req.params.categoryId])
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('Error:', err);
        res.sendStatus(500);
      })
  });

module.exports = router;