const Token = require('../../../models/Token')
const db = require('../../../database/connect')

describe("Token", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("create", () => {
        it("Adds a new entry to the token table", async () => {
            let tokenData = { account_id: 1, token: 'test' }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...tokenData, token_id: 1 }] })

            const result = await Token.create(tokenData)

            expect(result).toBeTruthy()
            expect(result).toHaveProperty('token_id')
            expect(result).toHaveProperty('token')
            expect(result).toHaveProperty('account_id')
        })
        it("Errors out if there's data missing", async () => {
            try {
                await Token.create(null)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Data is missing.')
            }
        })
    })
})