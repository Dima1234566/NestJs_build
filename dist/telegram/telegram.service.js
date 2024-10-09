"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const menu_1 = require("./Utilites/menu");
const posts_service_1 = require("../posts/posts.service");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const posts_model_1 = require("../posts/posts.model");
const users_model_1 = require("../users/users.model");
let TelegramService = class TelegramService {
    constructor(userModel, userService, postModel, postService) {
        this.userModel = userModel;
        this.userService = userService;
        this.postModel = postModel;
        this.postService = postService;
        const token = process.env.TELEGRAM_KEY;
        this.bot = new TelegramBot(token, { polling: false });
        this.startTgBot();
    }
    async startTgBot() {
        this.bot.onText(/\/start/, async (msg) => {
            try {
                const chatId = msg.chat.id;
                const admin = await this.userModel.findOne({ role: 'admin' });
                const user = await this.userModel.findOne({ tgId: chatId });
                if (!admin) {
                    if (user) {
                        await this.bot.sendMessage(user.tgId, `Hello user ${msg.from.first_name}`, menu_1.generalKeyboard);
                    }
                    await this.bot.sendMessage(admin.tgId, `new User conected ${msg.from.first_name}`);
                    const massage = "Hello clown\nДля реєстрації потрібні дані а саме\nномер телефону ";
                    await this.bot.sendMessage(chatId, massage, menu_1.contactKeyboard);
                }
                else {
                    await this.bot.sendMessage(admin.tgId, `Hello admin ${msg.from.first_name}`, menu_1.generalKeyboard);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        this.bot.on('contact', async (msg) => {
            const chatId = msg.chat.id;
            const phoneNumber = msg.contact.phone_number;
            const user = await this.userModel.findOne({ phone: phoneNumber });
            if (user.tgId) {
                return await this.bot.sendMessage(chatId, `💩💩користувач ${msg.from.first_name} вже зареєстрований💩💩`, menu_1.generalKeyboard);
            }
            await this.userModel.findByIdAndUpdate(user.id, { tgId: chatId, });
            const massage = `💀💀користувач ${msg.from.first_name} зареєстрований💀💀`;
            console.log(chatId);
            return await this.bot.sendMessage(chatId, massage, menu_1.generalKeyboard);
        });
        this.bot.onText(/User/, async (msg) => {
            const chatId = msg.chat.id;
            await this.bot.sendMessage(chatId, "Users", menu_1.userKeyboard);
        });
        this.bot.onText(/GetUsers/, async (msg) => {
            const chatId = msg.chat.id;
            const userArr = await this.userModel.find();
            userArr.forEach(async (item) => {
                const massage = `\n\nThis User: ${item.email}\nID: ${item._id}`;
                const keyboard = (0, menu_1.usersKeyboard)(item._id, chatId);
                await this.bot.sendMessage(chatId, massage, keyboard);
            });
        });
        this.bot.onText(/TotalUsers/, async (msg) => {
            const chatId = msg.chat.id;
            const userArr = await this.userModel.find();
            await this.bot.sendMessage(chatId, `Total users count: ${userArr.length}`, menu_1.userKeyboard);
        });
        this.bot.onText(/Back/, async (msg) => {
            const chatId = msg.chat.id;
            await this.bot.sendMessage(chatId, "Main page", menu_1.generalKeyboard);
        });
        this.bot.onText(/PHOTO/, async (msg) => {
            const chatId = msg.chat.id;
            const imgUrl = "https://cn1.nevsedoma.com.ua/images/2010/28/7/tron_lih.jpg";
            this.bot.sendPhoto(chatId, imgUrl, { caption: "This if frog" });
        });
        this.bot.onText(/Post/, async (msg) => {
            const chatId = msg.chat.id;
            await this.bot.sendMessage(chatId, "Posts", menu_1.postKeyboard);
        });
        this.bot.onText(/GetPosts/, async (msg) => {
            const chatId = msg.chat.id;
            const postArr = await this.postModel.find();
            postArr.forEach(async (item) => {
                const massage = `\n\nPost title: ${item.title}\nID: ${item._id}`;
                const keyboard = (0, menu_1.postsKeyboard)(item._id, chatId);
                await this.bot.sendMessage(chatId, massage, keyboard);
            });
        });
        this.bot.onText(/TotalPosts/, async (msg) => {
            const chatId = msg.chat.id;
            const postArr = await this.postModel.find();
            await this.bot.sendMessage(chatId, `Total posts count: ${postArr.length}`, menu_1.postKeyboard);
        });
        this.bot.on('callback_query', async (query) => {
            const { data } = query;
            const [type, id, chatId] = data.split(":");
            if (type === 'user') {
                await this.userModel.findByIdAndDelete(id);
                await this.bot.sendMessage(chatId, "Deleted", menu_1.userKeyboard);
            }
            if (type === 'post') {
                await this.postModel.findByIdAndDelete(id);
                await this.bot.sendMessage(chatId, "Deleted", menu_1.postKeyboard);
            }
            if (type === 'owner') {
                const post = await this.postModel.findById(id);
                const user = await this.userModel.findById(post.owner);
                await this.bot.sendMessage(chatId, `owner chimed:  ${user === null ? "Owner Deleted " : user.email}`, menu_1.postKeyboard);
            }
        });
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_model_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(posts_model_1.Posts.name)),
    __metadata("design:paramtypes", [users_model_1.User,
        users_service_1.UsersService,
        posts_model_1.Posts,
        posts_service_1.PostsService])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map