import {
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

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

		await fishToUpdate.update(
			id,
			{ ...dto },
		);

		return fishToUpdate;
	}

	public async deleteFish(id: ObjectId): Promise<ObjectId> {
		const fishToDelete = await this._fishModel.findById(id);

		if (fishToDelete === null) {
			makeFishNotFoundError();
		}

		await fishToDelete.delete();

		return fishToDelete._id;
	}
}

function makeFishNotFoundError(): never {
	throw new HttpException(
		'Fish not found',
		HttpStatus.BAD_REQUEST
	);
}
