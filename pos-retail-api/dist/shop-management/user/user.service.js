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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const shop_entity_1 = require("../shop/entities/shop.entity");
let UserService = class UserService {
    constructor(userRepository, shopRepository) {
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
    }
    async create(createUserDto) {
        const shop = await this.shopRepository.findOneBy({ id: createUserDto.shopId });
        const user = this.userRepository.create({ ...createUserDto, shop });
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find({ relations: ['shop'] });
    }
    findOne(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['shop'],
        });
    }
    async findOneByUserNameAndPassword(userName, password) {
        const user = await this.userRepository.findOne({
            where: { userName },
            relations: ['shop'],
        });
        if (!user) {
            return null;
        }
        if (password && user.password === password) {
            return user;
        }
        else {
            return null;
        }
    }
    async update(id, updateUserDto) {
        if (updateUserDto.shopId) {
            const shop = await this.shopRepository.findOneBy({ id: updateUserDto.shopId });
            updateUserDto['shop'] = shop;
        }
        return this.userRepository.save({ id, ...updateUserDto });
    }
    remove(id) {
        return this.userRepository.delete(id).then();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map