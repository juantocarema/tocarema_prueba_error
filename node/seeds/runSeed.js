import { Sequelize } from 'sequelize';
import db from '../database/db.js';
import { seedDatabase } from './seedData.js';

const run = async () => {
  try {
    await db.authenticate();
    console.log('Conectado a la base de datos');
    await seedDatabase();
    console.log('Seed ejecutado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  }
};

run();
