const db = require('../database/connect.js')

class Reply {
    constructor({ reply_id, post_id, account_id, content, date_posted, author_username }) {
        this.reply_id = reply_id
        this.post_id = post_id
        this.account_id = account_id
        this.content = content
        this.date_posted = date_posted
        this.author_username = author_username
    }

    static async create(post, data){
        const post_id = post
        const { account_id, content } = data
        if(!account_id || !content){
            throw new Error("Data is missing.")
        }
        const response = await db.query("INSERT INTO reply (post_id, account_id, content, date_posted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;", [post_id, account_id, content])
        return new Reply(response.rows[0])
    }

    static async getRepliesByPostId(data){
        const post_id = data
        const response = await db.query("SELECT reply.*, account.username AS author_username FROM reply INNER JOIN account ON reply.account_id = account.account_id WHERE post_id = $1", [post_id])
        if(response.rows.length === 0){
            throw new Error("No replies found on this post.")
        }
        return response.rows.map(r => new Reply(r))
    }

    static async getReplyById(data){
        const id = data
        const response = await db.query("SELECT reply.*, account.username AS author_username FROM reply INNER JOIN account ON reply.account_id = account.account_id WHERE reply_id = $1", [id])
        if(response.rows.length === 0){
            throw new Error("No reply found with this ID.")
        }
        return new Reply(response.rows[0])
    }

    async updateReply(data){
        const content = data
        if(!content){
            throw new Error("Data is missing.")
        }
        const response = await db.query("UPDATE reply SET content = $1 WHERE reply_id = $2 RETURNING *;",[content, this.reply_id])
        return new Reply(response.rows[0])
    }

    async deleteReplyById(){
        try {
            const response = await db.query("DELETE FROM reply WHERE reply_id = $1 RETURNING *;", [this.reply_id])
            return new Reply(response.rows[0])
        } catch (error) {
            throw new Error("Could not delete reply.")
        }
    }
}

module.exports = Reply