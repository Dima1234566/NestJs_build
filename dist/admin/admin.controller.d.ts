import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    findAndDeleteAllPosts(req: any): Promise<any>;
    changeUserRole(id: string, req: any): Promise<any>;
    banUser(id: string, req: any): Promise<any>;
    banedUsers(req: any): Promise<any>;
}
