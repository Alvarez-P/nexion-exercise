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
import { SaleOrderFilters } from '../../sale-orders.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QuerySaleOrdersDto
  extends QueryPaginationDto<SaleOrderFilters>
  implements Query<SaleOrderFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'sellerId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly sellerId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'branchOfficeId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly branchOfficeId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['pending', 'paid', 'cancelled'],
  })
  @IsOptional()
  @IsIn(['pending', 'paid', 'cancelled'])
  readonly status?: 'pending' | 'paid' | 'cancelled';

  @ApiPropertyOptional({
    type: RangeQueryNumberDto,
    description: 'total',
    example: {
      from: new Date(),
      to: new Date(),
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly total?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'branchOfficeId',
    'sellerId',
    'total',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof SaleOrderFilters;
}
