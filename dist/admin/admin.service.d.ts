import { Posts } from 'src/posts/posts.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
export declare class AdminService {
    private userModel;
    private userService;
    private postModel;
    private postService;
    constructor(userModel: User, userService: UsersService, postModel: Posts, postService: PostsService);
    deleteAllPosts(req: any): Promise<void>;
    changeUserRole(id: string, req: any): Promise<any>;
    banUser(id: string, req: any): Promise<any>;
    findBanUsers(req: any): Promise<any>;
}
