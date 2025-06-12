import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    AllowNull,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";

// Models
import User from "./User";
import Transaction from "./Transaction";

@Table({
    tableName: "categories"
})

class Category extends Model {
    // Name
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    // Type
    @AllowNull(false)
    @Default("Expense")
    @Column({
        type: DataType.ENUM("Income", "Expense")
    })
    declare type: string
    
    // Icon
    @AllowNull(true)
    @Default("DollarIcon")
    @Column({
        type: DataType.STRING
    })
    declare icon: string

    // Color
    @AllowNull(true)
    @Default("Gray")
    @Column({
        type: DataType.STRING
    })
    declare color: string

    // Description
    @AllowNull(true)
    @Default("")
    @Column({
        type: DataType.STRING(255)
    })
    declare description: string

    // Relationship with <Transactions[]>
    @HasMany(() => Transaction, {
        onUpdate: "SET NULL",
        onDelete: "SET NULL"
    })
    declare transactions: Transaction[]
    
    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Category;