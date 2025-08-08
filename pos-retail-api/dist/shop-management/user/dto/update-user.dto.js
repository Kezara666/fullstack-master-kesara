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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'John Doe' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '0771234567' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '901234567V' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'admin' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "shopId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
//# sourceMappingURL=update-user.dto.js.map