import { expect } from 'chai';
import { BusRoute } from '@/models';

describe('BusRoute Model Test - Positive', () => {
  afterEach(async () => {
    await BusRoute.deleteMany({});
  });

  it('Should save a new bus route to the database', async () => {
    const busRouteData = {
      name: 'Route 1',
      startStop: 'Stop A',
      endStop: 'Stop B',
      busStops: [{ name: 'Stop C' }, { name: 'Stop D' }]
    };
    const newBusRoute = new BusRoute(busRouteData);
    const savedBusRoute = await newBusRoute.save();
    expect(savedBusRoute._id).to.exist;
    expect(savedBusRoute.name).to.equal('Route 1');
    expect(savedBusRoute.startStop).to.equal('Stop A');
    expect(savedBusRoute.endStop).to.equal('Stop B');
    expect(savedBusRoute.busStops.length).to.equal(2);
  });

  it('Should find a bus route by ID in the database', async () => {
    const busRouteData = {
      name: 'Route 1',
      startStop: 'Stop A',
      endStop: 'Stop B',
      busStops: [{ name: 'Stop C' }, { name: 'Stop D' }]
    };
    const newBusRoute = new BusRoute(busRouteData);
    const savedBusRoute = await newBusRoute.save();

    const foundBusRoute = await BusRoute.findById(savedBusRoute._id);

    expect(foundBusRoute._id).to.deep.equal(savedBusRoute._id);
    expect(foundBusRoute.name).to.equal('Route 1');
  });

  it('Should update a bus route in the database', async () => {
    const busRouteData = {
      name: 'Route 1',
      startStop: 'Stop A',
      endStop: 'Stop B',
      busStops: [{ name: 'Stop C' }, { name: 'Stop D' }]
    };
    const newBusRoute = new BusRoute(busRouteData);
    const savedBusRoute = await newBusRoute.save();

    savedBusRoute.name = 'Updated Route';
    savedBusRoute.startStop = 'Stop X';
    savedBusRoute.endStop = 'Stop Y';
    savedBusRoute.busStops = [{ name: 'Stop Z' }];
    const updatedBusRoute = await savedBusRoute.save();

    expect(updatedBusRoute.name).to.equal('Updated Route');
    expect(updatedBusRoute.startStop).to.equal('Stop X');
    expect(updatedBusRoute.endStop).to.equal('Stop Y');
    expect(updatedBusRoute.busStops.length).to.equal(1);
  });

  it('Should delete a bus route from the database', async () => {
    const busRouteData = {
      name: 'Route 1',
      startStop: 'Stop A',
      endStop: 'Stop B',
      busStops: [{ name: 'Stop C' }, { name: 'Stop D' }]
    };
    const newBusRoute = new BusRoute(busRouteData);
    const savedBusRoute = await newBusRoute.save();

    const deletedBusRoute = await BusRoute.findByIdAndDelete(savedBusRoute._id);

    expect(deletedBusRoute).to.not.be.null;
    expect(deletedBusRoute._id.toString()).to.equal(savedBusRoute._id.toString());
  });
});

describe('BusRoute Model Test - Negative', () => {
  afterEach(async () => {
    await BusRoute.deleteMany({});
  });

  it('Should not save a bus route without a name to the database', async () => {
    const busRouteData = {
      startStop: 'Stop A',
      endStop: 'Stop B',
      busStops: [{ name: 'Stop C' }, { name: 'Stop D' }]
    };
    let error = null;
    try {
      const newBusRoute = new BusRoute(busRouteData);
      await newBusRoute.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not find a non-existent bus route in the database', async () => {
    const nonExistentRouteId = '653ccebe0fd5a48d3c333b29';
    const foundBusRoute = await BusRoute.findById(nonExistentRouteId);

    expect(foundBusRoute).to.be.null;
  });

  it('Should not update a non-existent bus route in the database', async () => {
    const nonExistentRouteId = '653ccebe0fd5a48d3c333b29';
    const updatedBusRouteData = {
      name: 'Updated Route',
      startStop: 'Stop X',
      endStop: 'Stop Y',
      busStops: [{ name: 'Stop Z' }]
    };
    let error = null;
    try {
      await BusRoute.findByIdAndUpdate(nonExistentRouteId, updatedBusRouteData, { new: true });
    } catch (err) {
      error = err;
    }
    expect(error).to.be.null;
  });

  it('Should not delete a non-existent bus route from the database', async () => {
    const nonExistentRouteId = '653ccebe0fd5a48d3c333b29';
    const deletedBusRoute = await BusRoute.findByIdAndDelete(nonExistentRouteId);

    expect(deletedBusRoute).to.be.null;
  });
});
