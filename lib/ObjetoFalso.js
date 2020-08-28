const faker = require('Faker');
const uuid = require('uuid');

class ObjetoFalso {
    constructor() {
        this.id = uuid.v4()
        this.firstName=faker.name.firstName()
        this.lastName= faker.name.lastName()
        this.city= faker.address.city()
        this.streetName= faker.address.streetName()
        this.country= faker.address.country()
        this.accountName= faker.finance.accountName()
        this.account= faker.finance.account()
        this.amount= faker.finance.amount()

        return this
    }
}

module.exports = ObjetoFalso;