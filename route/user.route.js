import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router()

router.post("/register",UserController.register)

router.post("/login",UserController.login)

router.post("/logout",UserController.logout)

router.get("/checklogin",UserController.checkLogin)

router.get("/all",UserController.getAllUserInfo)

router.get("/:id",UserController.getUserInfoById)

router.put("/:id",UserController.updateUser)

router.delete("/:id",UserController.deleteUser)

export default router