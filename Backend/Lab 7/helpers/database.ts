// helpers/database.ts
import { Sequelize, QueryTypes } from 'sequelize';
import { config } from '../config';

// Create a single Sequelize instance
export const sequelize = new Sequelize(
  `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
);

// Define an async utility function to run SELECT queries
export const run_query = async (query: string, values: any) => {
  try {
    await sequelize.authenticate();
    let data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (err: any) {
    console.error(err, query, values);
    throw 'Database query error';
  }
};

// Define an async utility function to run INSERT queries
export const run_insert = async (sql: string, values: any) => {
  try {
    await sequelize.authenticate();
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.INSERT,
    });
    return data;
  } catch (err: any) {
    console.error(err, sql, values);
    throw 'Database query error';
  }
};