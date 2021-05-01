import mongoose from "mongoose";

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

let connected: Boolean;
export default function connect() {
  if (connected) return;

  const db = process.env.DB;

  mongoose
    .connect(db)
    .then(() => {
      console.log(`Connected to ${db}...`);
      connected = true;
    })
    .catch(() => console.log(`FAILED TO CONNECT TO ${db}`));
}
