const router = require('express').Router();
const cors = require('cors');
const Post = require('../model/Post');
const verify = require('./verifyToken');
const sequelize = require('sequelize');

const User = require('../model/User')
const Comment = require('../model/Comment');
const Like = require('../model/Like');


Post.hasMany( Like, { as: "likes", foreignKey: "postId"});
Comment.belongsTo(User, { as: "commenter", foreignKey: "userId"});
Post.hasMany(Comment, { as: "comments", foreignKey: "postId"});
Post.belongsTo(User, {as:'user', foreignKey: 'userId'});

//fetching all posts
router.get('/', (req, res) => {
   Post.findAll({ 
        include: [
            {
                model: User,
                as: 'user'
             
            },
            {
                model: Comment,
                as: "comments" 
            },
            {
                model: Like,
                as: "likes"
            }
        ],
    order: sequelize.literal('createdAt DESC')

    
    })
   .then(posts => {
       res.send(posts);
   })
    
});
 

//Posting new post
router.post('/', async (req, res) => {
   
    if(req.files === '' && req.body.postBody === '') {
      return  res.json({"error": "empty post"})
    } 
  
    if(req.files === '') {
        const file = req.files.file
        file.mv(`${__dirname}/../client/public/uploads/posts/${file.name}`, err => {
            if(err) {
                console.error(err)
                //res.status(500).send(err)
            }
          return   fileUploaded = {filename: file.name, filePath: `/uploads/${file.name}`}
        })
    }else {
        file = "noname"
    }
  
     
    const newPost = { 
        userId: req.body.userId,
        postBody: req.body.postBody,
        postImage: req.files ? req.files.file.name : ""
    }


    if(req.body.postBody) {

        const post = await Post.findOne({ where: { postBody: req.body.postBody } })
        const existPost = await post
        if(!existPost) {
            const createPost = await Post.create(newPost)
            const addedPost = await createPost
            const postedPost = await Post.findOne({ where: { id: addedPost.id }, include: [ { model: User, as: 'user' } ] })
            res.json({"post": postedPost})
        } 

        
    } else { 
        res.json({error: "not allowed"}) 
    }
})

//comments 
router.post('/comment', ( req, res ) => {

    const commentData = {
        userId: req.body.userId,
        username: req.body.username,
        postId: req.body.postId,
        comment: req.body.comment 
    }

    Comment.findOne({
        where: {
            comment: req.body.comment
        }
    }).then( comment => {
        if( !comment ) {
            Comment.create(commentData)
            .then(savedComment => {
              return  res.send(savedComment);
            })
        }
    })
  
});

router.post('/like', ( req, res ) => {
    
    Like.findOne({
        where: {
            userId: req.body.userId,
            postId: req.body.postId
        }
    })
    .then(liked => {
        if(liked) {
            if(liked.userId !== req.body.userId , liked.postId !== req.body.postId) {
                Like.create({
                    userId: req.body.userId,
                    postId: req.body.postId
                })
                .then(successLike => {
                   return res.send({ successLike })
                })
            }
        } else if(!liked) {
            Like.create({
                userId: req.body.userId,
                postId: req.body.postId
            })
            .then(successLike => {
               return res.send({ successLike })
            })
        }
       
    })
})

module.exports = router;
