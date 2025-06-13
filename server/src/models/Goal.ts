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
    tableName: "goals"
})

class Goal extends Model {
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

    // Category
    @AllowNull(false)
    @Default("Other")
    @Column({
        type: DataType.STRING
    })
    declare category: string

    // Color
    @AllowNull(true)
    @Default("Green")
    @Column({
        type: DataType.STRING
    })
    declare color: string

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Goal;