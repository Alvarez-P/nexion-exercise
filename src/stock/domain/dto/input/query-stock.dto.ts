import {
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from 'src/core/types/query.interface';
import { RangeQueryNumberDto } from 'src/core/domain/dto/range-query-number.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { StockFilters } from '../../stock.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryStockDto
  extends QueryPaginationDto<StockFilters>
  implements Query<StockFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'productId',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  readonly productId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'branchOfficeId',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  readonly branchOfficeId?: string;

  @ApiPropertyOptional({
    type: RangeQueryNumberDto,
    description: 'amount',
    example: {
      from: 0,
      to: 20,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly amount?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn([
    'id',
    'productId',
    'branchOfficeId',
    'amount',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof StockFilters;
}
