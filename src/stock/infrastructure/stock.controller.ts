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
import { StockService } from '../application/stock.service';
import { CreateStockDto } from '../domain/dto/input/create-stock.dto';
import { UpdateStockDto } from '../domain/dto/input/update-stock.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { Employee } from 'src/employees/domain/employee.entity';
import { QueryStockDto } from '../domain/dto/input/query-stock.dto';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('stock')
@Controller('stock')
@UseInterceptors(LoggingInterceptor)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @Auth('admin')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() createStockDto: CreateStockDto,
    @Request() req: { user: Employee },
  ) {
    return this.stockService.create(createStockDto, req.user.id);
  }

  @Post('searcher')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(@Body() queryDto: QueryStockDto) {
    return this.stockService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stockService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() stockDto: UpdateStockDto,
    @Request() req: { user: Employee },
  ) {
    return this.stockService.update(id, stockDto, req.user.id);
  }

  @Delete(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.stockService.remove(id, req.user.id);
  }
}
