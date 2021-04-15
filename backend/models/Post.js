import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    image: {
        type: String,
        // required: [true, 'please add a title']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Like'
    },
    comments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    }
},
{
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema);
export default Post;