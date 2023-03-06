import axios, { AxiosInstance, AxiosResponse, AxiosError} from 'axios'

function httpResponseHandler(response: AxiosResponse) {
  if (response.data) {
    return Promise.resolve(response.data)
  }
  return Promise.resolve(false)
}

function httpErrorHandler(error: AxiosError) {
  console.log(error.code)
  // TODO: handle the errors
}

interface Comment {
  date: Date
  text: string
  username: string
}

export interface Post {
  tags: Array<string>
  comments: Array<Comment>
  author: string
  content: string
  title: string
  date: Date
}

export interface DB {
  getBlogPost(id: number): Promise<Post>
  createComment(id: number, body: object): Promise<any>
}

class CommentPost implements Comment {
  date: Date = new Date()
  text: string = ''
  username: string = ''
  
  constructor(data: any) {
    if(data) {
      this.date = new Date(data.date)
      this.text = data.text
      this.username = data.username
    }
  }
}

class PostBlog implements Post {
  tags: Array<string> = []
  comments: Array<Comment> = []
  author: string = ''
  content: string = ''
  title: string = ''
  date: Date = new Date()

  constructor(data: any) {
    if(data) {
      this.tags = data.tags
      this.author = data.author
      this.content = data.content
      this.date = new Date(data.date)
      this.title = data.title
      for(let comment of data.comments) {
        this.comments.push(new CommentPost(comment))
      }
    }
  }
}

class DataBase implements DB {
  api: AxiosInstance
  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL: baseURL,
      responseType: "json",
    })

    this.api.interceptors.response.use(
      res => httpResponseHandler(res),
      err => httpErrorHandler(err)
    )

    this.api.interceptors.request.use(request => {
      request.params = request.params
      return request
    })

  }
  
  async getBlogPost(id: number) {
    const res = await this.api.get('/posts/' + id)
    if(res) {
      return new PostBlog(res)
    }
    return res as Post
  }

  createComment(id: number, body: object) {
    return this.api.post(`/posts/${id}/comment`, body)
  }
}

export default {
	install(app: any) {
    const db = new DataBase('https://stoplight.io/mocks/diginext-interview/website-interviews/144194864')
		app.provide('db', db) 
	}
}