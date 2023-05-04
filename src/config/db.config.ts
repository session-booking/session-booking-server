import { Sequelize } from "sequelize-typescript";
import { Session } from "../model/session.model";
import {User} from "../model/user.model";

export const connect = () => {
    const host = process.env.POSTGRES_HOST;
    const port = process.env.POSTGRES_PORT;
    const username = process.env.POSTGRES_USERNAME;
    const password = process.env.POSTGRES_PASSWORD;
    const database = process.env.POSTGRES_DATABASE;
    const dialect: any = process.env.POSTGRES_DIALECT;

    const operatorsAliases: any = false;

    const sequelize = new Sequelize(database, username, password, {
        host: host,
        port: Number(port),
        // a dialect is the language that we use to talk to the database
        dialect: dialect,
        // an alias is a temporary alternative name for columns, tables, views, materialized views, etc. in a query
        operatorsAliases: operatorsAliases,
        // the repository mode makes it possible to separate static operations like find, create, ... 
        // ... from model definitions. It also empowers models so that they can be used with multiple sequelize instances
        repositoryMode: true,
        pool: {
            // maximum number of connection in pool
            max: 10,
            // minimum number of connection in pool
            min: 0,
            // the maximum time, in milliseconds, that pool will try to get connection before throwing error
            acquire: 20000,
            // the maximum time, in milliseconds, that a connection can be idle before being released
            idle: 5000
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    sequelize.addModels([Session, User]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db;
}