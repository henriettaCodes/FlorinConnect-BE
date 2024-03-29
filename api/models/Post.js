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

    static async create(data){
        const { account_id, category, title, content } = data
        if(!account_id || !category || !title || !content){
            throw new Error("Data is missing.")
        }
        const response = await db.query("INSERT INTO post (account_id, category, title, content, date_posted) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;",[account_id, category, title, content])
        if(response)
        return new Post(response.rows[0])
    }

    static async getAllPosts() {
        const response = await db.query("SELECT post.*, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id")
        if(response.rows.length === 0){
            throw new Error("No posts found.")
        }
        return response.rows.map(p => new Post(p))
    }

    static async getPostByContent(data) {
        const searchString = data
        const response = await db.query("SELECT post.*, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE LOWER(post.content) LIKE LOWER('%' || $1 || '%') OR LOWER(post.title) LIKE LOWER('%' || $1 || '%');", [searchString])
        if(response.rows.length === 0){
            throw new Error("No posts found matching your search.")
        }
        return response.rows.map(p => new Post(p))
    }

    static async getPostByCategory(data) {
        const category = data
        const response = await db.query("SELECT post.*, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE LOWER(category) = LOWER($1);", [category])
        if(response.rows.length === 0){
            throw new Error("No posts found matching this category.")
        }
        return response.rows.map(p => new Post(p))
    }

    static async getPostById(data) {
        const id = data
        const response = await db.query("SELECT post.*, account.username AS author_username FROM post INNER JOIN account ON post.account_id = account.account_id WHERE post_id = $1;", [id])
        if(response.rows.length === 0){
            throw new Error("No post found with that ID.")
        }
        return new Post(response.rows[0])
    }

    async updatePost(data){
        const { category, title, content } = data
        if(!category || !title || !content){
            throw new Error("Data is missing.")
        }
        const response = await db.query("UPDATE post SET category = $1, title = $2, content = $3 WHERE post_id = $4 RETURNING *;",[category, title, content, this.post_id])
        return new Post(response.rows[0])
    }

    async deletePostById(){
        try {
            const response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.post_id])
            if(response.rows.length === 0){
                throw new Error("Could not find post to delete.")
            }
            return new Post(response.rows[0])
        } catch (e) {
            throw new Error("Could not delete post.")
        }
    }
}

module.exports = Post