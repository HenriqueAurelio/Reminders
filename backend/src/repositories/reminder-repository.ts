import { Reminder } from "src/Models/Reminder";

export abstract class ReminderRepository {
    abstract create(description: string, date: string): Promise<void>
    abstract get(): Promise<Reminder[]>
    abstract delete(id: string): Promise<void>
    abstract getByDate(date: string): Promise<Reminder[]>
    abstract deleteByDate(date: string): Promise<void>

}