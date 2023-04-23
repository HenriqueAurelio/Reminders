import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ReminderRepository } from './repositories/reminder-repository';
import { PrismaReminderRepository } from './repositories/prisma/prisma-reminder-repository';
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';


describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [PrismaService,
                {
                    provide: ReminderRepository,
                    useClass: PrismaReminderRepository
                }],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return empty array on a past date', async () => {
            await expect(appController.getReminderByDate('2020-04-24')).resolves.toStrictEqual([]);
        })

        it('should create a reminder for actual date', async () => {
            const actualDate = new Date()
            const reminder = {
                description: 'This is a test',
                date: actualDate
            }
            await expect(appController.postReminder(@Body = reminder)).resolves.toStrictEqual([]);
        })
    });
})