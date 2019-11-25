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
        const currency = this.homebank.cur.find(c => c.key == acc.curr)
        return {
          account_type_id: acc.type,
          currency: currency ? { name: currency.name } : null,
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

  operations(){
    const ope = this.homebank.ope
    if(ope){
      this.result.operations = ope.map(o => {
        const account = this.homebank.account.find(acc => acc.key == o.account)
        const partner = this.homebank.pay.find(acc => acc.key == o.payee)
        return {
          account: account ? { name: account.name } : null,
          partner: partner ? { name: partner.name } : null,
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
        const category = this.homebank.cat.find(c => c.key == operation.category)
        result.push({
          subcategory: category ? { name: category.name } : null,
          description: operation.info,
          amount: operation.amount,
        })
      } else if(operation.scat){
        const num = operation.scat.split('||').length
        for(let i = 0; i < num; i++){
          const category = this.homebank.cat.find(c => c.key == operation.scat.split('||')[i])
          result.push({
            subcategory: category ? { name: category.name } : null,
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
