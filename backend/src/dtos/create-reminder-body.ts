import { IsNotEmpty, Length } from "class-validator"

export class CreateReminderBody {
    @IsNotEmpty()
    @Length(5, 100)
    description: string;

    @IsNotEmpty()
    date: string
}