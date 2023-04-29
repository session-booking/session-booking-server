import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Session extends Model {

    @Column
    get date(): Date {
        return this.getDataValue("date");
    }

    set date(value: Date) {
        this.setDataValue("date", value);
    }

    @Column
    get open(): boolean {
        return this.getDataValue("open");
    }

    set open(value: boolean) {
        this.setDataValue("open", value);
    }

    @Column
    get start_time(): string {
        return this.getDataValue("start_time");
    }

    set start_time(value: string) {
        this.setDataValue("start_time", value);
    }

    @Column
    get end_time(): string {
        return this.getDataValue("end_time");
    }

    set end_time(value: string) {
        this.setDataValue("end_time", value);
    }

    @Column
    get client_email(): string {
        return this.getDataValue("client_email");
    }

    set client_email(value: string) {
        this.setDataValue("client_email", value);
    }

    @Column
    get client_name(): string {
        return this.getDataValue("client_name");
    }

    set client_name(value: string) {
        this.setDataValue("client_name", value);
    }

    @Column
    get color(): string {
        return this.getDataValue("color");
    }

    set color(value: string) {
        this.setDataValue("color", value);
    }

}