import { Model } from '@vuex-orm/core'
import User from '@/models/User'
import Operation from '@/models/Operation'

export default class Account extends Model {
  static entity = 'accounts'

  static fields() {
    return {
      id: this.increment(),
      user_id: this.number(1),
      account_type_id: this.number(1),
      currency_id: this.number(1),
      initial_amount: this.number(0),
      name: this.string(''),
      description: this.string(''),
      owner: this.belongsTo(User, 'user_id'),
      operations: this.hasMany(Operation, 'account_id')
    }
  }
}
