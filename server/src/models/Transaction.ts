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
import Objective from "./Objective";

@Table({
    tableName: "transactions"
})

class Transaction extends Model {
    // Title
    @AllowNull(false)
    @Column({
        type: DataType.STRING(70)
    })
    declare title: string

    // Amount
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    declare amount: number
    
    // Type
    @AllowNull(false)
    @Default("Expense")
    @Column({
        type: DataType.ENUM("Income", "Expense")
    })
    declare type: string

    // Date
    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    declare date: string

    // State
    @AllowNull(false)
    @Default("Completed")
    @Column({
        type: DataType.ENUM("Completed", "Pending")
    })
    declare state: string

    // Notes
    @AllowNull(true)
    @Column({
        type: DataType.STRING(80)
    })
    declare notes: string

    // Relationship with <Objective>
    @ForeignKey(() => Objective)
    @AllowNull(true)
    @Column({
        type: DataType.INTEGER
    })
    declare objectiveId?: number;

    @BelongsTo(() => Objective)
    declare objective?: Objective;

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Transaction;