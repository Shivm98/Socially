import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add some text to comment']
    },
    user: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    post: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
        required: true
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;