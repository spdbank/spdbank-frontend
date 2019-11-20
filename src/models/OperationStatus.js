import { Model } from '@vuex-orm/core'
import Operation from '@/models/Operation'

export default class OperationStatus extends Model{
  static entity = 'operation_statuses'

  static fields(){
    return {
      id: this.increment(),
      name: this.string(),
      description: this.string(),
      operations: this.hasMany(Operation, 'operation_status_id'),
    }
  }
}
