import { Model } from '@vuex-orm/core'
import Account from '@/models/Account'

export default class User extends Model {
  static entity = 'users'

  static fields() {
    return {
      id: this.increment(),
      name: this.string(''),
      login: this.string(''),
      password: this.string(''),
      accounts: this.hasMany(Account, 'user_id')
    }
  }
}
