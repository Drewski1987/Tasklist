import express from "express"
import jwt from "jsonwebtoken"
const router = express.Router()
import { verifyToken } from "#middleware/middleware"
import { getTasks, deleteTask, updateTaskId, createTask, getTask } from "#db/queries/tasks";
export default router

// Post /tasks

router.route("/").post(verifyToken, async (req, res, next)=>{
    const {title, done} = req.body

    if (!title || !done) {
        return res.status(400).send("Missing required body")
    }
    const newTask = await createTask({
        title: title,
        done: done, 
        user_id: req.user.id
    })
    res.status(200).send(newTask)
})

// Get /tasks

router.route("/").get(verifyToken, async (req, res, next)=>{
    const tasks = await getTasks({user_id: req.user.id})
    res.status(200).send(tasks)
})

//  Put /tasks/:id

router.route("/:id").put(verifyToken, async (req, res)=>{

    const {title, done} = req.body

    if (!title || !done) {
        return res.status(400).send("Missing requierd fields")
    }
    const id = Number(req.params.id)
    const acquiredTask = await getTask({id})

    if(!acquiredTask){
        return res.status(400).send("No new task acquired by user")
    }
    if (acquiredTask.user_id !== req.user.id){
        return res.status(400).send("User not assinged task")
    }
    
    
    const updateTask = await updateTaskId({
        title,
        done,
        id: id
    });
    
    res.send(updateTask);
})

// delete /tasks/:id

router.route("/:id").delete(verifyToken, async(req, res, next)=>{
    const id = Number(req.params.id)
    const acquiredTask = await getTask({id})

    if (!acquiredTask){
        return res.status(400).send("No task for this user")
    }
    if (acquiredTask.user_id !== req.user.id){
        return res.status(403).send("User not assigned task")
    }
    const removeTask = await deleteTask({id})
    res.send("Task removed")
})