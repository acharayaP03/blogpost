const express = require('express');
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware');
const Blogs = require('./../Models/Blogs');

//@desc Landing page

//@route GET 

router.get('/',  async (req, res) =>{
    console.log(`inside ${req.url}`)
    //get all the public blogs and display it to the main blog page. 
    try {
        const blogs = await Blogs.find({ status : 'public'}).populate('user').sort({ createdAt: 'desc'}).lean();
 
        //here we need to specify the render function to use login layout no the main. 
        // if we dont specify it then it will use main as a default since we have main as a default on app js. 
        console.log(blogs.user)
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

router.get('/:id', async (req, res) =>{
    //get all the public blogs and display it to the main blog page. 

    try {
        let blogs = await Blogs.findById(req.params.id).populate('user').lean();

        if(!blogs){
            return res.render('error/404');
        }
       
        res.render('blogpages/singleblog', {
            blogs, 
            layout: 'mainblog'
        })
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
})


//@desc get all story from same user

//@route GET 

router.get('/user/:userId', async (req, res) =>{
   
    try {
        let blogs = await Blogs.find({ user : req.params.userId, status: 'public'}).populate('user').lean()

        res.render('blogpages/main', {
            blogs, 
            layout: 'mainblog'
        })
    } catch (err) {
        console.log(err);
        res.render('error/500');
    }
})

module.exports = router;


