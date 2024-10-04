/* eslint-disable prettier/prettier */

export async function verifyEmails(userId: string) {
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
      <a href="${process.env.LINK_BACK}users/verify-email/${userId}" target="_blank">сюди</a>
    </p>
  </body>
</html>
`
}


export async function forgotPassEmail(password: string) {
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
`
}