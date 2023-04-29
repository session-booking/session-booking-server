import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {

    @Column
    get username(): string {
        return this.getDataValue("username");
    }

    set username(value: string) {
        this.setDataValue("username", value);
    }

    @Column
    get email(): string {
        return this.getDataValue("email");
    }

    set email(value: string) {
        this.setDataValue("email", value);
    }

    @Column
    get phone_number(): string {
        return this.getDataValue("phone_number");
    }

    set phone_number(value: string) {
        this.setDataValue("phone_number", value);
    }

    @Column
    get password(): string {
        return this.getDataValue("password");
    }

    set password(value: string) {
        this.setDataValue("password", value);
    }

}