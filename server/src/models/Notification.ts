import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

// Models
import User from "./User";

@Table({
    tableName: "notifications"
})

class Notification extends Model {
    // Title
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare title: string

    // Description
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare description: string
    
    // Type
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(
            "Goal",
            "Transaction",
            "Reminder",
            "System"
        )
    })
    declare type: string

    // Status
    @AllowNull(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare read: boolean

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Notification;