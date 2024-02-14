const Post = require('../../../models/Post')
const db = require('../../../database/connect')

describe("Post", () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("create", () => {
        it("Adds a new entry to the post table", async () => {
            let postData = { account_id: 1, category: "test", title: "test", content: "test" }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...postData, post_id: 1 }] })

            const result = await Post.create(postData)

            expect(result).toBeTruthy()
            expect(result).toHaveProperty('post_id')
            expect(result).toHaveProperty('title')
            expect(result).toHaveProperty('content')
        })

        it("Errors out if there's data missing", async () => {
            try {
                await Post.create({})
              } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('Data is missing.')
              }
        })
    })

    describe("getAllPosts", () => {
        it("Returns all posts in the database", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ title: 't1', content: 'c1' }, { title: 't2', content: 'c2' }, { title: 't3', content: 'c3' }]})
            const posts = await Post.getAllPosts()
            expect(posts).toHaveLength(3)
            expect(posts[0]).toHaveProperty('post_id')
            expect(posts[1].content).toBe('c2')
        })

        it("Errors out if there aren't any posts", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Post.getAllPosts()
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No posts found.')
            }
        })
    })

    describe("getPostByContent", () => {
        it("Returns all posts relevant to the search query", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ category: 'animal', title: 'cat', content: 'dog' }, { category: 'tree', title: 'elm', content: 'oak' }]})
            const posts = await Post.getPostByContent("a")
            expect(posts).toHaveLength(2)
        })
        it("Errors out if there aren't any posts", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Post.getPostByContent("a")
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No posts found matching your search.')
            }
        })
    })

    describe("getPostByCategory", () => {
        it("Returns all posts with the relevant category", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ category: 'animal', title: 'cat', content: 'dog' }]})
            const posts = await Post.getPostByCategory("animal")
            expect(posts).toHaveLength(1)
        })
        it("Errors out if there aren't any posts", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Post.getPostByCategory("animal")
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No posts found matching this category.')
            }
        })
    })

    describe("getPostById", () => {
        it("Returns the post with the matching ID", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [{ post_id: 1, category: 'animal', title: 'cat', content: 'dog' }]})
            const post = await Post.getPostById(1)
            expect(post).toHaveProperty('post_id')
        })
        it("Errors out if there aren't any posts", async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})
            try {
                await Post.getPostById(1)
            } catch (error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe('No post found with that ID.')
            }
        })
    })

    describe("updatePost", () => {
        it("Updates a post with new data", async () => {
            const post = new Post({ category: 'dog', title: 'bark', content: 'woof' })
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ post_id: 1, category: 'test', title: 'test', content: 'test' }] })

            const result = await post.updatePost({ category: 'test', title: 'test', content: 'test' })

            expect(result).toBeInstanceOf(Post)
            expect(result.post_id).toBe(1)
            expect(result.title).toBe('test')
            expect(result).not.toEqual(post)
        })
        it('Errors out if update data is missing', async () => {
            try {
              const post = new Post({ category: 'test', title: 'test', content: 'test' })
              await post.updatePost({ title: 'test' });
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toBe('Data is missing.')
            }
        })
    })
    describe ('deletePostById', () => {
        it('Returns the deleted post', async () => {
          const post = new Post({})
          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ post_id: 1, category: 'test', title: 'test', content: 'test' }] })
    
          const result = await post.deletePostById(1)

          expect(result).toBeInstanceOf(Post)
          expect(result.post_id).toBe(1)
          expect(result).not.toEqual(post)
        })
    
        it('Errors out if deletion is unsuccessful', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
          try {
            const post = new Post({category: 'test', title: 'test', content: 'test' })
            await post.deletePostById(1)
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toContain('Could not delete post.')
          }
        })
    })
})