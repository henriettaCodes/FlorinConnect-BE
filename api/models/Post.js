const db = require('../database/connect.js')

class Post {
    constructor({ post_id, account_id, category, title, content, date_posted }) {
        this.post_id = post_id
        this.account_id = account_id
        this.category = category
        this.title = title
        this.content = content
        this.date_posted = date_posted
    }

    static async getPostByContent(data) {
        const searchString = data;
        await db.query("SELECT * from post WHERE content LIKE '%$1%' OR title LIKE '%$1%';", searchString)
        if(response.rows.length === 0){
            throw new Error("No posts found matching your search.")
        }
        return response.rows.map(p => new Post(p))
    }
}