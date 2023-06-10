import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table
export class TimeSlot extends Model {

    @Column({field: 'date'})
    get date(): Date {
        return this.getDataValue("date");
    }

    set date(value: Date) {
        this.setDataValue("date", value);
    }

    @Column({field: 'start_time'})
    get startTime(): string {
        return this.getDataValue("startTime");
    }

    set startTime(value: string) {
        this.setDataValue("startTime", value);
    }

    @Column({field: 'end_time'})
    get endTime(): string {
        return this.getDataValue("endTime");
    }

    set endTime(value: string) {
        this.setDataValue("endTime", value);
    }

    @ForeignKey(() => User)
    @Column({field: 'user_id'})
    get userId(): number {
        return this.getDataValue('userId');
    }

    set userId(value: number) {
        this.setDataValue('userId', value);
    }

    @BelongsTo(() => User)
    user: User;

}