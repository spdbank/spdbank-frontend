// transform json from xhb to valid data for this app

export const transformer = {

  result: {},
  homebank: {},

  transform(data){
    this.clear()
    this.homebank = data.homebank
    if(this.homebank){
      this.user()
      this.accounts()
      this.currencies()
      this.partners()
      this.categories()
      this.items()
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
      }
    }
  },

  accounts(){
    const account = this.homebank.account
    if(account){
      this.result.accounts = account.map(acc => {
        const currency = this.homebank.cur.find(c => c.key == acc.curr)
        return {
          account_type_id: acc.type,
          currency: currency ? { name: currency.name } : null,
          initial_amount: acc.initial,
          name: acc.name,
          owner: { name: this.homebank.properties.title }
        }
      })
    }
  },

  currencies(){
    const cur = this.homebank.cur
    if(cur){
      this.result.currencies = cur.map(c => {
        return {
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
      this.result.partners = pay.map(p => {
        return {
          name: p.name
        }
      })
    }
  },

  categories(){
    const cat = this.homebank.cat
    if(cat){
      let categories = cat.filter(c => c.parent === undefined)
      let subcategories = cat.filter(c => c.parent !== undefined)
      categories = categories.map(c => {
        return {
          name: c.name,
        }
      })
      subcategories = subcategories.map(s => {
        const parent = cat.find(c => c.key == s.parent)
        return {
          name: s.name,
          category: parent ? { name: parent.name } : null
        }
      })
      this.result.categories = categories
      this.result.subcategories = subcategories
    }
  },

  items(){
    this.result.items = []
    this.result.items.push(this.homebank.ope.map(operation => this.itemsOfOperation(operation)))
    this.result.items = this.result.items.flat(Infinity)
  },

  itemsOfOperation(operation){
    if(operation){
      const result = []
      if(operation.amount && !(operation.samt || operation.scat || operation.smem)){
        const category = this.homebank.cat.find(c => c.key == operation.category)
        result.push({
          subcategory: category ? { name: category.name } : null,
          description: operation.info,
          amount: operation.amount,
          operation: this.operation(operation),
        })
      } else if(operation.samt || operation.scat || operation.smem){
        const num = operation.scat.split('||').length
        for(let i = 0; i < num; i++){
          const category = this.homebank.cat.find(c => c.key == operation.scat.split('||')[i])
          result.push({
            subcategory: category ? { name: category.name } : null,
            description: operation.smem.split('||')[i],
            amount: operation.samt.split('||')[i],
            operation: this.operation(operation),
          })
        }
      }
      return result
    }
  },

  operation(operation){
    const account = this.homebank.account.find(acc => acc.key == operation.account)
    const partner = this.homebank.pay.find(acc => acc.key == operation.payee)
    return {
      account: account ? { name: account.name } : null,
      partner: partner ? { name: partner.name } : null,
      payment_id: operation.paymode,
      operation_status_id: operation.st,
      date: this.serialDateNumber_to_timestamp(operation.date),
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
