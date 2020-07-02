const express = require('express');
const router = express.Router()

const { ensureAuth } = require('../middlewares/authMiddleware');

const Blogs = require('./../Models/Blogs');

//@desc Login/Landing page

//@route GET 

router.get('/add', ensureAuth, (req, res) =>{
   
    res.render('blogs/addBlog', {
        //include this, to show user name and image. 
        name : req.user.firstName,
        image : req.user.image,
    })
})


//@desc Create a Blog

//@route POST 

router.post('/', ensureAuth, async (req, res) =>{
   try {
       req.body.user = req.user.id;
       await Blogs.create(req.body);
       res.redirect('/dashboard');
   } catch (err) {
       console.log(err)
       res.render('error/500') 
   }
})

module.exports = router;