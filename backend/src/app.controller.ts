import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateReminderBody } from './dtos/create-reminder-body';
import { ReminderRepository } from './repositories/reminder-repository';

@Controller('api')
export class AppController {
  constructor(
    private reminderRepository: ReminderRepository
  ) { }

  @Post('reminder')
  async postReminder(@Body() body: CreateReminderBody) {

    const { description, date } = body

    await this.reminderRepository.create(description, date)
  }

  @Get('reminder')
  async getReminder() {
    return await this.reminderRepository.get()
  }

  @Delete('reminder/:id')
  async deleteReminder(@Param('id') id) {
    await this.reminderRepository.delete(id)
  }

  @Get('reminder/:date')
  async getReminderByDate(@Param('date') date) {
    return await this.reminderRepository.getByDate(date)
  }

  @Delete('reminder/deleteBy/:date')
  async deleteReminderByDate(@Param('date') date) {
    await this.reminderRepository.deleteByDate(date)
  }
}
