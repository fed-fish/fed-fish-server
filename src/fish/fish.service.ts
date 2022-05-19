import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

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
}
