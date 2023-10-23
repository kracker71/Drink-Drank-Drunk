export class User{
    constructor(id,username,password,email,firstname,lastname,tel,table_id,access_key,refresh_key,role,is_active){
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.firstname = firstname
        this.lastname = lastname
        this.tel = tel
        this.table_id = table_id
        this.access_key = access_key
        this.refresh_key = refresh_key
        this.role = role
        this.is_active = is_active
    }
}

// module.exports = {
//     User: User
// }