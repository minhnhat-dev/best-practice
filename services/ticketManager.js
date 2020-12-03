const { EventEmitter } = require('events');

class TicketManager extends EventEmitter {
    constructor(supply) {
        super();
        this.supply = supply;
    }

    buy(email, price) {
        if (price <= 0) {
            return this.emit('error', new Error('There are no more tickets left to purchase'));
        }

        this.supply -= 1;
        return this.emit('buy', email, price, Date.now());
    }
}

module.exports = TicketManager;
