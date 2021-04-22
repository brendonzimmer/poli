import faunadb from "faunadb";
const client = new faunadb.Client({ secret: "fnAEHY4fJxACCJhhsuyBl-jcAIzAMpbKH4uB_yWM" });

export const q = faunadb.query;
export default client;
