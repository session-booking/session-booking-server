import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Service} from "./service.model";
import {User} from "./user.model";
import {TimeSlot} from "./timeSlot.model";

@Table
export class Booking extends Model {

    @Column({field: 'client_name'})
    get clientName(): string {
        return this.getDataValue('clientName');
    }

    set clientName(value: string) {
        this.setDataValue('clientName', value);
    }

    @Column({field: 'client_email'})
    get clientEmail(): string {
        return this.getDataValue('clientEmail');
    }

    set clientEmail(value: string) {
        this.setDataValue('clientEmail', value);
    }

    @Column({field: 'client_phone'})
    get clientPhone(): string {
        return this.getDataValue('clientPhone');
    }

    set clientPhone(value: string) {
        this.setDataValue('clientPhone', value);
    }

    @Column({field: 'date'})
    get date(): Date {
        return this.getDataValue('date');
    }

    set date(value: Date) {
        this.setDataValue('date', value);
    }

    @Column({field: 'start_time'})
    get startTime(): string {
        return this.getDataValue('startTime');
    }

    set startTime(value: string) {
        this.setDataValue('startTime', value);
    }

    @Column({field: 'end_time'})
    get endTime(): string {
        return this.getDataValue('endTime');
    }

    set endTime(value: string) {
        this.setDataValue('endTime', value);
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

    @ForeignKey(() => Service)
    @Column({field: 'service_id'})
    get serviceId(): number {
        return this.getDataValue('serviceId');
    }

    set serviceId(value: number) {
        this.setDataValue('serviceId', value);
    }

    @BelongsTo(() => Service)
    service: Service;

    @ForeignKey(() => TimeSlot)
    @Column({field: 'time_slot_id'})
    get timeSlotId(): number {
        return this.getDataValue('timeSlotId');
    }

    set timeSlotId(value: number) {
        this.setDataValue('timeSlotId', value);
    }

    @BelongsTo(() => TimeSlot, {
        onDelete: "CASCADE",
        hooks: true
    })
    timeSlot: TimeSlot;

}