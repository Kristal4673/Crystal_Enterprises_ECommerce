require('dotenv').config();

const mysql = require('mysql2/promise')
const Sequelize = require('sequelize');


const host = 'localhost'
const user = process.env.DB_USER;
const password = process.env.DB_PW;
const database = process.env.DB_NAME

mysql.createConnection({ host, user, password })
.then(conn => conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`))

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database Connected')
  } catch (err) {
    console.log('unable to connect to database', err)
  }
}

connect()

module.exports = sequelize;
