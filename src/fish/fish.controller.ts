import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ObjectId } from "mongoose";

import { AddFishDto } from "./dto/add-fish.dto";
import { UpdateFishDto } from "./dto/update-fish.dto";
import { FishService } from "./fish.service";
import { Fish } from "./schema/fish.schema";

@ApiTags('Fish')
@Controller('/fish')
export class FishController {
	public constructor(
		private _fishService: FishService
	) {}

	@ApiOperation({
		summary: 'Add new fish for tracking',
	})
	@ApiResponse({
		status: 200,
		type: Fish,
	})
	@Post()
	public async addFish(
		@Body()
		dto: AddFishDto
	): Promise<Fish> {
		return await this._fishService.addFish(dto);
	}

	@ApiOperation({
		summary: 'Get all fish',
	})
	@ApiResponse({
		status: 200,
		type: [Fish],
	})
	@Get()
	public async fish(): Promise<Fish[]> {
		return await this._fishService.fish();
	}

	@ApiOperation({
		summary: 'Get single fish',
	})
	@ApiResponse({
		status: 200,
		type: Fish,
	})
	@Get('/:id')
	public async fishInfo(
		@Param('id')
		id: ObjectId
	): Promise<Fish> {
		return await this._fishService.fishInfo(id);
	}

	@ApiOperation({
		summary: 'Update fish feeding status',
	})
	@ApiResponse({
		status: 200,
		type: Fish,
	})
	@Patch('/:id')
	public async updateFish(
		@Param('id')
		id: ObjectId,

		@Body()
		dto: UpdateFishDto
	): Promise<Fish> {
		return await this._fishService.updateFish(id, dto);
	}

	@ApiOperation({
		summary: 'Delete fish from tracking',
	})
	@ApiResponse({
		status: 200,
		type: String,
	})
	@Delete('/:id')
	public async deleteFish(
		@Param('id')
		id: ObjectId
	): Promise<ObjectId> {
		return await this._fishService.deleteFish(id);
	}
}
