#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to add shopId and @ManyToOne(Shop) relation
add_shop_relation() {
  local ENTITY_FILE="$1"
  local ENTITY_CLASS_NAME="$2"
  local ENTITY_PLURAL="$3"

  echo -e "${GREEN}Updating $ENTITY_FILE...${NC}"

  # Backup original file
  cp "$ENTITY_FILE" "${ENTITY_FILE}.bak"

  # Add import Shop if not present
  if ! grep -q "import.*Shop" "$ENTITY_FILE"; then
    echo -e "${YELLOW}Adding import Shop...${NC}"
    sed -i.bak '1i\
import { Shop } from '\''../../shop-management/shop/entities/shop.entity'\'';' "$ENTITY_FILE"
    rm "${ENTITY_FILE}.bak"
  fi

  # Add shopId column if not exists
  if ! grep -q "shopId" "$ENTITY_FILE"; then
    echo -e "${YELLOW}Adding shopId column...${NC}"
    sed -i.bak '/@PrimaryColumn\|@Column/a\  @Column()\n  shopId: number;' "$ENTITY_FILE"
    rm "${ENTITY_FILE}.bak"
  fi

  # Add shop relation if not exists
  if ! grep -q "@ManyToOne(() => Shop" "$ENTITY_FILE"; then
    echo -e "${YELLOW}Adding shop relation...${NC}"
    sed -i.bak '/@Column/a\
  @ManyToOne(() => Shop, (shop) => shop.'"${ENTITY_PLURAL}"')\n  @JoinColumn({ name: '\''shopId'\'' })\n  shop: Shop;' "$ENTITY_FILE"
    rm "${ENTITY_FILE}.bak"
  fi
}

# === Run on all target entities ===

add_shop_relation "src/inventory-management/qty-type/entities/qty-type.entity.ts" "QtyType" "qtyTypes"
add_shop_relation "src/inventory-management/qty/entities/qty.entity.ts" "Qty" "qtys"
add_shop_relation "src/item-management/product-prices/entities/product-price.entity.ts" "ProductPrice" "productPrices"
add_shop_relation "src/item-management/products/entities/product.entity.ts" "Product" "products"
add_shop_relation "src/item-management/supplier/entities/supplier.entity.ts" "Supplier" "suppliers"
add_shop_relation "src/sale-management/customer/entities/customer.entity.ts" "Customer" "customers"
add_shop_relation "src/sale-management/invoice/entities/invoice.entity.ts" "Invoice" "invoices"
add_shop_relation "src/sale-management/item-sell/entities/item-sell.entity.ts" "ItemSell" "itemSells"
