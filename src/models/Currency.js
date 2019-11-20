import { Model } from '@vuex-orm/core'
import Account from '@/models/Account'

export default class Currency extends Model {
  static entity = 'currencies'

  static fields(){
    return {
      id: this.increment(),
      default: this.boolean(false),
      value: this.number(1),
      name: this.string(''),
      iso: this.string(''),
      symb: this.string(''),
      accounts: this.hasMany(Account, 'currency_id'),
    }
  }
}
