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
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

}