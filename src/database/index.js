import { Database } from '@vuex-orm/core'
import User from '@/models/User'
import Account from '@/models/Account'

const database = new Database()

database.register(User)
database.register(Account)

export default database
