"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = generatePassword;
function generatePassword() {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset[Math.floor(Math.random() * n)];
    }
    return password;
}
//# sourceMappingURL=pass.generate.js.map