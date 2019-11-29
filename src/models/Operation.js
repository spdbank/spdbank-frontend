import { Model } from '@vuex-orm/core'
import Item from '@/models/Item'
import Account from '@/models/Account'
import Partner from '@/models/Partner'
import Payment from '@/models/Payment'
import OperationStatus from '@/models/OperationStatus'

import { relateProcessor } from '@/modules/relate_processor'

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
      items: this.hasMany(Item, 'operation_id'),
      account: this.belongsTo(Account, 'account_id'),
      partner: this.belongsTo(Partner, 'partner_id'),
      payment: this.belongsTo(Payment, 'payment_id'),
      operation_status: this.belongsTo(OperationStatus, 'operation_status_id'),
    }
  }

  static async insert(...args){
    await this.processRelates(args[0].data)
    return await super.insert(...args)
  }

  static async processRelates(data){
    if(data instanceof Array){
      return await Promise.all(await data.map(async d => await relateProcessor.processManyRelate(this, d)))
    } else {
      return await relateProcessor.processManyRelate(this, data)
    }
  }
}
