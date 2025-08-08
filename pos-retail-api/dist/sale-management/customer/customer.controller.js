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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    create(createCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }
    findAll() {
        return this.customerService.findAll();
    }
    findOne(id) {
        return this.customerService.findOne(+id);
    }
    update(id, updateCustomerDto) {
        return this.customerService.update(+id, updateCustomerDto);
    }
    remove(id) {
        return this.customerService.remove(+id);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    (0, swagger_1.ApiBody)({ type: create_customer_dto_1.CreateCustomerDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Customer created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all customers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of customers returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Customer ID' }),
    (0, swagger_1.ApiBody)({ type: update_customer_dto_1.UpdateCustomerDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "remove", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('customer'),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map