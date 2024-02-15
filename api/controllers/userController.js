const bcrypt = require('bcrypt')

const User = require('../models/User')
const Token = require('../models/Token')

async function register (req, res) {
    const data = req.body;
    try{
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
        data['password'] = await bcrypt.hash(data.password, salt)
        const result = await User.create(data)
        res.status(201).send(result)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
};

async function login (req, res) {
    const data = req.body;
    try{
        const user = await User.getOneByUsername(data.username)
        const authenticated = bcrypt.compare(data.password, user.password)
        if(!authenticated){
            throw new Error("Incorrect details")
        }else{
            const token = await Token.create(user['account_id'])
            res.status(200).json({authenticated: true, token: token.token})
        }
    } catch(e) {
        res.status(401).json({error: e.message})
    }
}

async function getAccountByToken (req, res) {
    const data = req.params.token
    try{
        const token = await Token.getOneByToken(data)
        const user = await Token.getAccountByToken(token)
        res.status(200).json(user)
    } catch(e) {
        res.status(404).json({error: e.message})
    }
}

module.exports = { register, login, getAccountByToken }