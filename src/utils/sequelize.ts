import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export default new Sequelize(process.env.DBURL as string, {
    dialect: 'postgres',
    protocol: 'posgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: true
});

