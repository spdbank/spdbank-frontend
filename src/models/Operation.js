import { Model } from '@vuex-orm/core'
import Item from '@/models/Item'

export default class Operation extends Model{
  static entity = "operations"

  static fields(){
    return {
      id: this.increment(),
      account_id: this.number(),
      partner_id: this.number(),
      payment_id: this.number(),
      operation_status_id: this.number(),
      date: this.number(),
      description: this.string(''),
    }
  }
}
