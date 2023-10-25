import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column({ type: 'varchar' })
    username!: string

    @Column({ type: 'varchar' })
    password!: string

    @Column({ type: 'varchar' })
    email!: string

    @Column({ type: 'varchar' })
    firstName!: string

    @Column({ type: 'varchar' })
    lastName!: string

    @Column({ type: 'varchar' })
    tel!: string

    @Column({ type: 'varchar' })
    access_key?: string

    @Column({ type: 'varchar' })
    refresh_key!: string

    @Column({ type: 'date' })
    created_at!: Date
    
    @Column({ type: 'date' })
    updated_at!: Date

    @Column({ type: 'varchar' })
    role!: string

    @Column({ type: 'bool' })
    isActive!: boolean
}