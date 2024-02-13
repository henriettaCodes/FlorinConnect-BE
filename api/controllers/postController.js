const Post = require('../models/Post')

async function getAllPosts(req, res){
    try {
        const response = await Post.getAllPosts()
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}
async function searchPostsByContent(req, res){
    const searchString = req.params.search
    try{
        const response = await Post.getPostByContent(searchString)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function searchPostsByCategory(req, res){
    const data = req.params.category
    try {
        const response = await Post.getPostByCategory(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getPostById(req, res){
    const data = req.params.id
    try {
        const response = await Post.getPostById(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})       
    }
}

module.exports = { getAllPosts, searchPostsByContent, searchPostsByCategory, getPostById }