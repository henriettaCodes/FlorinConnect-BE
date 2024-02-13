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

    static async create(data){
        const {post_id, account_id, content} = data
        const response = db.query("INSERT INTO TABLE reply (post_id, account_id, content, date_posted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *;", [post_id, account_id, content])
        return new Reply(response.rows[0])
    }
}