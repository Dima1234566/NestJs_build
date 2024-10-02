/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Patch, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Posts } from 'src/posts/posts.model';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    @ApiOperation({ summary: "Delete posts by id" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Delete("/delete")
    async findAndDeleteAllPosts(@Req() req: any): Promise<any> {
        return await this.adminService.deleteAllPosts(req);
    }

    @ApiOperation({ summary: "Change User role to moderator or to user" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Patch("/update-role/:id")
    async changeUserRole(@Param('id') id: string, @Req() req: any): Promise<any> {
        return await this.adminService.changeUserRole(id, req);
    }

    @ApiOperation({ summary: "Ban user by id" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Patch("/ban/:id")
    async banUser(@Param('id') id: string, @Req() req: any): Promise<any> {
        return await this.adminService.banUser(id, req);
    }

    @ApiOperation({ summary: "Ban users" })
    @ApiResponse({ status: 200, type: Posts })
    @ApiBearerAuth("BearerAuthMethod")
    @Get("/baned-users")
    async banedUsers(@Req() req: any): Promise<any> {
        return await this.adminService.findBanUsers(req);
    }



}
