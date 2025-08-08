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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shop_entity_1 = require("./entities/shop.entity");
const user_entity_1 = require("../user/entities/user.entity");
const supplier_entity_1 = require("../../item-management/supplier/entities/supplier.entity");
let ShopService = class ShopService {
    constructor(shopRepository, userRepository, supplierRepository) {
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
        this.supplierRepository = supplierRepository;
    }
    create(createShopDto) {
        const shop = this.shopRepository.create(createShopDto);
        return this.shopRepository.save(shop);
    }
    findAll() {
        return this.shopRepository.find({ relations: ['users'] });
    }
    findOne(id) {
        return this.shopRepository.findOne({
            where: { id },
            relations: ['users'],
        });
    }
    update(id, updateShopDto) {
        return this.shopRepository.save({ id, ...updateShopDto });
    }
    async remove(id) {
        await this.supplierRepository.delete({ shop: { id } });
        await this.userRepository.delete({ shopId: id });
        await this.shopRepository.delete(id);
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_entity_1.Shop)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ShopService);
//# sourceMappingURL=shop.service.js.map