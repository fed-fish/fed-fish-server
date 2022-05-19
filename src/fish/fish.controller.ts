import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ObjectId } from "mongoose";

import { AddFishDto } from "./dto/add-fish.dto";
import { UpdateFishDto } from "./dto/update-fish.dto";
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

	@Get()
	public async fish(): Promise<Fish[]> {
		return await this._fishService.fish();
	}

	@Get('/:id')
	public async fishInfo(
		@Param('id')
		id: ObjectId
	): Promise<Fish> {
		return await this._fishService.fishInfo(id);
	}

	@Patch('/:id')
	public async updateFish(
		@Param('id')
		id: ObjectId,

		@Body()
		dto: UpdateFishDto
	): Promise<Fish> {
		return await this._fishService.updateFish(id, dto);
	}

	@Delete('/:id')
	public async deleteFish(
		@Param('id')
		id: ObjectId
	): Promise<ObjectId> {
		return await this._fishService.deleteFish(id);
	}
}
