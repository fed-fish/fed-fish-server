import {
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";

import {
	Model,
	ObjectId,
} from "mongoose";

import { InjectModel } from "@nestjs/mongoose";

import { AddFishDto } from "./dto/add-fish.dto";
import { UpdateFishDto } from "./dto/update-fish.dto";
import { Fish, FishDocument } from "./schema/fish.schema";

@Injectable()
export class FishService{
	public constructor(
		@InjectModel(Fish.name)
		private _fishModel: Model<FishDocument>
	) {}

	public async addFish(dto: AddFishDto): Promise<Fish> {
		const newFish = await this._fishModel.create({ ...dto });

		return newFish;
	}

	public async fish(): Promise<Fish[]> {
		const fish = await this._fishModel.find();

		return fish;
	}

	public async fishInfo(id: ObjectId): Promise<Fish> {
		const fish = await this._fishModel.findById(id);

		if (fish === null) {
			makeFishNotFoundError();
		}

		return fish;
	}

	public async updateFish(id: ObjectId, dto: UpdateFishDto): Promise<Fish> {
		const fishToUpdate = await this._fishModel.findById(id);

		if (fishToUpdate === null) {
			makeFishNotFoundError();
		}

		const { feedingStatus } = dto;

		return await this._updateDays(feedingStatus, fishToUpdate).save();
	}

	public async deleteFish(id: ObjectId): Promise<ObjectId> {
		const fishToDelete = await this._fishModel.findById(id);

		if (fishToDelete === null) {
			makeFishNotFoundError();
		}

		await fishToDelete.delete();

		return fishToDelete._id;
	}

	private _updateDays(feedingStatus: boolean, fish: FishDocument): FishDocument {
		if (feedingStatus) {
			fish.fedDays += 1;
			fish.withholdedDays = 0;

			if (fish.fedDays > fish.feedingDays) {
				fish.fedUp = true;
				fish.withholdedUp = false;
			}
		}

		if (!feedingStatus) {
			fish.withholdedDays += 1;
			fish.fedDays = 0;

			if (fish.withholdedDays > fish.withholdingDays) {
				fish.withholdedUp = true;
				fish.fedUp = false;
			}
		}

		return fish;
	}
}

function makeFishNotFoundError(): never {
	throw new HttpException(
		'Fish not found',
		HttpStatus.BAD_REQUEST
	);
}
