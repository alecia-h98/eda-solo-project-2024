const express = require('express');
const pool = require('../modules/pool');
//const axios = 
const rejectUnauthenticated = require('../modules/authentication-middleware');
const router = express.Router();
// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//may not need this, 
// module.exports = cloudinary;
// const express = require('express');
// const cloudinary = require('../cloudinaryConfig'); // Cloudinary config
const multer = require('multer');


// Set up Multer for memory storage (temporary storage before Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for form submission + image upload
// router.post('/submit-form', upload.single('photo'), async (req, res) => {
//   try {
//     const { found_date, location, description } = req.body; // Form fields
//     let photoUrl = null;

//     if (req.file) {
//       // Upload to Cloudinary
//       const result = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           { folder: "uploads_ITW" }, // Cloudinary folder name
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         ).end(req.file.buffer);
//       });

//       photoUrl = result.secure_url;
//     }

//     // Example: Store form data and photo URL in the database (optional)
//     console.log({ found_date, location, description, photoUrl });

//     return res.json({ success: true, photoUrl, found_date, location, description });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//figure out how to add the item's id to add to the 
// router.post('/', (req, res) => {
//   let newItem = {...req.body};

//   //should I put this after my pool.query code on line 72?
//   // if (!req.body.item_id || !req.body.found_date|| !req.body.location || !req.body.description || !req.body.photo || !req.user.id) {
//   //     console.error('Missing required fields');
//   //     res.sendStatus(400);
//   //     return;
//   // }


//   let queryText = `INSERT INTO "found" ("item_id", "found_date", "location", "description", "photo", "user_id") VALUES
//     ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  
//   pool.query(queryText, [newItem.item_id, newItem.found_date, newItem.location, newItem.description, newItem.photo, req.user.id]) 
//   .then(result => {
//     console.log(`retrieved results:`, result.rows);
//     res.sendStatus(201);
//   })
//   .catch((err) => {
//     console.error(`error adding form items `, err);
//     res.sendStatus(500);
// });
// });


//MAKE SURE THIS RETURNS A SPECIFIC PERSON'S LIST AND NOT ALL OF THE LISTS
//GET FOUND LIST
router.get('/'  , (req,res) => {
    const query = `
SELECT "found"."id", "found"."found_date", "found"."description", "found"."item_id", "found"."location", "found"."photo", "found"."user_id", "item"."name"
From "item"
JOIN "found"
ON "item"."id" = "found"."item_id" 
WHERE "found"."user_id" = $1
ORDER BY "found"."found_date" DESC;
    `;
    pool.query(query, [req.user.id])
     .then(result => {
        res.send(result.rows);
     })
     .catch(err =>  {
        console.log(`Error grabbing found list`, err);
        res.sendStatus(500)
     })
});


//the route for the specific found item and it's details
router.get('/:foundId', (req, res) => {
    const query = `
select "found"."id" as "foundId", "found"."found_date", "found"."description", "found"."item_id", "found"."location", "found"."photo", "found"."user_id", "found"."item_id", "item"."name"
from "item"
join "found"
on "item"."id" = "found"."item_id"
join "user"
on "found"."user_id" = "user"."id"
where "found"."id" = $1 AND "found"."user_id" = $2;
    `;
    pool.query(query, [req.params.foundId, req.user.id])
     .then(result => {
        res.send(result.rows);
     })
     .catch(err =>  {
        console.log(`Error grabbing specific found`, err);
        res.sendStatus(500);
     })
});

//DONE
//DELETE POST FROM FOUND LIST
router.delete('/del/:foundId', (req, res) => {
    console.log('req.params', req.params);
    const queryText = `DELETE FROM "found" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.foundId]).then((result) => {
        res.sendStatus(204);
    }).catch(err=> {
        res.sendStatus(500);
        console.error(err);
    })
});

module.exports = router;