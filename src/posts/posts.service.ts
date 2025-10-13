import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts() {
    return 'posts'
  }
  createPosts(body: any) {
    return body
  }
  getPost(id: string) {
    return id
  }
  putPost(id: string, body: any) {
    return {
      id,
      body,
    }
  }
  deletePost(id: string) {
    console.log({ id })
    return { msg: 'xóa post có id là :' + id }
  }
}
