import User from "../models/User";
import logEvents from '../helpers/logEvents';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});
            const results = users.map(item =>{
                const {password, ...others} = item['_doc']
                return others;
            })
            res.status(200).json(results);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json("User does'n exits!");
            }
            const user = await User.findById(id);
            const {password, ...info} = user['_doc']
            res.status(200).json(info);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json("User does'n exits!");
            }
            await User.findByIdAndDelete(id);
            res.status(200).json("Deleted user successfully!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json("User does'n exits!");
            }
            const user = await User.findById(id);
            let hashed;
            if(req.body.password ) {
                const salt = await bcrypt.genSalt(10);
                hashed = await bcrypt.hash(req.body.password, salt);
            }
            const updateUser = await User.findByIdAndUpdate(id, {
                username: req.body.username ? req.body.username : user.username,
                password: req.body.password ? hashed : user.password,
                avatar: req.body.avatar ? req.body.avatar : user.avatar,
            }, {new: true});

            const {password, ...others} = updateUser['_doc'];
            return res.status(200).json(others);
        }
        catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    }
    
}

export default userController;