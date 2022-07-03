import User from "../models/User";
import logEvents from '../helpers/logEvents';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
let refreshTokens = [];
const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' })
    },
    generateRefreshToken: (user) => {
        return jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })
    },
    regsiter: async (req, res) => {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json("User name or password is required.")
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                password: hashed
            });
            const savedUser = await user.save();
            const { password, ...others } = savedUser['_doc']
            return res.status(200).json(others);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    login: async (req, res) => {
        if (!req.body.username || !req.body.password) return res.status(400).json("Missing username or password");
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json('User is incorrect!');
            const passwordValid = await bcrypt.compare(req.body.password, user.password);
            if (!passwordValid) return res.status(400).json("Invalid password");
            if (user && passwordValid) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                // console.log(refreshTokens);
                //save refreshToken to cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                //Add refreshToken from db
                
                const { password, ...info } = user['_doc'];
                return res.status(200).json({ ...info, accessToken })
            }

        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    requestRefreshToken: async (req, res) => {
        try {
            //Get refreshToken from cookies
            const refreshToken = req.cookies?.refreshToken;
            // console.log(refreshToken)
            
            if (!refreshToken) return res.status(401).json("You're not authenticated");

            //Check refreshToken from db
            if (!refreshTokens.includes(refreshToken)) {
                return res.status(403).json("Refresh token is not valid");
            }

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (error, user) => {
                    if (error?.name === "TokenExpiredError") {
                        return res.status(403).json("Token is expired!");
                    } else if (error) {
                        return res.status(403).json("Token is not valid!");
                    }
                    //Remove used refreshToken
                    refreshTokens = refreshTokens.filter(token => token !== refreshToken);

                    //Generate accessToken new and refreshToken new
                    const newAccessToken = authController.generateAccessToken(user);
                    const newRefreshToken = authController.generateRefreshToken(user);

                    //Save refreshToken new from db
                    refreshTokens.push(newRefreshToken);

                    //Add refreshToken from cookie
                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict"
                    })
                    return res.status(201).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
                }
            );
        } catch (error) {
            console.log(error);
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
            return res.status(200).json("Logged out successfully");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },

}

export default authController;