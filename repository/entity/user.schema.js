import { EntitySchema } from "typeorm";
import {User} from "../model/user.model.js"

let UserSchemas = new EntitySchema({
    name: "User",
    target: User,
    columns:{
        id:{
            primary:true,
            type:"int",
            generated: true
        },
        username: {
            type:"varchar"
        },
        password: {
            type:"varchar"
        },
        email:{
            type:"varchar"
        },
        firstname:{
            type:"varchar"
        },
        lastname:{
            type:"varchar"
        },
        tel:{
            type:"varchar"
        },

        access_key:{
            type:"varchar",
            nullable:true
        },
        refresh_key:{
            type:"varchar",
            nullable:true
        },
        created_at:{
            type:"date"
        },
        updated_at:{
            type:"date"
        },
        role:{
            type:"varchar"
        },
        is_active:{
            type:"bool"
        }
    }
})

// /**
//  * @param {EntitySchema} schema
//  */
// export default (schema) => {
//     const user  = new schema({
//         name: "User",
//         target: User,
//         columns: {
//             id:{
//                 primary: true,
//                 type: "int",
//                 generated: true,
//             }
//         }
//     })

// }

export default UserSchemas