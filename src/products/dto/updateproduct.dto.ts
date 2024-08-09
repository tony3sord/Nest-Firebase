import { IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly amount: number;
}
