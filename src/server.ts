import config from './app/config';
import app from './app';
import mongoose from 'mongoose';
import { Server } from 'http';

let server = Server;

async function main() {
  try {
    mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// Promise.reject();

process.on('uncaughtException', () => {
  console.log(`UnhandledRejection is detected, shutting down...`);
  process.exit(1);
});

console.log(x);
