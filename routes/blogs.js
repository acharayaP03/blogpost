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

//@desc edit blog

//@route GET 

router.get('/edit/:id', ensureAuth, async (req, res) =>{
   
   const blog = await  Blogs.findOne({_id: req.params.id}).lean()

   if(!blog){
       return res.render('error/404');
   }

   if(blog.user != req.user.id){
       res.redirect('/blogs')
   }else{
       
       res.render('blogs/editBlog', {
            blog
       })
   }
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


// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let blog = await Blogs.findById(req.params.id).lean()
  
      if (!blog) {
        return res.render('error/404')
      }
  
      if (blog.user != req.user.id) {
        res.redirect('/stories')
      } else {
        blog = await Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

  //@desc confirm user before delete

//@route GET 
router.get('/delete/:id', ensureAuth, async (req, res) =>{
   
    try{
        let blog = await Blogs.findOne({_id: req.params.id}).lean();
        if (!blog) {
            return res.render('error/404')
        }

        if(blog.user != req.user.id){
            res.redirect('/blogs')
        }else{
            res.render('blogs/deleteBlog', {
                 blog
            })
        }

    }catch(err){
        console.log(err);
        return res.render('error/500')
    }
})

// @desc    Update story
// @route   PUT /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
      let blog = await Blogs.findById(req.params.id).lean()
  
      if (!blog) {
        return res.render('error/404')
      }
  
      if (blog.user != req.user.id) {
        res.redirect('/blogs')
      } else {
          //while deleting, no need to assign it to the variavle.
        await Blogs.remove({ _id : req.params.id})
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })


module.exports = router;