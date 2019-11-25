import { Model } from '@vuex-orm/core'
import Account from '@/models/Account'

export default class AccountType extends Model{
  static entity = 'account_types'

  static fields(){
    return {
      id: this.increment(),
      name: this.string(''),
      description: this.string(''),
      accounts: this.hasMany(Account, 'account_type_id')
    }
  }
}
