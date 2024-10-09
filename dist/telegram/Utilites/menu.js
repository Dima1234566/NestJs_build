"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactKeyboard = exports.postKeyboard = exports.usersKeyboard = exports.userKeyboard = exports.postsKeyboard = exports.generalKeyboard = void 0;
exports.generalKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Users' }, { text: 'Posts' }],
            [{ text: 'Help' }]
        ]
    }
};
const postsKeyboard = (id, chatId) => {
    const table = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Delete',
                        callback_data: `post:${id}:${chatId}`
                    },
                    {
                        text: 'GetOwner',
                        callback_data: `owner:${id}:${chatId}`
                    }
                ]
            ]
        }
    };
    return table;
};
exports.postsKeyboard = postsKeyboard;
exports.userKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'GetUsers' }, { text: 'TotalUsers' }],
            [{ text: 'Back' }]
        ]
    }
};
const usersKeyboard = (id, chatId) => {
    const table = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Delete',
                        callback_data: `user:${id}:${chatId}`
                    }, {
                        text: 'GetEmail',
                        callback_data: `email:${id}:${chatId}`
                    }
                ]
            ]
        }
    };
    return table;
};
exports.usersKeyboard = usersKeyboard;
exports.postKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'GetPosts' }, { text: 'TotalPosts' }],
            [{ text: 'Back' }]
        ]
    }
};
exports.contactKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {
                    text: 'Відправити номер телефону',
                    request_contact: true,
                },
            ],
        ],
        resize_keyboard: true,
    },
};
//# sourceMappingURL=menu.js.map