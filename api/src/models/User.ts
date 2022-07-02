import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export interface IUser{
    username: string;
    password: string;
    avatar?: string;
    isAdmin: boolean;
}
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,

    }
}, {
    timestamps: true
})  
const User = mongoose.model<IUser>('User', userSchema);
export default User;