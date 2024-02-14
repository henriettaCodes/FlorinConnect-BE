const Reply = require('../../../models/Reply')
const db = require('../../../database/connect')

describe("Reply", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("create", () => {
        it("Adds a new entry to the reply table", async () => {
            let replyData = { account_id: 1, post_id: 1, content: "test", }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...replyData, reply_id: 1 }] })

            const result = await Reply.create(1, replyData)

            expect(result).toBeTruthy()
            expect(result).toHaveProperty('post_id')
            expect(result).toHaveProperty('reply_id')
            expect(result).toHaveProperty('content')
        })

        it("Errors out if there's data missing", async () => {
            try {
                await Reply.create(1, {})
              } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Data is missing.')
              }
        })
    })

    describe("getRepliesByPostId", () => {
        it("Returns all replies connected to a given post", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ reply_id: 1, post_id: 1, content: 'test' }]})
            const replies = await Reply.getRepliesByPostId(1)
            expect(replies).toHaveLength(1)
        })
        it("Errors out if there aren't any replies", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Reply.getRepliesByPostId(1)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No replies found on this post.')
            }
        })
    })

    describe("getReplyById", () => {
        it("Returns the reply with the matching ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ reply_id: 1, post_id: 1, account_id: 1, content: 'test' }]})
            const reply = await Reply.getReplyById(1)
            expect(reply).toHaveProperty('reply_id')
        })
        it("Errors out if there isn't a reply with a given ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Reply.getReplyById(1)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No reply found with this ID.')
            }
        })
    })

    describe("updateReply", () => {
        it("Updates a reply with new data", async () => {
            const reply = new Reply({ post_id: 1, account_id: 1, content: 'test' })
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ reply_id: 1, post_id: 1, account_id: 1, content: 'test' }] })

            const result = await reply.updateReply({ category: 'test', title: 'test', content: 'test' })

            expect(result).toBeInstanceOf(Reply)
            expect(result.reply_id).toBe(1)
            expect(result.content).toBe('test')
            expect(result).not.toEqual(reply)
        })
        it('Errors out if update data is missing', async () => {
            try {
              jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ reply_id: 1, post_id: 1, account_id: 1, content: 'test' }] })
              const reply = new Reply({ post_id: 1, account_id: 1, content: 'test' })
              await reply.updateReply({});
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toBe('Data is missing.')
            }
        })
    })

    describe ('deleteReplyById', () => {
        it('Returns the deleted reply', async () => {
          const reply = new Reply({})
          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ reply_id: 1, post_id: 1, account_id: 1, content: 'test' }] })
    
          const result = await reply.deleteReplyById(1)

          expect(result).toBeInstanceOf(Reply)
          expect(result.reply_id).toBe(1)
          expect(result).not.toEqual(reply)
        })
    
        it('Errors out if deletion is unsuccessful', async () => {
            jest.spyOn(db, 'query').mockRejectedValue()
            try {
              const reply = new Reply({category: 'test', title: 'test', content: 'test' })
              await reply.deleteReplyById(1)
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toContain('Could not delete reply.')
            }
          })
    })
})