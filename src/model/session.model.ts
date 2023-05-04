import {Table, Column, Model, ForeignKey, BelongsTo} from "sequelize-typescript";
import {User} from "./user.model";

@Table
export class Session extends Model {

    @Column({field: 'date'})
    get date(): Date {
        return this.getDataValue("date");
    }

    set date(value: Date) {
        this.setDataValue("date", value);
    }

    @Column({field: 'open'})
    get open(): boolean {
        return this.getDataValue("open");
    }

    set open(value: boolean) {
        this.setDataValue("open", value);
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

    @Column({field: 'client_email'})
    get clientEmail(): string {
        return this.getDataValue("clientEmail");
    }

    set clientEmail(value: string) {
        this.setDataValue("clientEmail", value);
    }

    @Column({field: 'client_name'})
    get clientName(): string {
        return this.getDataValue("clientName");
    }

    set clientName(value: string) {
        this.setDataValue("clientName", value);
    }

    @Column({field: 'color'})
    get color(): string {
        return this.getDataValue("color");
    }

    set color(value: string) {
        this.setDataValue("color", value);
    }

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

}