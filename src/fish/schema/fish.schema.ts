import {
	Prop,
	Schema,
	SchemaFactory,
} from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

import mongoose from "mongoose";

export const enum FeedingAction {
	Fed = 'Fed',
	Withholded = 'Withholded',
}

interface HistoryAction {
	actionType: FeedingAction;
	time: string;
}

@Schema({
	timestamps: true,
})
export class Fish {
	@ApiProperty({
		description: 'Fish name',
		example: 'Guppy',
	})
	@Prop({
		unique: true,
		required: true,
	})
	public name: string;

	@ApiProperty({
		description: 'How many days in a row the fish must be fed',
		example: 5,
	})
	@Prop({
		required: true,
	})
	public feedingDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish must not be fed',
		example: 1,
	})
	@Prop({
		required: true,
	})
	public withholdingDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish was fed',
		example: 3,
	})
	@Prop()
	public fedDays: number;

	@ApiProperty({
		description: 'How many days in a row the fish was not fed',
		example: 0,
	})
	@Prop()
	public withholdedDays: number;

	@ApiProperty({
		description: 'Was the fish fed up for the whole period',
		default: false,
		example: false,
	})
	@Prop({
		default: false,
	})
	public fedUp: boolean;

	@ApiProperty({
		description: 'Was the fish withholded from feeding for the whole period',
		default: false,
		example: false,
	})
	@Prop({
		default: false,
	})
	public withholdedUp: boolean;

	@ApiProperty({
		description: 'Fish card color',
		default: '#75b585',
		example: '#75b585',
	})
	@Prop({
		default: '#75b585',
	})
	public color: string;

	@ApiProperty({
		description: 'History of feeding',
		example: [
			{
				actionType: 'Fed',
				time: '2022-02-26T16:37:48.244Z',
			},
		],
	})
	@Prop()
	public feedingHistory: HistoryAction[];
}

export type FishDocument = Fish & mongoose.Document;
export const FishSchema = SchemaFactory.createForClass(Fish);
