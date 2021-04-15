import path from 'path';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';

// @desc     Get all posts by followed users
// @route    GET /api/posts
// @access   Public
export const getPosts = async (req, res, next) => {
    const loggedInUser = req.user;
    let posts;

    posts = await Post.find().populate({
        path: 'user',
        select: 'userName fullName'
    });

    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    });
};

// @desc     Get a single post
// @route    GET /api/posts/:id
// @access   Public
export const getPost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            success: false,
            data: "No post found"
        })
    }
    res.status(200).json({
        success: true,
        data: post
    });
};

// @desc     Create post
// @route    POST /api/posts
// @access   Private
export const createPost = async (req, res, next) => {
    // Adding currently logged in user to body 
    req.body.user = req.user.id;
    console.log(req.body);
    
    if(!req.body.image){
        return res.status(401).json({
            success: false,
            data: 'Please upload an image'
        });
    };

    const post = await Post.create(req.body);

    res
    .status(200)
    .json({
        success: true,
        data: post
    });
};

// @desc     Update post
// @route    PUT /api/posts/:id
// @access   Private
export const updatePost = async (req, res, next) => {
    res.send('Update post');
};

// @desc     Delete post
// @route    DELETE /api/posts/:id
// @access   Private
export const deletePost = async (req, res, next) => {
    res.send('Delete post');
};

// @desc     Like on a post
// @route    GET /api/posts/:id/like
// @access   Private
export const likePost = async (req, res, next) => {
    const loggedInUser = req.user;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if(!post){
        return res.status(404).json({success: false, data:'No Post Found'});
    }

    const like = await Like.create({
        user: loggedInUser,
        post: post
    });

    post.likes.push(like);
    post.save();

    res.status(200).json({
        success: true,
        data: post
    });
};

// @desc     Comment on a post
// @route    POST /api/posts/:id/comment
// @access   Private
export const commentPost = async (req, res, next) => {
    const loggedInUser = req.user;
    const postId = req.params.id;
    const text = req.body.text;

    const post = await Post.findById(postId);

    if(!post){
        return res.status(404).json({success: false, data:'No Post Found'});
    }

    const comment = await Comment.create({
        user: loggedInUser,
        post: post,
        text: text
    });

    post.comments.push(comment);
    post.save();

    res.status(200).json({
        success: true,
        data: post
    });
}
