import express from "express"   
import User from "../models/user.model.js";
import Post from "../models/posts.model.js";

const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "RUNNING"});
}

const createPost = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ token: token });
        
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : ""
        });

        await post.save();

        return res.status(201).json({ message: "Post created successfully"});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export {
    activeCheck,
    createPost
}