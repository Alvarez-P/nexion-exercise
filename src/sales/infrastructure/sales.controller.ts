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
  UseInterceptors,
} from '@nestjs/common';
import { SalesService } from '../application/sales.service';
import { CreateSaleDto } from '../domain/dto/input/create-sale.dto';
import { UpdateSaleDto } from '../domain/dto/input/update-sale.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { Employee } from 'src/employees/domain/employee.entity';
import { QuerySalesDto } from '../domain/dto/input/query-sale.dto';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('sales')
@Controller('sales')
@UseInterceptors(LoggingInterceptor)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() createSaleDto: CreateSaleDto,
    @Request() req: { user: Employee },
  ) {
    return this.salesService.create(createSaleDto, req.user.id);
  }

  @Post('searcher')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(@Body() queryDto: QuerySalesDto) {
    return this.salesService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.salesService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
    @Request() req: { user: Employee },
  ) {
    return this.salesService.update(id, updateSaleDto, req.user.id);
  }

  @Delete(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.salesService.remove(id, req.user.id);
  }
}
