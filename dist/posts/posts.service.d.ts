import { User } from 'src/users/users.model';
import { Posts } from './posts.model';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { CommentPostDto } from './dto/coment.post.dto';
import { QueryDto } from './dto/search.post.dto';
export declare class PostsService {
    private userModel;
    private postModel;
    private userService;
    constructor(userModel: User, postModel: Posts, userService: UsersService);
    createPost(post: CreatePostDto, req: any): Promise<any>;
    findAllPosts(req: any, page: number, size: number): Promise<{
        totalPages: number;
        currentPage: number;
        data: any;
    }>;
    findPostById(id: string): Promise<any>;
    updatePost(post: UpdatePostDto, id: string): Promise<any>;
    findAndDelete(req: any): Promise<any>;
    addComments(comment: CommentPostDto, id: string, user: string): Promise<any>;
    deleteComments(id: string, commentId: string): Promise<any>;
    mergeAndRemoveDuplicates(...arrays: any[]): Promise<any[]>;
    searchPosts(query: QueryDto): Promise<{
        totalPages: number;
        currentPage: number;
        data: any;
    }>;
    likes(id: string, req: any): Promise<Posts>;
}
