import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

import { FishModule } from './fish/fish.module';

config();

const dbUrl = process.env.DB_URL || '';

@Module({
	imports: [
		MongooseModule.forRoot(dbUrl),
		FishModule,
	],
})
export class AppModule {}
