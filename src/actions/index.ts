import { defineAction } from 'astro:actions';
import { db, isDbError, User } from 'astro:db';
import { z } from 'astro:schema';

export const server = {
  createUser: defineAction({
    input: z.object({ name: z.string() }),
    handler: async ({ name }) => {
      console.debug('createUser()', name);

      try {
        const user = await db.insert(User).values({ name }).returning().get(); // * throws LibsqlError `SQLITE_CONSTRAINT_UNIQUE` when user with name already exists.
        return user;
      } catch (err) {
        if (isDbError(err)) {
          console.warn('LibsqlError thrown:', err); // ! this never get's called, since `isDbError(err)` doesn't seem to work
          throw new Error('LibsqlError thrown');
        } else {
          console.error('Error thrown:', err);
          throw new Error('Unknown Error thrown');
        }
      }
    },
  }),
};
