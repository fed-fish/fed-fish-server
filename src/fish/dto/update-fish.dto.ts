import { IsBoolean } from "class-validator";

export class UpdateFishDto {
	@IsBoolean()
	public readonly feedingStatus: boolean;
}
