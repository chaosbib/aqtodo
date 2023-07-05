import { Sequelize } from 'sequelize-typescript'
import { Todo } from '../model/todo.model';
import 'dotenv/config';

export const connect = () => {

  const database_url = process.env.DATABASE_URL || '';
  const dialect: any = process.env.DIALECT || 'postgres';

  console.log('dialect  ', dialect);

  const sequelize = new Sequelize(database_url, {
    dialect,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    },
    logging: true
  });

  sequelize.addModels([Todo]);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.sequelize.sync();
  
  return db;

}