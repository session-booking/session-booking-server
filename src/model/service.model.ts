import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table
export class Service extends Model {

    @Column({field: 'name'})
    get name(): string {
        return this.getDataValue('name');
    }

    set name(value: string) {
        this.setDataValue('name', value);
    }

    @Column({field: 'length'})
    get length(): number {
        return this.getDataValue('length');
    }

    set length(value: number) {
        this.setDataValue('length', value);
    }

    @ForeignKey(() => User)
    @Column({field: 'user_id'})
    get userId(): number {
        return this.getDataValue('userId');
    }

    set userId(value: number) {
        this.setDataValue('userId', value);
    }

    @BelongsTo(() => User, {
        onDelete: "CASCADE",
        hooks: true
    })
    user: User;

}