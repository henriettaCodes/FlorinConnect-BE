const userController = require('../../../controllers/userController')
const User = require('../../../models/User')
const Token = require('../../../models/Token')
const bcrypt = require('bcrypt')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("userController", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("register", () => {
        it("Returns the creation data", async () => {
            const testUser = { username: 'test', password: 'test' }
            const mockReq = { body: testUser }
            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('test')
            jest.spyOn(User, 'create').mockResolvedValueOnce(new User(testUser))

            await userController.register(mockReq, mockRes)
      
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockSend).toHaveBeenCalledWith(new User(testUser))
        })
        it("Throws an error", async () => {
            const testUser = { username: 'test', password: 'test' }
            const mockReq = { body: testUser }
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('test')
            jest.spyOn(User, 'create').mockRejectedValue(new Error("Could not create user."))

            await userController.register(mockReq, mockRes)
      
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Could not create user."})
        })
    })

    describe("login", () => {
        it("Logs the user in if data matches", async () => {
            const testUser = {username: 'test', password: 'test'}
            const mockReq = { body: testUser }
            jest.spyOn(User, 'getOneByUsername').mockResolvedValueOnce({username: 'test', password: 'test'})
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)
            jest.spyOn(Token, 'create').mockResolvedValueOnce({})
            await userController.login(mockReq, mockRes)

            expect(User.getOneByUsername).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({authenticated: true})
        })
        it("Throws an error", async () => {
            const testUser = { username: 'test', password: 'test' }
            const mockReq = { body: testUser }
            jest.spyOn(User, 'getOneByUsername').mockResolvedValueOnce({username: 'test', password: 'test'})
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

            await userController.register(mockReq, mockRes)
      
            expect(User.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({error: "Could not create user."})
        })
    })

    describe("getAccountByToken", () => {
        it("Returns account", async () => {
            const testToken = 'test'
            const mockReq = { params: {token: testToken}}
            jest.spyOn(Token, 'getOneByToken').mockResolvedValue({token: 'test'})
            jest.spyOn(Token, 'getAccountByToken').mockResolvedValue({account_id: 1})

            await userController.getAccountByToken(mockReq, mockRes)

            expect(Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(Token.getAccountByToken).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({account_id: 1})
        })
        it("Throws an error", async () => {
            const testToken = 'test'
            const mockReq = { params: {token: testToken}}
            jest.spyOn(Token, 'getOneByToken').mockRejectedValue(new Error("Token not recognized"))

            await userController.getAccountByToken(mockReq, mockRes)
      
            expect(Token.getOneByToken).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: "Token not recognized"})
        })
    })
})