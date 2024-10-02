/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/users.model';
import { Posts } from './posts.model';
import { Comment } from './posts.model';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { CommentPostDto } from './dto/coment.post.dto';
import { v4 as uuidv4 } from 'uuid';
import { QueryDto } from './dto/search.post.dto';



@Injectable()
export class PostsService {



    constructor(

        @InjectModel(User.name) private userModel: User,

        @InjectModel(Posts.name) private postModel: Posts,

        private userService: UsersService,

    ) { }

    // async createPost(post: CreatePostDto, userId: string) {
    //     try {
    //         if (!post) {
    //             return console.log("нема посту");
    //         }
    //         if (userId) {
    //             const findUser = await this.userService.findUserById(userId);
    //             if (!findUser) {
    //                 console.log("User don`t exist");
    //             }

    //             const { title, description } = post;
    //             const regPost = await this.postModel.create({
    //                 title: title,
    //                 description: description,
    //                 owner: userId
    //             })
    //             return regPost;

    //         } else {
    //             console.log("External Error");
    //         }


    //     } catch (error) {
    //         console.error(error);
    //     }

    // }

    // замість прийому айді приймати токен і по ньому шукати юсера який буде шось там робити


    async createPost(post: CreatePostDto, req: any) {
        try {
            if (!post) {

                return console.log("нема посту");
            }
            console.log(req);

            const user = await this.userService.findToken(req);

            if (!user) {
                return console.log("not authorization");
            }
            if (user.role === 'user' || 'admin') {

                const { title, description } = post;
                const regPost = await this.postModel.create({
                    title: title,
                    description: description,
                    owner: user._id

                })
                return regPost;

            } else
                console.log("External Error");
        }
        catch (error) {
            console.error(error);
        }

    }

    // async findAllPosts() {
    //     try {

    //         return await this.postModel.find();

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    async findAllPosts(req: any, page: number, size: number) {
        try {
            const currentPage = page || 1;
            const currentSize = size || 5;
            const totalCount = await this.postModel.countDocuments()
            const totalPages = Math.ceil(totalCount / currentSize);
            const offSet = (currentPage - 1) * currentSize;
            const user = await this.userService.findToken(req);

            if (user.role === 'user' || 'admin') {
                const result = await this.postModel.find().limit(currentSize).skip(offSet);
                return { totalPages: totalPages, currentPage: currentPage, data: result };
            }
        } catch (error) {
            console.error(error);
        }
    }

    async findPostById(id: string) {
        try {
            return await this.postModel.findById(id)

        } catch (error) {
            console.error(error);
        }

    }


    async updatePost(post: UpdatePostDto, id: string) {
        try {
            if (!post) {
                return console.log("пусто, дай дані");
            }

            const updateUser = await this.postModel.findByIdAndUpdate(id, {
                title: post.title,
                description: post.description,
                img: post.img,


            })
            return updateUser;

        } catch (error) {
            console.error(error);
        }
    }



    async findAndDelete(req: any) {
        try {
            const user = await this.userService.findToken(req);
            if (user.role === 'admin') {
                return await this.postModel.findByIdAndDelete(user.id)
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addComments(comment: CommentPostDto, id: string, user: string) {
        try {
            if (!comment) {
                return console.log("пусто, дай дані");
            }
            const findUser = await this.userModel.findById(user);
            if (findUser) {
                const findPost = await this.postModel.findById(id);
                if (!findPost) {
                    return console.log("post not found");
                } else {
                    const commentFromPost = {
                        id: uuidv4(),
                        text: comment.comments.text,
                        date: new Date(),
                        ownerName: user,
                    };
                    console.log(commentFromPost);
                    findPost.comments.push(commentFromPost);
                    await this.postModel.updateOne({ _id: id }, { $set: { comments: findPost.comments } });
                    return await this.postModel.findById(id);


                }
            } else {
                return console.log("user not found");
            }


        } catch (error) {
            console.error(error);
        }
    }

    // async addComments(comment: CommentPostDto, id: string, req: any) {
    //     try {
    //         if (!comment) {
    //             return console.log("пусто, дай дані");
    //         }
    //         const user = await this.userModel.findToken(req);
    //         if (user) {
    //             const findPost = await this.postModel.findById(id);
    //             if (!findPost) {
    //                 return console.log("post not found");
    //             } else {
    //                 const commentFromPost = {
    //                     id: uuidv4(),
    //                     text: comment.comments.text,
    //                     date: new Date(),
    //                     ownerName: user,
    //                 };
    //                 console.log(commentFromPost);
    //                 findPost.comments.push(commentFromPost);
    //                 await this.postModel.updateOne({ _id: id }, { $set: { comments: findPost.comments } });
    //                 return await this.postModel.findById(id);


    //             }
    //         } else {
    //             return console.log("user not found");
    //         }


    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    async deleteComments(id: string, commentId: string) {
        try {
            if (!id && !commentId) {
                return console.log("пусто, дай дані");
            }

            const postToDelete = await this.postModel.findById(id);
            if (!postToDelete) {
                return console.log("post not found");
            } else {
                const arrToUpdate = postToDelete.comments.filter((comment: Comment) => comment.id !== commentId)
                await this.postModel.findByIdAndUpdate({ _id: id }, { $set: { comments: arrToUpdate } });
                return await this.postModel.findById(id)
            }
        }


        catch (error) {
            console.error(error);
        }
    }


    async mergeAndRemoveDuplicates(...arrays: any[]) {
        const mergedArray = [].concat(...arrays);
        const uniqueArray = mergedArray.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
        );

        return uniqueArray;
    }

    async searchPosts(query: QueryDto) {
        try {
            // const offSet = (currentPage - 1) * currentSize;

            const { request, title, owner, description, page, size } = query;
            const currentPage = page || 1;
            const currentSize = size || 5;
            if (request) {
                const regex = new RegExp(request, 'i');
                const titleArr = await this.postModel.find({ title: { $regex: regex } }).select("_id title description owner date comments");
                const ownerArr = await this.postModel.find({ owner: { $regex: regex } }).select("_id title description owner date comments");
                const descriptionArr = await this.postModel.find({ description: { $regex: regex } }).select("_id title description owner date comments");
                const searchedArr = await this.mergeAndRemoveDuplicates(titleArr, ownerArr, descriptionArr);
                const totalCount = searchedArr.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: searchedArr };
            } else
                if (title) {

                    const regex = new RegExp(title, 'i');
                    const titleArrays = await this.postModel.find({ title: { $regex: regex } }).select("_id title description owner date comments");
                    const totalCount = titleArrays.length;
                    const totalPages = Math.ceil(totalCount / currentSize);
                    return { totalPages: totalPages, currentPage: currentPage, data: titleArrays };
                } else
                    if (owner) {
                        const regex = new RegExp(owner, 'i');
                        const ownerArr = await this.postModel.find({ owner: { $regex: regex } }).select("_id title description owner date comments");
                        const totalCount = ownerArr.length;
                        const totalPages = Math.ceil(totalCount / currentSize);
                        return { totalPages: totalPages, currentPage: currentPage, data: ownerArr };
                    } else
                        if (description) {
                            const regex = new RegExp(description, 'i');
                            const descriptionArr = await this.postModel.find({ description: { $regex: regex } }).select("_id title description owner date comments");
                            const totalCount = descriptionArr.length;
                            const totalPages = Math.ceil(totalCount / currentSize);
                            return { totalPages: totalPages, currentPage: currentPage, data: descriptionArr };
                        } else {
                            const currentPage = page || 1;
                            const currentSize = size || 5;
                            const totalCount = await this.postModel.countDocuments()
                            const totalPages = Math.ceil(totalCount / currentSize);
                            const offSet = (currentPage - 1) * currentSize;
                            const result = await this.postModel.find().limit(currentSize).skip(offSet).select("_id title description owner date comments");
                            return { totalPages: totalPages, currentPage: currentPage, data: result };
                        }
        } catch (error) {
            console.error(error);
        }
    }



    // зробити сортування по якимось полям 
    // дати забанений юзерів по алфавіту наприклад

}

