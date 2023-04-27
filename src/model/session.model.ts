import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class session extends Model {

    @Column
    date: Date;

    @Column
    open: boolean;

    @Column
    start_time: string;

    @Column
    end_time: string;

    @Column
    client_email: string;

    @Column
    client_name: string;

    @Column
    color: string;
    
}