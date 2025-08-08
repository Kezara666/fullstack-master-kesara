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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const invoice_service_1 = require("./invoice.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const node_thermal_printer_1 = require("node-thermal-printer");
let InvoiceController = class InvoiceController {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    create(createInvoiceDto) {
        return this.invoiceService.create(createInvoiceDto);
    }
    findAll() {
        return this.invoiceService.findAll();
    }
    async getByShopId(shopId) {
        return this.invoiceService.findByShopId(shopId);
    }
    findOne(id) {
        return this.invoiceService.findOne(+id);
    }
    update(id, updateInvoiceDto) {
        return this.invoiceService.update(+id, updateInvoiceDto);
    }
    remove(id) {
        return this.invoiceService.remove(+id);
    }
    async printBill(body) {
        try {
            const printer = new node_thermal_printer_1.ThermalPrinter({
                type: node_thermal_printer_1.PrinterTypes.EPSON,
                interface: 'tcp://192.168.1.100',
            });
            const isConnected = await printer.isPrinterConnected();
            if (!isConnected) {
                throw new Error('Printer not connected');
            }
            const customerId = body.customerId || 'N/A';
            const total = body.total || 0.0;
            const discount = body.discount || 0.0;
            const netTotal = body.netTotal || 0.0;
            const items = body.itemsSelled || [];
            const shopId = body.shopId || 'N/A';
            const createdAt = new Date(body.createdAt || Date.now()).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            const pendingAmount = body.pendingdAmount || 0.0;
            printer.alignCenter();
            printer.println('=== Low Branch Receipt ===');
            printer.println(`Shop ID: ${shopId}`);
            printer.println(`Customer ID: ${customerId}`);
            printer.println(`Date: ${createdAt}`);
            printer.drawLine();
            printer.alignLeft();
            printer.tableCustom([
                { text: 'Item', align: 'LEFT', width: 0.4 },
                { text: 'Qty', align: 'CENTER', width: 0.2 },
                { text: 'Price', align: 'RIGHT', width: 0.2 },
                { text: 'Total', align: 'RIGHT', width: 0.2 },
            ]);
            printer.drawLine();
            for (const item of items) {
                const qty = item.qty || 0;
                const price = item.qntPrice || 0.0;
                const totalPrice = qty * price;
                const itemName = `Product #${item.productId || 'Unknown'}`.slice(0, 12);
                printer.tableCustom([
                    { text: itemName, align: 'LEFT', width: 0.4 },
                    { text: qty.toString(), align: 'CENTER', width: 0.2 },
                    { text: `$${price.toFixed(2)}`, align: 'RIGHT', width: 0.2 },
                    { text: `$${totalPrice.toFixed(2)}`, align: 'RIGHT', width: 0.2 },
                ]);
            }
            printer.drawLine();
            printer.alignRight();
            printer.println(`Subtotal: $${total.toFixed(2)}`);
            printer.println(`Discount: $${discount.toFixed(2)}`);
            printer.println(`Net Total: $${netTotal.toFixed(2)}`);
            if (pendingAmount > 0) {
                printer.println(`Pending: $${pendingAmount.toFixed(2)}`);
            }
            printer.drawLine();
            printer.alignCenter();
            printer.println('Thank you for your purchase!');
            printer.println('Powered by xAI');
            printer.cut();
            await printer.execute();
            printer.clear();
            return { status: 'success', message: 'Bill printed successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to print bill: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new invoice' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invoice created successfully.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of invoices returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('shop/:shopId'),
    __param(0, (0, common_1.Param)('shopId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getByShopId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an invoice by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Invoice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an invoice by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Invoice ID' }),
    (0, swagger_1.ApiBody)({ type: update_invoice_dto_1.UpdateInvoiceDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an invoice by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Invoice ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoice deleted successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bill'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "printBill", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, swagger_1.ApiTags)('invoice'),
    (0, common_1.Controller)('invoice'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map