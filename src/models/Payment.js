import { Model } from '@vuex-orm/core'
import Operation from '@/models/Operation'

export default class Payment extends Model{
  static entity = 'payments'

  static fields(){
    return {
      id: this.increment(),
      name: this.string(),
      description: this.string(),
      operations: this.hasMany(Operation, 'payment_id'),
    }
  }
}
