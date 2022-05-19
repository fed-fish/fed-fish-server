import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";

import mongoose from "mongoose";

@Schema()
export class Fish {
	@Prop({
		unique: true,
		required: true,
	})
	public name: string;

	@Prop({
		required: true,
	})
	public feedingDays: number;

	@Prop({
		required: true,
	})
	public withholdingDays: number;

	@Prop()
	public fedDays: number;

	@Prop()
	public withholdedDays: number;

	@Prop({
		default: false,
	})
	public feedingStatus: boolean;
}

export type FishDocument = Fish & mongoose.Document;
export const FishSchema = SchemaFactory.createForClass(Fish);
