import { ApiProperty } from '@nestjs/swagger';

import {
	IsHexColor,
	IsNumber,
	IsOptional,
	IsString,
} from "class-validator";

export class AddFishDto {
	@ApiProperty({
		description: 'Fish name',
		required: true,
		example: 'Guppy',
	})
	@IsString()
	public readonly name: string;

	@ApiProperty({
		description: 'How many days in a row the fish must be fed',
		required: true,
		example: 5,
	})
	@IsNumber()
	public readonly feedingDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish must not be fed',
		required: true,
		example: 1,
	})
	@IsNumber()
	public readonly withholdingDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish was fed',
		required: false,
		example: 3,
	})
	@IsNumber()
	public readonly fedDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish was not fed',
		required: false,
		example: 0,
	})
	@IsNumber()
	public readonly withholdedDays: number;

	@ApiProperty({
		description: 'Fish card color',
		required: false,
		example: '#ffffff',
	})
	@IsOptional()
	@IsHexColor({})
	public readonly color: string;
}
