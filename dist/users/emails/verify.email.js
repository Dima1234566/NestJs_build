"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmails = verifyEmails;
exports.forgotPassEmail = forgotPassEmail;
async function verifyEmails(userId) {
    return `<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <h1>Дякуємо за реєстрацію</h1>
    <p>
      Для підтвердження натисність
      <a href="${process.env.LINK_BACK}verify-email/${userId}" target="_blank">сюди</a>
    </p>
  </body>
</html>
`;
}
async function forgotPassEmail(password) {
    return `<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <h1>Ваш новий пароль пане/пані</h1>
    <p>
      Ваш новий пароль: ${password}
    </p>
  </body>
</html>
`;
}
//# sourceMappingURL=verify.email.js.map