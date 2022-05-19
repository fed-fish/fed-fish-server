import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
	.setTitle('Fed fish')
	.setDescription('Fed fish API documentation')
	.setVersion('1.0.0')
	.build();

export function createDocumentation(app: INestApplication): void {
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('/api-docs', app, document, {
		explorer: true,
		customSiteTitle: 'API docs | Fed fish',
	});
}
