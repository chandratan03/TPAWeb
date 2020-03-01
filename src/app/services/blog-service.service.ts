import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  constructor(private apollo: Apollo) { }

  
  insertPost(title:string, description:string, userId:number, image:string, category:string):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation insertBlog($title:String!, $description:String!, $userId:Int!, $image:String!, $category:String){
        insertBlog(title:$title, description:$description, userId:$userId, image:$image, category:$category){
          id
          userId
          title
          image

        }
      }
      `,
      variables:{
        "title":title,
        "description":description,
        "userId":userId,
        "image":image,
        "category": category
      },
    })
  }

  updatePost(id:number,title:string, description:string, userId:number, image:string, category:string):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation updateBlog($id:Int!,$title:String!, $description:String!, $userId:Int!, $image:String!, $category:String){
        updateBlogById(id:$id,title:$title, description:$description, userId:$userId, image:$image, category:$category){
          id
          userId
          title
          image

        }
      }
      `,
      variables:{
        "id": id,
        "title":title,
        "description":description,
        "userId":userId,
        "image":image,
        "category": category
      },
    })
  }
  deletePost(id:number):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation deleteBlog($id:Int!){
        deleteBlogById(id:$id){
          id
          userId
          title
          image

        }
      }
      `,
      variables:{
        "id": id,
        },
    })
  }

  getPost():Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`
        {
          blogs{
            id
            userId
            title
            description
            viewerNumber
            image
            category

          }
        }
      `
    })
  }
  getTrendingBlog():Observable<Query>{
    return this.apollo.query<Query>({
      query:gql`
        {
          trendingBlogs{
            id
            userId
            title
            description
            viewerNumber
            image
            category
          }
        }
      `
    })
  }

  getBlogById(id:number):Observable<Query>{
    return this.apollo.query<Query>({
      query: gql`
      query blogById($id: Int){
        blogById(id:$id){
          id
          userId
          title
          description
          viewerNumber
          image
          category
        }
      }
      `,
      variables:{
        "id": id
        
      }
    })
  }
  
  updateBlogViewer(id:number):Observable<any>{
    return this.apollo.mutate<any>({
      mutation: gql`
      mutation updateBlogViewer($id:Int!){
        updateBlogViewer(id:$id){
          id
        }
      }
      `,
      variables:{
        "id":id

      }
    })
  }
}
