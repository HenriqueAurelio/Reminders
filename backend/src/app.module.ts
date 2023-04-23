import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ReminderRepository } from './repositories/reminder-repository';
import { PrismaReminderRepository } from './repositories/prisma/prisma-reminder-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService,
    {
      provide: ReminderRepository,
      useClass: PrismaReminderRepository
    }],
})
export class AppModule { }
