/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { contactKeyboard, generalKeyboard, postKeyboard, postsKeyboard, userKeyboard, usersKeyboard } from './Utilites/menu';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';


@Injectable()
export class TelegramService {
    private bot: TelegramBot;
    constructor(
        @InjectModel(User.name) private userModel: User,

        private userService: UsersService,
        @InjectModel(Posts.name) private postModel: Posts,

        private postService: PostsService,
    ) {
        const token = process.env.TELEGRAM_KEY;
        this.bot = new TelegramBot(token, { polling: false });
        this.startTgBot();
    }


    private async startTgBot() {

        // setTimeout(() => {
        //     const tgId = 397805705;
        //     this.bot.sendMessage(tgId, `Hello user how are you `)
        // }, 5000)

        this.bot.onText(/\/start/, async (msg: any) => {
            try {
                const chatId = msg.chat.id;
                const admin = await this.userModel.findOne({ role: 'admin' });
                const user = await this.userModel.findOne({ tgId: chatId });

                if (!admin) {
                    if (user) {
                        await this.bot.sendMessage(user.tgId, `Hello user ${msg.from.first_name}`, generalKeyboard)

                    }
                    await this.bot.sendMessage(admin.tgId, `new User conected ${msg.from.first_name}`)

                    const massage = "Hello clown\nДля реєстрації потрібні дані а саме\nномер телефону ";

                    await this.bot.sendMessage(chatId, massage, contactKeyboard);
                } else {
                    await this.bot.sendMessage(admin.tgId, `Hello admin ${msg.from.first_name}`, generalKeyboard)

                }


            } catch (error) {
                console.error(error);
            }



        });

        this.bot.on('contact', async (msg: any) => {
            const chatId = msg.chat.id;
            const phoneNumber = msg.contact.phone_number;
            const user = await this.userModel.findOne({ phone: phoneNumber })
            if (user.tgId) {
                return await this.bot.sendMessage(chatId, `💩💩користувач ${msg.from.first_name} вже зареєстрований💩💩`, generalKeyboard);
            }
            await this.userModel.findByIdAndUpdate(user.id, { tgId: chatId, })
            const massage = `💀💀користувач ${msg.from.first_name} зареєстрований💀💀`;

            console.log(chatId);
            return await this.bot.sendMessage(chatId, massage, generalKeyboard);

        });

        this.bot.onText(/User/, async (msg: any) => {
            const chatId = msg.chat.id;
            await this.bot.sendMessage(chatId, "Users", userKeyboard);
        });

        this.bot.onText(/GetUsers/, async (msg: any) => {
            const chatId = msg.chat.id;
            const userArr = await this.userModel.find();

            // let massage = "Users: \n\n"
            userArr.forEach(async (item) => {
                const massage = `\n\nThis User: ${item.email}\nID: ${item._id}`;
                const keyboard = usersKeyboard(item._id, chatId);
                await this.bot.sendMessage(chatId, massage, keyboard);

            });

        });

        this.bot.onText(/TotalUsers/, async (msg: any) => {
            const chatId = msg.chat.id;
            const userArr = await this.userModel.find();
            await this.bot.sendMessage(chatId, `Total users count: ${userArr.length}`, userKeyboard);
        })

        this.bot.onText(/Back/, async (msg: any) => {
            const chatId = msg.chat.id;
            await this.bot.sendMessage(chatId, "Main page", generalKeyboard);
        });


        this.bot.onText(/PHOTO/, async (msg: any) => {
            const chatId = msg.chat.id;
            const imgUrl = "https://cn1.nevsedoma.com.ua/images/2010/28/7/tron_lih.jpg";
            this.bot.sendPhoto(chatId, imgUrl, { caption: "This if frog" });
        });


        this.bot.onText(/Post/, async (msg: any) => {
            const chatId = msg.chat.id;

            await this.bot.sendMessage(chatId, "Posts", postKeyboard);

        })

        this.bot.onText(/GetPosts/, async (msg: any) => {
            const chatId = msg.chat.id;
            const postArr = await this.postModel.find();


            postArr.forEach(async (item) => {

                const massage = `\n\nPost title: ${item.title}\nID: ${item._id}`
                const keyboard = postsKeyboard(item._id, chatId)
                await this.bot.sendMessage(chatId, massage, keyboard);
            });

        })

        this.bot.onText(/TotalPosts/, async (msg: any) => {
            const chatId = msg.chat.id;
            const postArr = await this.postModel.find();
            await this.bot.sendMessage(chatId, `Total posts count: ${postArr.length}`, postKeyboard);
        })

        this.bot.on('callback_query', async (query: any) => {

            const { data } = query;

            const [type, id, chatId] = data.split(":");
            if (type === 'user') {
                await this.userModel.findByIdAndDelete(id);
                await this.bot.sendMessage(chatId, "Deleted", userKeyboard)
            }
            if (type === 'post') {
                await this.postModel.findByIdAndDelete(id);
                await this.bot.sendMessage(chatId, "Deleted", postKeyboard)
            }
            if (type === 'owner') {

                const post = await this.postModel.findById(id);
                const user = await this.userModel.findById(post.owner);
                await this.bot.sendMessage(chatId, `owner chimed:  ${user === null ? "Owner Deleted " : user.email}`, postKeyboard)
            }
        })







    }






}
// const opts = {
//     reply_markup: {
//         inline_keyboard: [
//             [
//                 {
//                     text: 'Edit Text',
//                     // we shall check for this value when we listen
//                     // for "callback_query"
//                     callback_data: 'edit'
//                 }
//             ]
//         ]
//     }
// };

