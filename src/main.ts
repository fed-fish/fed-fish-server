import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import { AppModule } from './app.module';

config();

const port = process.env.PORT || 3333;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.useGlobalPipes(new ValidationPipe);

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
bootstrap();
