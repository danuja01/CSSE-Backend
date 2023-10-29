import { expect } from 'chai';
import { Ticket } from '@/models';

describe('Ticket Model Test - Positive', () => {
  afterEach(async () => {
    await Ticket.deleteMany({});
  });

  it('New ticket should be saved to the database', async () => {
    const ticketData = {
      userId: '653ccebe0fd5a48d3c333b29',
      startBusStop: 'Bus Stop A',
      endBusStop: 'Bus Stop B',
      busRoute: 'Route X',
      price: 10
    };
    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();

    expect(savedTicket._id).to.exist;
    expect(savedTicket.startBusStop).to.equal('Bus Stop A');
    expect(savedTicket.endBusStop).to.equal('Bus Stop B');
    expect(savedTicket.busRoute).to.equal('Route X');
    expect(savedTicket.price).to.equal(10);
  });

  it('Should find a ticket by ID in the database', async () => {
    const ticketData = {
      userId: '653ccebe0fd5a48d3c333b29',
      startBusStop: 'Bus Stop A',
      endBusStop: 'Bus Stop B',
      busRoute: 'Route X',
      price: 10
    };
    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();

    const foundTicket = await Ticket.findById(savedTicket._id);

    expect(foundTicket._id).to.deep.equal(savedTicket._id);
  });

  it('Should update a ticket in the database', async () => {
    const ticketData = {
      userId: '653ccebe0fd5a48d3c333b29',
      startBusStop: 'Bus Stop A',
      endBusStop: 'Bus Stop B',
      busRoute: 'Route X',
      price: 10
    };
    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();

    savedTicket.startBusStop = 'New Bus Stop A';
    savedTicket.endBusStop = 'New Bus Stop B';
    savedTicket.busRoute = 'Route Y';
    savedTicket.price = 15;

    const updatedTicket = await savedTicket.save();

    expect(updatedTicket.startBusStop).to.equal('New Bus Stop A');
    expect(updatedTicket.endBusStop).to.equal('New Bus Stop B');
    expect(updatedTicket.busRoute).to.equal('Route Y');
    expect(updatedTicket.price).to.equal(15);
  });

  it('Should delete a ticket from the database', async () => {
    const ticketData = {
      userId: '653ccebe0fd5a48d3c333b29',
      startBusStop: 'Bus Stop A',
      endBusStop: 'Bus Stop B',
      busRoute: 'Route X',
      price: 10
    };
    const newTicket = new Ticket(ticketData);
    const savedTicket = await newTicket.save();

    const deletedTicket = await Ticket.findByIdAndDelete(savedTicket._id);

    expect(deletedTicket).to.not.be.null;
    expect(deletedTicket._id).to.deep.equal(savedTicket._id);
  });
});

describe('Ticket Model Test - Negative', () => {
  afterEach(async () => {
    await Ticket.deleteMany({});
  });

  it('Should not save a ticket with invalid fields to the database', async () => {
    const ticketData = {
      userId: '653ccebe0fd5a48d3c333b29',
      startBusStop: 'Bus Stop A',
      endBusStop: 'Bus Stop B'
      // Missing busRoute and price fields intentionally
    };

    let error = null;
    try {
      const newTicket = new Ticket(ticketData);
      await newTicket.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not find a non-existent ticket in the database', async () => {
    const nonExistentTicketId = '653ccebe0fd5a48d3c333b29';
    const foundTicket = await Ticket.findById(nonExistentTicketId);

    expect(foundTicket).to.not.exist;
  });

  it('Should not update a non-existent ticket in the database', async () => {
    const nonExistentTicketId = '653ccebe0fd5a48d3c333b29';
    const updatedTicketData = {
      startBusStop: 'Updated Bus Stop A',
      endBusStop: 'Updated Bus Stop B',
      busRoute: 'Route Z',
      price: 20
    };

    const updatedTicket = await Ticket.findByIdAndUpdate(nonExistentTicketId, updatedTicketData, { new: true });

    expect(updatedTicket).to.be.null;
  });

  it('Should not delete a non-existent ticket from the database', async () => {
    const nonExistentTicketId = '653ccebe0fd5a48d3c333b29';
    const deletedTicket = await Ticket.findByIdAndDelete(nonExistentTicketId);

    expect(deletedTicket).to.be.null;
  });
});
