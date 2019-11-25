import { Database } from '@vuex-orm/core'
import User from '@/models/User'
import Account from '@/models/Account'
import AccountType from '@/models/AccountType'
import Category from '@/models/Category'
import Currency from '@/models/Currency'
import Item from '@/models/Item'
import Operation from '@/models/Operation'
import OperationStatus from '@/models/OperationStatus'
import Partner from '@/models/Partner'
import Payment from '@/models/Payment'
import Subcategory from '@/models/Subcategory'

const database = new Database()

database.register(User)
database.register(Account)
database.register(AccountType)
database.register(Category)
database.register(Currency)
database.register(Item)
database.register(Operation)
database.register(OperationStatus)
database.register(Partner)
database.register(Payment)
database.register(Subcategory)

export default database
