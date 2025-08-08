"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateItemSellDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_item_sell_dto_1 = require("./create-item-sell.dto");
class UpdateItemSellDto extends (0, mapped_types_1.PartialType)(create_item_sell_dto_1.CreateItemSellDto) {
}
exports.UpdateItemSellDto = UpdateItemSellDto;
//# sourceMappingURL=update-item-sell.dto.js.map