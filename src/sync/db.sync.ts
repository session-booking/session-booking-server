import { connect } from "../config/db.config";
import {APILogger} from "../logger/api.logger";


const db = connect();
const logger = new APILogger();

// sync() is used to synchronize your Sequelize model with your database tables
// 'force: true' re-creates the table on sync - it is dangerous, because it will delete all of your data
// used mostly for development purposes
db.sequelize.sync({ force: true }).then(() => {
    logger.info('drop and re-sync db', undefined);
}).catch((error) => {
    logger.error('error::' + error, null);
});