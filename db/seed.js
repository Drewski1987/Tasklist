import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";


await seed();



async function seed() {


  const users = [
  {username: "Maurice.Drew", password: "1234"},
  {username: "Mack.Mitchell", password: "5678"},
  {username: "Tom.Thumb", password: "9111"},

  ];
  for (const user of users){
    await createUser(user);
  }

const tasks = [
  {title: "Wash Cars", done: true, user_id: 0},
  {title: "Take out the trash", done: false, user_id: 0},
  {title: "Clean the windows", done: true, user_id: 1},
  {title: "Wash dishes", done: true, user_id: 0},
  {title: "Make the bed up", done: false, user_id: 2},
  {title: "Wash Clothes", done: true, user_id: 1},

];
for (const task of tasks){
  await createTask(task);
}



}

console.log("🌱 Database seeded.");

seed();

