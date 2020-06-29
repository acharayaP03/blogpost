const express = require('express');
const router = express.Router()

//@desc Login/Landing page

//@route GET 

router.get('/', (req, res) =>{
    //here we need to specify the render function to use login layout no the main. 
    // if we dont specify it then it will use main as a default since we have main as a default on app js. 
    res.render('login', {
        layout: 'login'
    })
})


//@desc Dashboard page

//@route GET 

router.get('/dashboard', (req, res) =>{
    res.render('dashboard')
})


module.exports = router;