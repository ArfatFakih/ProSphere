import express from "express"   

const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "RUNNING"});
}

export {
    activeCheck
}