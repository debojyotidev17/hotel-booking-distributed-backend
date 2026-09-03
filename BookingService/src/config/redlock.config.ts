import Redlock from "redlock";
import redis from "./redis.config.js";

const redlock = new Redlock([redis]);

export default redlock;
