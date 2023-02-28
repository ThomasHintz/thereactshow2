const sqlite3 = require('sqlite3');
const util    = require('util');

const migrations = [
  {
    key: 1,
    name: 'create table users',
    sql: [`create table users (
id integer primary key autoincrement,
email text not null,
salt text not null,
password_hash text not null
    )`]
  },
  {
    key: 3,
    name: 'create table sessions',
    sql: [`create table sessions (
id integer primary key autoincrement,
user_id integer not null,
session_id text not null,
expires integer not null,
foreign key (user_id) references users (id)
    )`]
  },
  {
    key: 4,
    name: 'create table episodes',
    sql: [`create table episodes (
id integer primary key autoincrement,
number integer,
content text,
summary text,
slug text,
season integer,
episode integer,
duration integer,
filename text,
title text,
episode_type text,
buzzsprout_id text,
buzzsprout_url text,
pub_date text,
youtube_url text,
transcript_filename text
  )`]
  }
];

const checkForMigrationsSql = `select key from migrations where run='True' order by key`;

async function runMigrations(db) {
  console.log('turn on foreign keys');
  await db.exec('PRAGMA foreign_keys = ON;');
  console.log('running migrations');
  const rows = await db.all(checkForMigrationsSql)
  const runMigrations = rows.map(({ key }) => key);
  console.log(runMigrations);
  let toRun = [];
  migrations.forEach(({ key, name, sql }) => {
    if (!runMigrations.includes(key)) {
      toRun.push({ key, name, sql });
    }
  });
  console.log('Migrations to run:', toRun.map(({ name }) => name));
  await db.exec(toRun.reduce((prev, { sql, key }) => `${prev} ${sql.join(';')} ; insert into migrations (key, run) values (${key}, 'True') ;`, ''));
  console.log('migrations run');
    /* db.all(checkForMigrationsSql, (err, rows) => {
     *   console.log('xx')
     *   const runMigrations = rows.map(({ key }) => key);
     *   console.log(runMigrations);
     *   let toRun = [];
     *   migrations.forEach(({ key, name, sql }) => {
     *     if (!runMigrations.includes(key)) {
     *       toRun.push({ key, name, sql });
     *     }
     *   });
     *   console.log('Migrations to run:', toRun.map(({ name }) => name));
     *   db.exec(toRun.reduce((prev, { sql, key }) => `${prev} ${sql.join(';')} ; insert into migrations (key, run) values (${key}, 'True') ;`, ''), () => {
     *     console.log('migrations run');
     *   });
     * }); */
};

const createMigrationTable = `create table migrations (
          id integer primary key autoincrement,
          key integer not null,
          run boolean not null
)`;

let db = new sqlite3.Database('./db.sqlite3', sqlite3.OPEN_READWRITE, async (err) => {
  if (err && err.code == "SQLITE_CANTOPEN") {
    db = new sqlite3.Database('./db.sqlite3', async (err) => {
      if (err) {
        console.log("Getting error " + err);
      }
      console.log('database created');
      console.log('creating migration table')
      db.exec(createMigrationTable, async ()  => {
        await runMigrations(db);
      });
    });
    if (err) {
      console.error(err.message);
    }
  } else if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
    await runMigrations(db);
  }
});

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);
db.exec = util.promisify(db.exec);

export default db;
