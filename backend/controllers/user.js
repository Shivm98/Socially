import User from '../models/User.js';
import Post from '../models/Post.js';


// @desc     Follow User
// @route    POST /api/users/:id/follow
// @access   private
export const followUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            success: true,
            data:`User not found with the id ${id}`
        });
    };

    const loggedInUser = await User.findById(req.user);
    console.log(loggedInUser)
    user.followers.push(loggedInUser);
    loggedInUser.following.push(user);
     // save
    loggedInUser.save();
    user.save();

    res.status(200).json({
        success: true,
        data: loggedInUser
    });
}


// @desc     Unfollow User
// @route    POST /api/users/:id/unfollow
// @access   private
export const unFollowUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            success: true,
            data:`User not found with the id ${id}`
        });
    };

    const loggedInUser = await User.findById(req.user);
    loggedInUser.following.pop(user);
    loggedInUser.save();

    res.status(200).json({
        success: true,
        data: loggedInUser
    });
}


// @desc     Search User
// @route    POST /api/users?query
// @access   private
export const searchUser = async (req, res, next) => {
    const keyword = req.query.keyword
        ? {
            userName: {
            $regex: req.query.keyword,
            $options: 'i',
            },
        }
        : {};
    console.log(keyword)
    const users = await User.find({...keyword});

    if(!users){
        return res.status(404).json({
            success: true,
            data:`User not found with the id ${id}`
        });
    };

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
}

// @desc     Get User Profile
// @route    POST /api/users/:id
// @access   public
export const getUserProfile = async (req, res, next) => {
    
    const user = await User.findById(req.params.id)
                            .populate('posts')
                            .populate('following')
                            .populate('followers');

    const posts = await Post.find({user: user._id});

    if(!user){
        return res.status(404).json({
            success: true,
            data:`User not found with the id ${id}`
        });
    };

    res.status(200).json({
        success: true,
        posts: posts,
        data: user
    });
};
