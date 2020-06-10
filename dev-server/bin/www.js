import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './../app';

dotenv.config({ path: path.resolve('./.env') });

//DB PATH
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//Port
const port = process.env.PORT || 5000;

// DATABASE CONNECTION
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// START SERVER
app.listen(port, () => console.log(`App is running at http://localhost:${port}`));
