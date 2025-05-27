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

    // Monthly Budget
    @AllowNull(true)
    @Default(0)
    @Column({
        type: DataType.DECIMAL(10, 2)
    })
    declare monthlyBudget: number

    // Relationship with <User>
    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user : User
}

export default Category;