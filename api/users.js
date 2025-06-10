import express from "express";
import { createUser, getUser } from "#db/queries/users";
import jwt from "jsonwebtoken"
const router = express.Router()
export default router
import bcrypt from "bcrypt"

// post /users/register

router.route("/register").post(async (req, res, next)=>{
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).send("Missing username or password")
    } 
    const users = await createUser ({username, password})
    const token = jwt.sign({id: users.id, username: users.username}, process.env.JWT_SECRET)

    res.status(200).send(token)
})

router.route("/login").post(async (req, res, next) =>{
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).send("Missing username and password")
    }
    const correctUserInfo = await getUser ({username})
    const correctMatch = await bcrypt.compare(password, correctUserInfo.password)

    if(!correctMatch) {
        return res.status(401).send("Incorrect login information")
    }
    const token = jwt.sign({id: correctUserInfo.id, username: correctUserInfo.username}, process.env.JWT_SECRET)
    res.status(200).send(token)
})