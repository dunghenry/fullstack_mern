import mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface IPost {
    title: string
    description: string,
    userId: typeof mongoose.Types.ObjectId
}
const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})
const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;