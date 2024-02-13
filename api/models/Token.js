const { v4: uuidv4 } = require("uuid");

const db = require("../database/connect");
const User = require("./User")

class Token {

    constructor({ token_id, account_id, token }){
        this.token_id = token_id;
        this.account_id = account_id;
        this.token = token;
    }

    static async create(account_id) {
        const token = uuidv4()
        const response = await db.query("INSERT INTO token (account_id, token) VALUES ($1, $2) RETURNING token_id;", [account_id, token])
        const newId = response.rows[0].token_id
        const newToken = await Token.getOneById(newId)
        return newToken
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM token WHERE token_id = $1", [id]);
        if (response.rows.length != 1) {
            return new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [token]);
        if (response.rows.length != 1) {
            return new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getAccountByToken(token) {
        const response = await db.query("SELECT username, account_id, is_admin FROM account WHERE account_id = $1", [token.account_id])
        if (response.rows.length != 1){
            throw new Error("Unable to locate username.")
        }else{
            return new User(response.rows[0])
        }
    }
}

module.exports = Token;