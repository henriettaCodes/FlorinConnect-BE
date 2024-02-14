const User = require('../../../models/User')
const db = require('../../../database/connect')

describe("User", () => {
    describe("getOneById", () => {
        it("Returns the user with the matching ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ account_id: 1, username: 'test', password: 'test' }]})
            const account = await User.getOneById(1)
            expect(account).toHaveProperty('account_id')
        })
        it("Errors out if there aren't any users", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await User.getOneById(1)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Unable to locate user.')
            }
        })
    })
    describe("getOneByUsername", () => {
        it("Returns the user with the matching username", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ account_id: 1, username: 'test', password: 'test' }]})
            const account = await User.getOneByUsername('test')
            expect(account).toHaveProperty('account_id')
        })
        it("Errors out if there aren't any users", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await User.getOneByUsername('test')
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Unable to locate user.')
            }
        })
    })
    describe("create", () => {
        it("Adds a new entry to the user table", async () => {
            let userData = { username: 'a', password: 'test', isAdmin: true }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...userData, account_id: 1 }] })

            const result = await User.create(userData)

            expect(result).toBeTruthy()
            expect(result).toHaveProperty('account_id')
            expect(result).toHaveProperty('username')
            expect(result).toHaveProperty('password')
        })

        it("Errors out if there's data missing", async () => {
            try {
                await User.create({})
              } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Data is missing.')
              }
        })
    })
})