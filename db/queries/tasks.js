import db from "#db/client";

export async function createTask({title, done, user_id}){
    const sql = 
        `INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *;`

    const {rows:[task]} = await db.query(sql, [title, done, user_id])
    return task
}

export async function getTasks({user_id}){
    const sql = `
    SELECT * FROM tasks WHERE user_id = $1;
    `
    const {rows: tasks} = await db.query(sql, [user_id]) 
    return tasks
}

export async function getTask({id}){
    const sql =`
    SELECT * FROM tasks WHERE id = $1
    `
    const {rows: [task]} = await db.query(sql, [id])
    return task
}

export async function updateTask ({title, done, id}){
    const sql =`
    UPDATE tasks
    SET title = $1, done = $2
    WHERE id = $3
    RETURNING *;
    `
    const {rows: [task]} = await db.query(sql, [title, done, id])
    return task
}

export async function deleteTask ({id}){
    const sql = `
    DELETE FROM tasks WHERE id = $1
    `
    const {rows: [task]} = await db.query(sql, [id])
    return task
}