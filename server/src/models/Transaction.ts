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
import Category from "./Category";

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
        type: DataType.DECIMAL(10, 2)
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

    // Relationship with <Category>
    @BelongsTo(() => Category)
    declare category: Category

    @ForeignKey(() => Category)
    declare categoryId: number

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Transaction;