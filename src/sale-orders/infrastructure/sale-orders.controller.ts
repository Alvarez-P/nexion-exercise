import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
  Put,
  HttpCode,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { SaleOrdersService } from '../application/sale-orders.service';
import { CreateSaleOrderDto } from '../domain/dto/input/create-sale-order.dto';
import { UpdateSaleOrderDto } from '../domain/dto/input/update-sale-order.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { Employee } from 'src/employees/domain/employee.entity';
import { QuerySaleOrdersDto } from '../domain/dto/input/query-sale-order.dto';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('sale-orders')
@Controller('sale-orders')
@UseInterceptors(LoggingInterceptor)
export class SaleOrdersController {
  constructor(private readonly ordersService: SaleOrdersService) {}

  @Post()
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() createOrderDto: CreateSaleOrderDto,
    @Request() req: { user: Employee },
  ) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

  @Post('searcher')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(@Body() queryDto: QuerySaleOrdersDto) {
    return this.ordersService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateSaleOrderDto,
    @Request() req: { user: Employee },
  ) {
    return this.ordersService.update(id, updateOrderDto, req.user.id);
  }

  @Patch(':id/cancel')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.ordersService.setStatus(id, 'cancelled', req.user.id);
  }

  @Patch(':id/pay')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  pay(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.ordersService.setStatus(id, 'paid', req.user.id);
  }

  @Delete(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.ordersService.remove(id, req.user.id);
  }
}
