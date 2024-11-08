import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
  },
  indexes: [{ on: ['name'], unique: true }],
});


// https://astro.build/db/config
export default defineDb({
  tables: { User }
});
