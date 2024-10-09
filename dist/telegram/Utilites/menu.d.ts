export declare const generalKeyboard: {
    reply_markup: {
        keyboard: {
            text: string;
        }[][];
    };
};
export declare const postsKeyboard: (id: number, chatId: string) => {
    reply_markup: {
        inline_keyboard: {
            text: string;
            callback_data: string;
        }[][];
    };
};
export declare const userKeyboard: {
    reply_markup: {
        keyboard: {
            text: string;
        }[][];
    };
};
export declare const usersKeyboard: (id: number, chatId: string) => {
    reply_markup: {
        inline_keyboard: {
            text: string;
            callback_data: string;
        }[][];
    };
};
export declare const postKeyboard: {
    reply_markup: {
        keyboard: {
            text: string;
        }[][];
    };
};
export declare const contactKeyboard: {
    reply_markup: {
        keyboard: {
            text: string;
            request_contact: boolean;
        }[][];
        resize_keyboard: boolean;
    };
};
