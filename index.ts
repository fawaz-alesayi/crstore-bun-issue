import { crr, primary } from "crstore";
import { boolean, object, string } from "superstruct";
import { database } from "crstore";
import Os from 'os';
import { Database } from 'bun:sqlite';

const macOS = Os.platform() === "darwin";

if (macOS) {
    /**
     * By default, macOS ships with Apple's proprietary build of SQLite
     * which doesn't support extensions. 
     * To use extensions, you'll need to install a vanilla build of SQLite.
     * Reference: https://bun.sh/docs/api/sqlite#loadextension
     */
    Database.setCustomSQLite("/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib");
}

// Struct that represents the table
const todos = object({
  id: string(),
  title: string(),
  text: string(),
  completed: boolean(),
});
crr(todos); // Register table with conflict-free replicated relations
primary(todos, "id"); // Define a primary key (can be multi-column)

const schema = object({ todos });

const { close } = database(schema);

close();