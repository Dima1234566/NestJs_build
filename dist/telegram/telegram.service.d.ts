import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Posts } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
export declare class TelegramService {
    private userModel;
    private userService;
    private postModel;
    private postService;
    private bot;
    constructor(userModel: User, userService: UsersService, postModel: Posts, postService: PostsService);
    private startTgBot;
}
