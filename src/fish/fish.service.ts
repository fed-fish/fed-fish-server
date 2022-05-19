import {
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { AddFishDto } from "./dto/add-fish.dto";
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
			throw new HttpException(
				'Fish not found',
				HttpStatus.BAD_REQUEST
			);
		}

		return fish;
	}
}
