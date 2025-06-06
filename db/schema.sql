DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, 
    done BOOLEAN NOT NULL,
    user_id INTEGER NOT NULL
    
)
