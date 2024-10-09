import { CreatePostDto } from './dto/create.post.dto';
import { PostsService } from './posts.service';
import { Posts } from './posts.model';
import { UpdatePostDto } from './dto/update.post.dto';
import { CommentPostDto } from './dto/coment.post.dto';
import { QueryDto } from './dto/search.post.dto';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    create(post: CreatePostDto, req: any): Promise<Posts>;
    findAllPosts(req: any, page: number, size: number): Promise<any>;
    findPostById(id: string): Promise<Posts>;
    updatePost(post: UpdatePostDto, id: string): Promise<Posts>;
    findAndDelete(id: string): Promise<Posts>;
    addCommentsPost(comment: CommentPostDto, id: string, user: string): Promise<Posts>;
    deleteCommentFromComments(id: string, commentId: string): Promise<Posts>;
    searchPost(query: QueryDto): Promise<{
        totalPages: number;
        currentPage: number;
        data: any;
    }>;
}
