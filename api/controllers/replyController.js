const Reply = require('../models/Reply')

async function create(req, res){
    const post = req.params.id
    const data = req.body
    try {
        const response = await Reply.create(post, data)
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    
}

async function getRepliesByPostId(req, res){
    const post = req.params.id
    try {
        const response = await Reply.getRepliesByPostId(post)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function getReplyById(req, res){
    const id = req.params.id
    try {
        const response = await Reply.getReplyById(id)
        res.status(200).json(response)
    } catch (e) {
        res.status(404).json({error: e.message})
    }
}

async function deleteReplyById(req, res){
    const reply_id = req.params.id
    try{
        const reply = await Reply.getReplyById(reply_id)
        const response = await reply.deleteReplyById()
        res.status(200).json(response)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

module.exports = { create, getRepliesByPostId, getReplyById, deleteReplyById }