const Post = require('../models/Post')

async function searchPostsByContent(req, res){
    const data = req.params.search
    try{
        const response = await Post.getPostByContent(data)
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

module.exports = { searchPostsByContent, searchPostsByCategory }