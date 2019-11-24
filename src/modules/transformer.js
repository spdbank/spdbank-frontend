// transform json from xhb to valid data for this app

export const transformer = {

  result: {},
  homebank: {},

  transform(data){
    this.clear()
    this.homebank = data.homebank
    if(this.homebank){
      this.user()
      this.currencies()
      this.partners()
      this.categories()
      this.operations()
    }
    return this.result
  },

  clear(){
    this.result = {}
    this.homebank = {}
  },

  user(){
    const properties = this.homebank.properties
    if(properties){
      this.result.users = {
        name: properties.title,
        accounts: this.accounts()
      }
    }
  },

  accounts(){
    const account = this.homebank.account
    if(account){
      const result = account.map(acc => {
        return {
          id: acc.key,
          account_type_id: acc.type,
          currency_id: acc.curr,
          initial_amount: acc.initial,
          name: acc.name,
        }
      })
      return result
    }
  },

  currencies(){
    const cur = this.homebank.cur
    if(cur){
      this.result.currencies = cur.map(c => {
        return {
          id: c.key,
          default: (c.rate && c.rate !== '0') ? false : true,
          value: (c.rate && c.rate !== '0') ? c.rate : 1,
          name: c.name,
          ise: c.iso,
          symb: c.symb,
        }
      })
    }
  },

  partners(){
    const pay = this.homebank.pay
    if(pay){
      this.result.partners = pay.forEach(p => {
        return {
          id: p.key,
          name: p.name
        }
      })
    }
  },

  categories(){
    const cat = this.homebank.cat
    if(cat){
      const categories = []
      const subcategories = []
      cat.forEach(c => {
        if(c.parent){
          subcategories.push({
            id: c.key,
            category_id: c.parent,
            name: c.name,
          })
        } else {
          categories.push({
            id: c.key,
            name: c.name,
          })
        }
      })
      this.result.categories = categories
      this.result.subcategories = subcategories
    }
  },

  operations(){
    const ope = this.homebank.ope
    if(ope){
      this.result.operations = ope.map(o => {
        return {
          account_id: o.account,
          partner_id: o.payee,
          payment_id: o.paymode,
          operation_status_id: o.st,
          date: this.serialDateNumber_to_timestamp(o.date),
          items: this.items(o),
        }
      })
    }
  },

  items(operation){
    if(operation){
      const result = []
      if(operation.category){
        result.push({
          subcategory_id: operation.category,
          description: operation.info,
          amount: operation.amount,
        })
      } else if(operation.scat instanceof Array){
        const num = operation.scat.split('||').length
        for(let i = 0; i < num; i++){
          result.push({
            subcategory_id: operation.scat.split('||')[i],
            description: operation.smem.split('||')[i],
            amount: operation.samt.split('||')[i],
          })
        }
      }
      return result
    }
  },

  serialDateNumber_to_timestamp(sdn){
    const jan012000 = 730120
    const daysFromJan012000 = sdn - jan012000
    const timestampJan012000 = 946674000000
    const msecInDay = 1000 * 60 * 60 * 24
    return timestampJan012000 + daysFromJan012000 * msecInDay
  }
}
