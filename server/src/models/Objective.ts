import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    AllowNull,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";

// Models
import User from "./User";

@Table({
    tableName: "objectives"
})

class Objective extends Model {
    // Title
    @AllowNull(false)
    @Column({
        type: DataType.STRING(70)
    })
    declare title: string

    // Description
    @AllowNull(true)
    @Column({
        type: DataType.STRING(255)
    })
    declare description: string

    // Amount
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare amount: number

    // Deadline
    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    declare deadline: string

    // State
    @AllowNull(false)
    @Default("InProgress")
    @Column({
        type: DataType.ENUM("Completed", "InProgress", "Expired")
    })
    declare state: string

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Objective;