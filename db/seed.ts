import { db, User } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: 'anton',
      name: 'anton',
    },
  ]);
}
