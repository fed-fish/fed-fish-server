import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { createDocumentation } from './api-docs/config';

import { AppModule } from './app.module';

config();

const port = process.env.PORT || 3333;

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: process.env.CLIENT_URL,
	});

	app.useGlobalPipes(new ValidationPipe);

	createDocumentation(app);

	await app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
}
bootstrap();
