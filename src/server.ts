import config from './app/config';
import app from './app';
import mongoose from 'mongoose';

async function main() {
  try {
    mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
