import UserService from "../service/user.service.js";
import jwt from "jsonwebtoken"
import jwt_decode from "jwt-decode"
import { User } from "../repository/model/user.model.js";


const UserController = {
	async register(req, res, next) {
		const payload = req.body;
		try {
			// let check = await UserService.checkPayload(payload);
			// if (!check.status) {
			// 	res.status(500).send({
			// 		status: 500,
			// 		message: "Internal Server Error",
			// 	});
			// }
      console.log(payload);
			const result = await UserService.register(payload);
			return res.status(200).send({
				status: 200,
				data: result,
			});
		} catch (err) {
			res.status(500).send({
				status: 500,
				message: "Internal Server Error",
			});
		}
	},

	async getUserInfoById(req, res, next) {
    try{
      const {id} = req.params
      const user = await UserService.getUserInfoById(id)
      return res.status(200).send({
        status: 200,
        data: user
      })
    }catch(err){
      return res.status(500).send({
        status:500,
        message: "Internal Server Error"
      })
    }
	},

  async getAllUserInfo(req,res,next){
    try{
      const users = await UserService.getAllUserInfo()
      return res.status(200).send({
        status: 200,
        data: users
      })
    }catch(err){
      return res.status(500).send({
        status:500,
        message: "Internal Server Error"
      })
    }
  },

  async updateUser(req,res,next){
    try{
      let {id} = req.params
      const payload = req.body
      payload.updated_at = new Date()
      const result = await UserService.updateUser(id,payload)
      return res.status(200).send({
        status:200,
        data: result
      })
    }catch(err){
      return res.status(500).send({
        status:500,
        message: "Internal Server Error"
      })
    }
  },

  async deleteUser(req,res,next){
    try{
      const {id} = req.params
      const result = await UserService.deleteUser(id)
      return res.status(200).send({
        status:200,
        data: result
      })
    }catch(err){
      return res.status(200).send({
        status: 500,
        message: "Internal Server Error"
      })
    }
  },

  async login(req,res,next){
    try{
      const {email,password} = req.body
      let user = await UserService.checkUserByEmail(email)
      if(!user){
        return res.status(400).send({
          status: 400,
          message: "User not found"
        })
      }
      if(password != user.password){
        return res.status(400).send({
          status: 400,
          message: "Email/Password not match"
        })
      }

      const PRIVATE_KEY =
        "teet"
      const ACCESS_EXPIRE = "30d"
      const REFRESH_EXPIRE = "7d"

      const generateToken = (payload, type = null) => {
        if (type)
          return jwt.sign(payload, PRIVATE_KEY, { expiresIn: REFRESH_EXPIRE })
        return jwt.sign(payload, PRIVATE_KEY, { expiresIn: ACCESS_EXPIRE })
      }

      let [token,refresh] = [
        generateToken({
          username: user.username,
          id: user.id,
          email: user.email,
          role: user.role
        }),
        generateToken(
          {
            username: user.username,
            id:user.id,
            email: user.email,
            role: user.role
          },
          "refresh_token"
        )
      ]
      let payload = {
        access_key: token,
        refresh_key: refresh
      }

      console.log(payload)
      await UserService.updateUser(user.id,payload)
      let updated_user = UserService.getUserInfoById(user.id)
      return res.status(200).send({
        status: 200,
        data: updated_user
      })

    }catch(err){
      console.log(err);
      return res.status(500).send({
        status: 500,
        message: "Internal Server Error"
      })
    }
  },

  async logout(req,res,next){
    try{
      let token = req.headers.authorization
      let info = jwt_decode(token)
      let id = info.id
      let user = await UserService.getUserInfoById(id)
      if(!user){
        return res.status(400).send({
          status:400,
          message:"User not found"
        })
      }
      let payload = {
        access_key: null,
        refresh_key: null
      }
      await UserService.updateUser(id,payload)
      return res.status(200).send({
        status:200,
        message:"Logout successfully"
      })

    }catch(err){
      return res.status(500).send({
        status: 500,
        message: "Internal Server Error"
      })
    }
  },

  async checkLogin(req,res,next){
    try{
      let token = req.headers.authorization
      console.log(token)
      let info = jwt_decode(token)
      let id = info.id
      let user = await UserService.getUserInfoById(id)
      if(!user){
        return res.status(200).send({
          status:200,
          data:{
            is_login: false
          }
        })
      }
      return res.status(200).send({
        status:200,
        data:{
          is_login: true
        }
      })
    }catch(err){
      return res.status(500).send({
        status: 500,
        message: "Internal Server Error"
      })
    }
  }

};

export default UserController
