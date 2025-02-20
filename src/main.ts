import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleSeed } from './modules/roles/seed/role.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const roleSeed = app.get(RoleSeed);
  await roleSeed.onModuleInit();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
