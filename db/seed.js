import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();

await seed();



async function seed() {


  const users = await createUser ({
  username: "Maurice.Drew", password: "1234"
  })

  await createTask ({
    title: "Take out the trash", done: false, user_id: users.id 
  })
  
  await createTask ({

  title: "Make the bed up", done: false, user_id: users.id
})

  await createTask ({
    title: "Wash dishes", done: false, user_id: users.id
  })

  
}





console.log("🌱 Database seeded.");



