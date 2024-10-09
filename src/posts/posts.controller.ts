/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create.post.dto';
import { PostsService } from './posts.service';
import { Posts } from './posts.model';
import { UpdatePostDto } from './dto/update.post.dto';
import { CommentPostDto } from './dto/coment.post.dto';
import { QueryDto } from './dto/search.post.dto';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @ApiOperation({ summary: "Create Post" })
    @ApiResponse({ status: 201, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Post("/")
    async create(@Body() post: CreatePostDto, @Req() req: any): Promise<Posts> {
        return await this.postService.createPost(post, req);
    }

    @ApiOperation({ summary: "Get all posts" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @ApiQuery({ name: 'size', required: false, type: Number })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @Get("/")
    async findAllPosts(@Req() req: any, @Query('page') page: number, @Query('size') size: number): Promise<any> {
        return await this.postService.findAllPosts(req, page, size);
    }

    @ApiOperation({ summary: "Get post by id" })
    @ApiResponse({ status: 200, type: Posts })
    @Get("/find/:id")
    async findPostById(@Param('id') id: string): Promise<Posts> {
        return await this.postService.findPostById(id);
    }

    @ApiOperation({ summary: "Update Post" })
    @ApiResponse({ status: 200, type: Posts })
    @Put("/update/:id")
    async updatePost(@Body() post: UpdatePostDto, @Param('id') id: string): Promise<Posts> {
        return await this.postService.updatePost(post, id);
    }

    @ApiOperation({ summary: "Delete post by id" })
    @ApiResponse({ status: 200, type: Posts })
    @Delete("/delete/:id")
    async findAndDelete(@Param('id') id: string): Promise<Posts> {
        return await this.postService.findAndDelete(id);
    }

    @ApiOperation({ summary: "Add Comment to post" })
    @ApiResponse({ status: 200, type: Posts })
    @Put("/comment/:id/:user")
    async addCommentsPost(@Body() comment: CommentPostDto, @Param('id') id: string, @Param('user') user: string): Promise<Posts> {
        return await this.postService.addComments(comment, id, user);
    }

    @ApiOperation({ summary: "Delete Comment from comments to post" })
    @ApiResponse({ status: 200, type: Posts })
    @Delete("/comment/:id/:commentId")
    async deleteCommentFromComments(@Param('id') id: string, @Param('commentId') commentId: string): Promise<Posts> {
        return await this.postService.deleteComments(id, commentId);
    }

    @ApiOperation({ summary: "Search post" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiQuery({ name: 'request', required: false, type: String })
    @ApiQuery({ name: 'title', required: false, type: String })
    @ApiQuery({ name: 'owner', required: false, type: String })
    @ApiQuery({ name: 'description', required: false, type: String })
    @ApiQuery({ name: 'size', required: false, type: Number })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @Get("/search")
    async searchPost(@Query() query: QueryDto) {
        return await this.postService.searchPosts(query);
    }

    @ApiOperation({ summary: "Post LIKE" })
    @ApiResponse({ status: 201, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Post("/post-like/:id")
    async likes(@Param('id') id: string, @Req() req: any): Promise<Posts> {
        return await this.postService.likes(id, req);
    }


}
