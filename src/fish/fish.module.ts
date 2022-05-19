import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FishController } from "./fish.controller";
import { FishService } from "./fish.service";
import { Fish, FishSchema } from "./schema/fish.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Fish.name,
				schema: FishSchema,
			},
		]),
	],
	providers: [FishService],
	controllers: [FishController],
})
export class FishModule {}
