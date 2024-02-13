const Post = require('../models/Post')

async function searchPosts(req, res){
    const data = req.params.search
    try{
        const response = await Post.getPostByContent(data)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

module.exports = { searchPosts }