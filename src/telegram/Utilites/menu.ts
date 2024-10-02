/* eslint-disable prettier/prettier */

export const generalKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Users' }, { text: 'Posts' }],
            [{ text: 'Help' }]
        ]
    }
}
export const postsKeyboard = (id: number, chatId: string) => {
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
    }
    return table


};

export const userKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'GetUsers' }, { text: 'TotalUsers' }],
            [{ text: 'Back' }]
        ]
    }
}

export const usersKeyboard = (id: number, chatId: string) => {
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
    }
    return table


};



export const postKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'GetPosts' }, { text: 'TotalPosts' }],
            [{ text: 'Back' }]
        ]
    }
};

export const contactKeyboard = {
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