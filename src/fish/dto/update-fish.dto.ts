import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from "class-validator";

export class UpdateFishDto {
	@ApiProperty({
		description: 'Was the fish fed today or not',
		example: true,
	})
	@IsBoolean()
	public readonly feedingStatus: boolean;
}
