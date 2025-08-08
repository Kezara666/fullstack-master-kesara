
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  // @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'Invoice created successfully.' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'List of invoices returned.' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get('shop/:shopId')
  async getByShopId(@Param('shopId') shopId: number) {
    return this.invoiceService.findByShopId(shopId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Invoice ID' })
  @ApiResponse({ status: 200, description: 'Invoice found.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an invoice by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Invoice ID' })
  @ApiBody({ type: UpdateInvoiceDto })
  @ApiResponse({ status: 200, description: 'Invoice updated successfully.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Invoice ID' })
  @ApiResponse({ status: 200, description: 'Invoice deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }

  @Post('bill')
  async printBill(@Body() body: any): Promise<any> {
    try {
      // Initialize printer (update with your printer's details)
      const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // Most thermal printers use EPSON ESC/POS
        interface: 'tcp://192.168.1.100', // Replace with your printer's IP or USB path (e.g., '/dev/usb/lp0')
        // For USB, you may need: interface: 'printer:USB_PRINTER_NAME'
      });

      // Check if printer is connected
      const isConnected = await printer.isPrinterConnected();
      if (!isConnected) {
        throw new Error('Printer not connected');
      }

      // Extract key fields from JSON
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

      // Format bill
      printer.alignCenter();
      printer.println('=== Low Branch Receipt ===');
      printer.println(`Shop ID: ${shopId}`);
      printer.println(`Customer ID: ${customerId}`);
      printer.println(`Date: ${createdAt}`);
      printer.drawLine();

      // Print items
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

      // Print totals
      printer.drawLine();
      printer.alignRight();
      printer.println(`Subtotal: $${total.toFixed(2)}`);
      printer.println(`Discount: $${discount.toFixed(2)}`);
      printer.println(`Net Total: $${netTotal.toFixed(2)}`);
      if (pendingAmount > 0) {
        printer.println(`Pending: $${pendingAmount.toFixed(2)}`);
      }
      printer.drawLine();

      // Footer
      printer.alignCenter();
      printer.println('Thank you for your purchase!');
      printer.println('Powered by xAI');
      printer.cut();

      // Execute print
      await printer.execute();
      printer.clear();

      return { status: 'success', message: 'Bill printed successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to print bill: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
