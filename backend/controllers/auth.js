import User from '../models/User.js';

// @desc     Regitster User
// @route    POST /api/auth/register
// @access   Public
export const register = async (req, res, next) => {
    const { userName, email, password, fullName} = req.body;

    const user = await User.create({
        userName, email, password, fullName
    });

    sendTokenResponse(user, 200, res);
};


// @desc     Login User
// @route    POST /api/auth/login
// @access   Public
export const login = async (req, res, next) => {
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(401).json({
            success: false,
            data: 'Please provide an email and password'
        });
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({
            success: false,
            data: 'Invalid Credentials'
        });
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({
            success: false,
            data: 'Invalid Credentials'
        });
    }

    sendTokenResponse(user, 200, res);

}


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    let options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        });
};


// @desc     Get Currently logged in user
// @route    POST /api/auth/getme
// @access   private
export const getMe = async (req, res, next) => {
    
    const user = await User.findById(req.user.id).populate({
        path: 'following',
        select: 'userName email'
    });
    
    res.status(200).json({
        success: true,
        data: user
    });
};