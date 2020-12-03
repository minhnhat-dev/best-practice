const TicketManager = require('./ticketManager');
const { sendMail } = require('./mail');

const ticketManager = new TicketManager(10);

ticketManager.on('buy', (email, price, time) => {
    console.log('Someone bought a ticket!');
    sendMail(email);
    console.log('Data is saved');
});

ticketManager.on('error', (error) => {
    console.error('error', error);
});

console.log(`We have ${ticketManager.listenerCount('buy')} listener(s) for the buy event`);
console.log(`We have ${ticketManager.listenerCount('error')} listener(s) for the error event`);
ticketManager.buy('testemail@gmail.com', 4000);
console.log(ticketManager.supply);
