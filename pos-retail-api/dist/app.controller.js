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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const fs_1 = require("fs");
const path_1 = require("path");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello(res) {
        const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="3;url=https://pos-master-frontend-web.vercel.app/login"> 
      </head>
      <body>
        <h1>Redirecting to Dashboard...</h1>
        <p>If you are not redirected automatically, <a href="https://pos-master-frontend-web.vercel.app/login"  target="_blank">click here</a>.</p>
      </body>
    </html>
  `;
        res.type('html');
        res.send(html);
    }
    downloadExe(res) {
        const filePath = (0, path_1.join)(__dirname, '..', 'public', 'app.exe');
        const file = (0, fs_1.createReadStream)(filePath);
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="app.exe"',
        });
        return new common_1.StreamableFile(file);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('printfiles'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], AppController.prototype, "downloadExe", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map