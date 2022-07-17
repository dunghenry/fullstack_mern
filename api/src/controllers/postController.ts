import Post from '../models/Post';
import logEvents from '../helpers/logEvents';
const postController = {
    createPost: async (req, res) => {
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description ")
        try {
            if (req.user.userId) {
                const post = await Post.findOne({ title: req.body.title, userId: req.user.userId });
                if (post) return res.status(400).json('Title already exist!!');
                const newPost = new Post({
                    title: req.body.title,
                    description: req.body.description,
                    userId: req.user.userId
                });
                await newPost.save();
                return res.status(200).json(newPost);
            }
            else {
                return res.status(403).json("You're not allowed to do that!");
            }

        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getPost: async (req, res) => {
        try {
            if (req.user.userId || req.user.isAdmin) {
                const singlePost = await Post.findOne({ _id: req.params.id }).populate('userId', ['username']);
                if (!singlePost) return res.status(404).json("Post not found!");
                return res.status(200).json(singlePost);
            }
            else {
                return res.status(403).json("You're not allowed to do that!");
            }

        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getPostsAuth: async (req, res) => {
        try {
            if (req?.user?.userId) {
                const posts = await Post.find({ userId: req.user.userId }).populate('userId', ['username']);
                if (!posts) return res.status(404).json("Posts not found!!");
                return res.status(200).json(posts);
            }
            else {
                return res.status(403).json("You're not allowed to do that!");
            }

        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getAllPosts: async (req, res) => {
        try {
            if (req.user.isAdmin) {
                const posts = await Post.find({}).populate('userId', ['username']);
                if (!posts) return res.status(404).json("Posts not found!!!");
                return res.status(200).json(posts);
            }
            else {
                return res.status(403).json("You're not allowed to do that!");
            }
        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    updatePostAuth: async (req, res) => {
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description ")
        try {
            const post = await Post.findById({ _id: req.params.id })
            if (req.user.userId === post.userId || req.user.isAdmin) {
                const updatePost = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}).populate('userId', ['username']);
                return res.status(200).json(updatePost);
            }
            else {
                return res.status(403).json("You're not allowed to do that!");
            }

        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    deletePostAuth: async (req, res) => {
        try {
            const deletePost = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
            if (!deletePost) return res.status(401).json("Post not found or user not authorised");
            return res.status(200).json("Deleted post successfully");
        } catch (error) {
            logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    }
}

export default postController;