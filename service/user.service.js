import {User} from "../repository/model/user.model.js";
import db from "../repository/database.js";

const userRepository = db.typeorm.getRepository(User)

const UserService = {
    async register(payload){
        try{
            let new_user = new User()
            new_user.username = payload.username
            new_user.email = payload.email
            new_user.firstname = payload.firstname
            new_user.lastname = payload.lastname
            new_user.password = payload.password
            new_user.table_id = null
            new_user.tel = payload.tel
            new_user.created_at = new Date()
            new_user.updated_at = new Date()
            new_user.role = payload.role
            new_user.is_active = false
            let user = await userRepository.save(new_user)
            return user
        }catch(err){
            console.log(err);
            throw(err)
        }
    },

    async getUserInfoById(id){
        try{
            let user = await userRepository.findOne({
                where:{
                    id: parseInt(id)
                }
            })
            console.log(user)
            return  user
        }catch(err){
            console.log(err);
            throw(err)
        }
    },

    async getAllUserInfo(){
        try{
            let users = await userRepository.find()
            return users
        }catch(err){
            console.log(err);
            throw(err)
        }
    },

    async updateUser(id,payload){
        try{
            let user = await userRepository.findOne({
                where:{
                    id:parseInt(id)
                },
            })
            if(!user){
                return {}
            }
            return await userRepository.save({
                ...user,
                ...payload,
            })
        }catch(err){
            console.log(err);
            throw(err)
        }
    },

    async deleteUser(id){
        try{
            let user = await userRepository.delete({
                id:id
            })

            return user
        }catch(err){
            console.log(err);
            throw(err)
        }
    },
    
    async checkUserByEmail(email){
        try{
            let user = await userRepository.findOne({
                where:{
                    email: email
                }
            })
            console.log(user);
            return user
        }catch(err){
            console.log(err);
            throw(err)
        }
    }
}

export default UserService