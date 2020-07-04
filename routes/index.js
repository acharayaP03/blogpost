const express = require('express');
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware');

const Blogs = require('./../Models/Blogs');

//@desc Landing page

//@route GET 

router.get('/blog', async (req, res) =>{
    //get all the public blogs and display it to the main blog page. 
    try {
        const blogs = await Blogs.find({ status : 'public'}).populate('user').sort({ createdAt: 'desc'}).lean();
        //here we need to specify the render function to use login layout no the main. 
        // if we dont specify it then it will use main as a default since we have main as a default on app js. 
        res.render('blogpages/main', {
            blogs, 
            layout: 'mainblog'
        })
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
})

//@desc Single blog page 

//@route GET 

router.get('/blog/:id', async (req, res) =>{
    //get all the public blogs and display it to the main blog page. 
    try {
        const blogs = await Blogs.findById(req.params.id).populate('user').sort({ createdAt: 'desc'}).lean();
        //here we need to specify the render function to use login layout no the main. 
        // if we dont specify it then it will use main as a default since we have main as a default on app js. 
        res.render('blogpages/singleblog', {
            blogs, 
            layout: 'mainblog'
        })
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
})

//@desc Login/Landing page

//@route GET 

router.get('/login', ensureGuest, (req, res) =>{
    //here we need to specify the render function to use login layout no the main. 
    // if we dont specify it then it will use main as a default since we have main as a default on app js. 
    res.render('login', {
        layout: 'login'
    })
})


//@desc Dashboard page

//@route GET 

router.get('/dashboard', ensureAuth, async (req, res) =>{
    try {
        //show users their blogs
        const blogs = await Blogs.find({ user: req.user.id}).lean();

        res.render('dashboard', {
            name : req.user.firstName,
            image : req.user.image,
            blogs
        } )
        
    } catch (err) {
        console.log(err);
        res.render('error/500'); // if anything goes wrong, show them error page. 
    }
})

module.exports = router;


