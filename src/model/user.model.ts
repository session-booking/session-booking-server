import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {Session} from "./session.model";
import {TimeSlot} from "./timeSlot.model";
import {Service} from "./service.model";
import {Booking} from "./booking.model";

@Table
export class User extends Model {

    @Column({field: 'username'})
    get username(): string {
        return this.getDataValue("username");
    }

    set username(value: string) {
        this.setDataValue("username", value);
    }

    @Column({field: 'email'})
    get email(): string {
        return this.getDataValue("email");
    }

    set email(value: string) {
        this.setDataValue("email", value);
    }

    @Column({field: 'phone_number'})
    get phoneNumber(): string {
        return this.getDataValue("phoneNumber");
    }

    set phoneNumber(value: string) {
        this.setDataValue("phoneNumber", value);
    }

    @Column({field: 'password'})
    get password(): string {
        return this.getDataValue("password");
    }

    set password(value: string) {
        this.setDataValue("password", value);
    }

    @HasMany(() => Session)
    sessions: Session[];

    @HasMany(() => TimeSlot)
    timeSlots: TimeSlot[];

    @HasMany(() => Service)
    services: Service[];

    @HasMany(() => Booking)
    bookings: Booking[];

}