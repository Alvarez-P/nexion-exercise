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
import { ProductFilters } from '../../product.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryProductsDto
  extends QueryPaginationDto<ProductFilters>
  implements Query<ProductFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'name',
    example: 'drink',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'categoryId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional({
    type: RangeQueryNumberDto,
    description: 'cost',
    example: {
      from: 0,
      to: 20,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly cost?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: RangeQueryNumberDto,
    description: 'cost',
    example: {
      from: 0,
      to: 20,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly price?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'name',
    'categoryId',
    'cost',
    'price',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof ProductFilters;
}
