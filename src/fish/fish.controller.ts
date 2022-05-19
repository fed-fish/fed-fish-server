import {
	Body,
	Controller,
	Post,
} from "@nestjs/common";

import { AddFishDto } from "./dto/add-fish.dto";
import { FishService } from "./fish.service";
import { Fish } from "./schema/fish.schema";

@Controller('/fish')
export class FishController {
	public constructor(
		private _fishService: FishService
	) {}

	@Post()
	public async addFish(
		@Body()
		dto: AddFishDto
	): Promise<Fish> {
		return await this._fishService.addFish(dto);
	}
}
