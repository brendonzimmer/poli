import mongoose from "mongoose";
import config from "config";

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

let connected: Boolean;
export default function () {
  if (connected) return;

  const db = config.get<string>("db");

  mongoose
    .connect(db)
    .then(() => {
      console.log(`Connected to ${db}...`);
      connected = true;
    })
    .catch(() => console.log(`FAILED TO CONNECT TO ${db}`));
}
