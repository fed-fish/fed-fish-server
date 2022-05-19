import { IsNumber, IsString } from "class-validator";

export class AddFishDto {
	@IsString()
	public readonly name: string;

	@IsNumber()
	public readonly feedingDays: number;

	@IsNumber()
	public readonly withholdingDays: number;

	@IsNumber()
	public readonly fedDays: number;

	@IsNumber()
	public readonly withholdedDays: number;
}
