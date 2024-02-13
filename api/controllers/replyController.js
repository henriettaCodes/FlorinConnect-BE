const Reply = require('../models/Reply')

async function create(req, res){
    const post = req.params.id
    const data = req.body
    try {
        const reply = await Reply.create(post, data)
        res.status(200).json(reply)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
    
}

module.exports = { create }