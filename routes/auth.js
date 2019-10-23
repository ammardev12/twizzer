const router = require('express').Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {registerValidation, loginValidation} = require('../validation');
 
 

const User = require('../model/User');  
const Post = require('../model/Post');  
const Follow = require('../model/Follow');
const Comment = require('../model/Comment');
const Like = require('../model/Like');

Post.hasMany( Like, { as: "postLikes", foreignKey: "postId"});
Post.hasMany(Comment, { as: "comment", foreignKey: "postId"});
//User - Followers relation
User.hasMany(Follow, {as: 'followers', foreignKey: 'followedId'})
User.hasMany(Follow, {as: 'following', foreignKey: 'followerId'})
//Post - User relation
User.hasMany(Post, {as:'posts', foreignKey: 'userId'})

router.use(cors());

 
//get  users user data    
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { 
                model: Post,
                as: 'posts'
            },
            {
                model: Follow,
                as: 'followers'
            },
            {
                model: Follow,
                as: 'following'
            }
           
        ]
    })
    .then(async user =>  {
        const userPost = await Post.findAll({ where: { userId: req.params.id },
                include: [
                    {
                        model: Comment,
                        as: "comments"
                    },
                    { 
                        model: Like,
                        as: "postLikes"
                    }
                ]
        });
        const userPostData = await userPost;
        // console.log(userPostData.posts);
        
        res.send({user,userPosts: userPostData})  
      
        
    })
})



//register
router.post('/register', async (req, res) => {
     //validation 
    
    const {error} = registerValidation(req.body);
    if(error)  return res.json({"error": error.details[0].message});

    const today = new Date();
  
    const userData = {  
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        createdAt: today
  }
  //Checking if user is already exists
User.findOne({ 
    where: 
    { email:req.body.email }
    })
    .then(user => {
      if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              
                userData.password = hash
                User.create(userData)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {  expiresIn:  1440 });
                    userData.token = token,
                
                    res.json({"token": token, user}) 
                })
                .catch(err => {
                    res.json({"error": "registration error", "message": err.errors[0].message})
                })
            })
      }else {
          res.json({"error": "email already exist"})
      }
  })
  .catch(err => {
      res.json({"error": err});
  })
  
}); 



//Login
router.post('/login', async (req, res) => {
    //Validation 
    const {error} = loginValidation(req.body);
    if(error) return res.json({"error":error.details[0].message}) ;
    //checking if email exists
    // const user = await  User.findOne({ where: { email: req.body.email } });
    // const registeredUser = await user
    // if(registeredUser) {
    //     const rightpassword = bcrypt.compareSync(req.body.password, registeredUser.password)
    //     if(rightpassword) {
    //         let token = jwt.sign(registeredUser.dataValues, process.env.SECRET_KEY, { expi })
    //     }
    // }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => { 
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn:  1440
                })
                res.header('token', token).json({"token":token, user});
            }else {
                res.json({"error":'email or password might be wrong'});
            }
        }else {
            res.json({"error":'user does not exist'});
        } 
    })
    .catch(err => {
        res.json({"error": err});
    })
}) 

//followers system
router.post('/follow/:id', (req, res) => {
    // res.send({
    //     followedId: req.params.id,
    //     followerId: req.body.followerId,
    //     action: req.body.type
    // })
    if(req.body.type === 'follow') {
        const follow = {
            followedId: req.params.id,
            followerId: req.body.followerId,
        }
    
        Follow.findOne({
            where: {
                followedId: req.params.id,
                followerId: req.body.followerId
            }
        }).then(followed => {
            if(!followed) {
                Follow.create(follow)
                .then(followed =>{
                 return   res.json({
                     action: "followed",
                     msg: "your now following him",
                     followed
                    })
                })
            } else {
               return res.send("already following")
            }
        })
    }
    
    else if (req.body.type === 'unfollow') {
        const followedId = req.params.id;
        Follow.findOne({
            where: {
                followerId: req.params.id,
                followerId: req.body.followerId
            }
        })
        .then(foundedOne => {
           return foundedOne.destroy();
        })
        .then(result => {
         
            return res.send({
                action: "unfollowed",
                msg: "your are un following him",
                result
            })
        })
    }
})


module.exports = router;