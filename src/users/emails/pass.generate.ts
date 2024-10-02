/* eslint-disable prettier/prettier */

export function generatePassword() {
    const length = 8;
    const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset[Math.floor(Math.random() * n)];
    }
    return password;
}