"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const session = require("express-session");
const GoogleStategy_1 = require("./users/utils/GoogleStategy");
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: GoogleStategy_1.GOOGLE_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My usefull site')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addBearerAuth({
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'BearerAuthMethod').addServer("https://nestjs-build-eoou.onrender.com")
        .addServer(`http://localhost:${PORT}`)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(PORT, () => {
        console.log(`server started on port = http://localhost:${PORT}`);
    });
}
start();
//# sourceMappingURL=main.js.map