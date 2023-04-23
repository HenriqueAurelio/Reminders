import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { ReminderRepository } from "../reminder-repository";
import { Injectable } from "@nestjs/common";
import { Reminder } from "src/Models/Reminder";


@Injectable()
export class PrismaReminderRepository implements ReminderRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(description: string, date: string): Promise<void> {
        await this.prisma.reminder.create({
            data: {
                id: randomUUID(),
                description,
                date,
            }
        })
    }

    async get(): Promise<Reminder[]> {
        return await this.prisma.reminder.findMany(
            {
                orderBy: [
                    {
                        date: 'desc',
                    },
                ]
            })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.reminder.delete({
            where: {
                id,
            },
        })
    }

    async getByDate(date: string): Promise<Reminder[]> {
        return await this.prisma.reminder.findMany({
            where: {
                date,
            },
        })
    }

    async deleteByDate(date: string): Promise<void> {
        await this.prisma.reminder.deleteMany({
            where: {
                date,
            },
        })
    }
}