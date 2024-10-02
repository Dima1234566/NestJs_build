/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/posts/posts.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name) private userModel: User,

        private userService: UsersService,
        @InjectModel(Posts.name) private postModel: Posts,

        private postService: PostsService,
    ) { }


    async deleteAllPosts(req: any) {

        try {
            const user = await this.userService.findToken(req);
            if (!user) {
                return console.log("user not here");
            }
            if (user.role === 'admin') {
                const postArr = await this.postModel.find()
                for (const post of postArr) {
                    await this.postModel.findByIdAndDelete(post._id);

                }
                return console.log("all posts deleted");
            }


        } catch (error) {
            console.error(error);

        }

    }

    async changeUserRole(id: string, req: any) {
        try {
            const admin = await this.userService.findToken(req);

            if (admin.role === 'admin') {
                const user = await this.userModel.findById(id);
                if (!user) {
                    console.log("user not found");
                } else {
                    if (user.role === 'user') {
                        const changeRole = await this.userModel.findByIdAndUpdate(id, { role: 'moderator' });
                        return changeRole
                    } else {
                        const changeRole = await this.userModel.findByIdAndUpdate(id, { role: 'user' });
                        return changeRole
                    }

                }


            } else {
                console.log('you are not admin');

            }




        } catch (error) {
            console.error(error);
        }

    }




    async banUser(id: string, req: any) {
        try {
            const admin = await this.userService.findToken(req);
            console.log(admin.role);
            if (admin.role === 'admin' || admin.role === 'moderator') {
                const user = await this.userModel.findById(id);
                if (!user) {
                } else {
                    if (user.ban === true) {
                        const changeBanStatus = await this.userModel.findByIdAndUpdate(id, { ban: false });
                        return await this.userModel.findById(changeBanStatus._id)
                    }
                    if (user.ban === false) {
                        const changeBanStatus = await this.userModel.findByIdAndUpdate(id, { ban: true });
                        return await this.userModel.findById(changeBanStatus._id)
                    }

                }


            } else {
                console.log('you are not admin or moderator');

            }




        } catch (error) {
            console.error(error);
        }
    }

    async findBanUsers(req: any) {

        try {
            const admin = await this.userService.findToken(req);
            if (admin.role === 'admin' || admin.role === 'moderator') {
                return await this.userModel.find({ ban: false }, { ban: true, email: true });

            }
        } catch (error) {
            console.error(error);
        }
    }



}


