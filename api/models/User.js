const db = require('../database/connect');

class User {

    constructor({ account_id, username, password, is_admin }) {
        this.account_id = account_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM account WHERE account_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {
        const { username, password, isAdmin } = data;
        const availabilityCheck = await db.query("SELECT * FROM account WHERE username = $1", [username])
        if(availabilityCheck.rows.length != 0){
            throw new Error("Username already taken.")
        }
        let response = await db.query("INSERT INTO account (username, password, isAdmin) VALUES ($1, $2, $3) RETURNING *;",
            [username, password, isAdmin]);
        const newId = response.rows[0].account_id;
        const newUser = await User.getOneById(newId);
        return newUser;
    }
}

module.exports = User;