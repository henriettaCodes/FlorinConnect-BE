const replyController = require('../../../controllers/replyController')
const Reply = require('../../../models/Reply')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("replyController", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())
    describe("create", () => {
        it("Returns the creation data", async () => {
            const testReply = { content: 'test' }
            const mockReq = { params: {id: 1}, body: testReply }

            jest.spyOn(Reply, 'create').mockResolvedValue(new Reply(testReply))

            await replyController.create(mockReq, mockRes)
      
            expect(Reply.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(new Reply({ ...testReply }))
        })
        it('Returns an error', async () => {
            const testReply = { content: 'test' }
            const mockReq = { params: {id: 1}, body: testReply }
      
            jest.spyOn(Reply, 'create').mockRejectedValue(new Error('Creation failed.'))
      
            await replyController.create(mockReq, mockRes)
            
            expect(Reply.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Creation failed.' })
        })
    })

    describe("getRepliesByPostId", () => {
        it("Returns all replies", async () => {
            const mockReq = { params: {id: 1}}

            jest.spyOn(Reply, 'getRepliesByPostId').mockResolvedValue(new Reply({account_id: 1, content: 'test'}))

            await replyController.getRepliesByPostId(mockReq, mockRes)

            expect(Reply.getRepliesByPostId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(new Reply({account_id: 1, content: 'test'}))
        })
        it('Returns an error', async () => {
            const mockReq = { params: {id: 1}}
      
            jest.spyOn(Reply, 'getRepliesByPostId').mockRejectedValue(new Error('Replies not found.'))
      
            await replyController.getRepliesByPostId(mockReq, mockRes)
            
            expect(Reply.getRepliesByPostId).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Replies not found.' })
        })
    })

    describe("getReplyById", () => {
        it("Returns a reply", async () => {
            const mockReq = { params: {id: 1}}

            jest.spyOn(Reply, 'getReplyById').mockResolvedValue(new Reply({account_id: 1, content: 'test'}))

            await replyController.getReplyById(mockReq, mockRes)

            expect(Reply.getReplyById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(new Reply({account_id: 1, content: 'test'}))
        })
        it('Returns an error', async () => {
            const mockReq = { params: {id: 1}}
      
            jest.spyOn(Reply, 'getReplyById').mockRejectedValue(new Error('Reply not found.'))
      
            await replyController.getReplyById(mockReq, mockRes)
            
            expect(Reply.getReplyById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Reply not found.' })
        })
    })

    describe("updateReplyById", () => {
        it('Modifies an entry', async () => {
            const testReply = { content: 'test' }
            jest.spyOn(Reply, 'getReplyById').mockResolvedValue(new Reply(testReply))
      
            const mockReq = { params: { id: 1 }, body: {content: 'test'} }
      
            jest.spyOn(Reply.prototype, 'updateReply').mockResolvedValue({ ...new Reply(testReply), content: 'test' })
      
            await replyController.updateReplyById(mockReq, mockRes)
      
      
            expect(Reply.getReplyById).toHaveBeenCalledTimes(1)
            expect(Reply.prototype.updateReply).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({ ...new Reply(testReply), content: 'test' })
        })
    })

    describe('destroy', () => {
        it('Returns destroyed entry', async () => {
            const testReply = { reply_id: 1, account_id: 1, content: 'test' }

            jest.spyOn(Reply, 'getReplyById').mockResolvedValue(new Reply(testReply))
      
            jest.spyOn(Reply.prototype, 'deleteReplyById').mockResolvedValue(new Reply(testReply))
      
            const mockReq = { params: { id: 1 } }
            
            await replyController.deleteReplyById(mockReq, mockRes)
      
            expect(Reply.getReplyById).toHaveBeenCalledTimes(1)
            expect(Reply.prototype.deleteReplyById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockJson).toHaveBeenCalledWith(new Reply(testReply))
        })
    })
})