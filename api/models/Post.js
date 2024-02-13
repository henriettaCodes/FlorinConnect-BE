const db = require('../database/connect.js')

class Post {
    constructor({ post_id, account_id, category, title, content, date_posted, author_username }) {
        this.post_id = post_id
        this.account_id = account_id
        this.category = category
        this.title = title
        this.content = content
        this.date_posted = date_posted
        this.author_username = author_username
    }

    static async getPostByContent(data) {
        const searchString = data
        const response = await db.query("SELECT post.post_id, post.category, post.title, post.content, post.date_posted, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE post.content LIKE '%' || $1 || '%' OR post.title LIKE '%' || $1 || '%';", [searchString])
        if(response.rows.length === 0){
            throw new Error("No posts found matching your search.")
        }
        return response.rows.map(p => new Post(p))
    }

    static async getPostByCategory(data) {
        const category = data
        const response = await db.query("SELECT post.post_id, post.category, post.title, post.content, post.date_posted, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE category = $1;", [category])
        if(response.rows.length === 0){
            throw new Error("No posts found matching this category.")
        }
        return response.rows.map(p => new Post(p))
    }

    static async getPostById(data) {
        const id = data
        const response = await db.query("SELECT post.post_id, post.category, post.title, post.content, post.date_posted, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE post_id = $1;", [id])
        return new Post(response.rows[0])
    }
}

module.exports = Post