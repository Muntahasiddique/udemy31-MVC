const express = require('express');
//const mongodb = require('mongodb');
const blogControllers = require('../controllers/post-controllers')
//const db = require('../data/database');
//const Post = require('../models/post')
//const ObjectId = mongodb.ObjectId;
const router = express.Router();
const GaurdRoute = require('../middlewares/authprotection-middleware');
router.get('/', blogControllers.getHome);
router.use(GaurdRoute);

router.get('/admin', blogControllers.getAdmin);
router.post('/posts', blogControllers.createPost);

router.get('/posts/:id/edit', blogControllers.getSinglePost);

router.post('/posts/:id/edit',blogControllers.updatePost );

router.post('/posts/:id/delete', blogControllers.deletePost);

module.exports = router;
