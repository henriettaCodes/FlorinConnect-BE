const postController = require('../../../controllers/postController')
const Post = require('../../../models/Post')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe("postController", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("create", () => {
        it("Returns the creation data", async () => {
            const testPost = { account_id: 1, category: 'test', title: 'test', content: 'test' }
            const mockReq = { body: testPost }

            jest.spyOn(Post, 'create').mockResolvedValue(new Post(testPost))

            await postController.create(mockReq, mockRes)
      
            expect(Post.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(new Post({ ...testPost }))
        })
        it('Returns an error', async () => {
            const testPost = { account_id: 1, category: 'test', title: 'test', content: 'test' }
            const mockReq = { body: testPost }
      
            jest.spyOn(Post, 'create').mockRejectedValue(new Error('Creation failed.'))
      
            await postController.create(mockReq, mockRes)
            
            expect(Post.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Creation failed.' })
        })
    })

    describe("getAllPosts", () => {
        it("Returns all posts", async () => {
            const posts = ['post 1', 'post 2']

            jest.spyOn(Post, 'getAllPosts').mockResolvedValue(posts)

            await postController.getAllPosts(null, mockRes)
      
            expect(Post.getAllPosts).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(posts)
        })

        it("Returns an error", async () => {
            jest.spyOn(Post, 'getAllPosts').mockRejectedValue(new Error('Failed to get posts.'))

            await postController.getAllPosts(null, mockRes)
      
            expect(Post.getAllPosts).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get posts.'})
        })
    })

    describe("searchPostsByContent", () => {
        it("Returns relevant posts", async () => {
            const posts = [{content: 'test'}, {content: 'test'}]
            const mockReq = {params: 'test'}

            jest.spyOn(Post, 'getPostByContent').mockResolvedValue(posts)

            await postController.searchPostsByContent(mockReq, mockRes)

            expect(Post.getPostByContent).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(posts)
        })

        it("Throws an error", async () => {
            const mockReq = {params: 'test'}
            jest.spyOn(Post, 'getPostByContent').mockRejectedValue(new Error("Failed to get posts."))
            
            await postController.searchPostsByContent(mockReq, mockRes)

            expect(Post.getPostByContent).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get posts.'})
        })
    })

    describe("searchPostsById", () => {
        it("Returns relevant posts", async () => {
            const post = [{post_id: 1}]
            const mockReq = {params: 1}

            jest.spyOn(Post, 'getPostById').mockResolvedValue(post)

            await postController.getPostById(mockReq, mockRes)

            expect(Post.getPostById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(post)
        })

        it("Throws an error", async () => {
            const mockReq = {params: 1}
            jest.spyOn(Post, 'getPostById').mockRejectedValue(new Error("Failed to get posts."))
            
            await postController.getPostById(mockReq, mockRes)

            expect(Post.getPostById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({error: 'Failed to get posts.'})
        })
    })

    describe ('update', () => {
        it('Modifies an entry', async () => {
          const testPost = { account_id: 1, category: 'test', title: 'test', content: 'test' }
          jest.spyOn(Post, 'getPostById').mockResolvedValue(new Post(testPost))
    
          const mockReq = { params: { id: 1 }, body: { category: 'test', title: 'test', content: 'test' } }
    
          jest.spyOn(Post.prototype, 'updatePost').mockResolvedValue({ ...new Post(testPost), category: 'test', title: 'test', content: 'test' })
    
          await postController.updatePostById(mockReq, mockRes)
    
    
          expect(Post.getPostById).toHaveBeenCalledTimes(1)
          expect(Post.prototype.updatePost).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
          expect(mockJson).toHaveBeenCalledWith({ ...new Post(testPost), category: 'test', title: 'test', content: 'test' })
        })
    })

    describe('destroy', () => {
        it('Returns destroyed entry', async () => {
            const testPost = { post_id: 1, account_id: 1, category: 'test', title: 'test', content: 'test' }
            jest.spyOn(Post, 'getPostById')
              .mockResolvedValue(new Post(testPost))
      
            jest.spyOn(Post.prototype, 'deletePostById')
              .mockResolvedValue(new Post(testPost))
      
            const mockReq = { params: { id: 1 } }
            
            await postController.deletePostById(mockReq, mockRes)
      
            expect(Post.getPostById).toHaveBeenCalledTimes(1)
            expect(Post.prototype.deletePostById).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockJson).toHaveBeenCalledWith(new Post(testPost))
          })
    })
})