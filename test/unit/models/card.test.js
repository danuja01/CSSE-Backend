import { expect } from 'chai';
import { Card } from '@/models';

describe('Card Model Test', () => {
  afterEach(async () => {
    await Card.deleteMany({});
  });

  it('New card should be saved to the database', async () => {
    const cardData = {
      cardHolderName: 'Test Card Holder',
      nickName: 'Test Card',
      cardNumber: '5555555555554444',
      expirationDate: new Date('2024-12-31'),
      cvv: '123',
      userId: '653ccebe0fd5a48d3c333b29'
    };
    const newCard = new Card(cardData);
    const savedCard = await newCard.save();
    expect(savedCard._id).to.exist;
    expect(savedCard.cardHolderName).to.equal('Test Card Holder');
    expect(savedCard.nickName).to.equal('Test Card');
    expect(savedCard.cardNumber).to.equal('5555555555554444');
    expect(savedCard.expirationDate).to.deep.equal(new Date('2024-12-31'));
    expect(savedCard.cvv).to.equal('123');
  });

  it('Should not save card with invalid fields to the database', async () => {
    const cardData = {
      nickName: 'Test Card',
      expirationDate: new Date('2023-12-31'),
      cvv: '123'
    };
    let error = null;
    try {
      const newCard = new Card(cardData);
      await newCard.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not save card with an invalid card number to the database', async () => {
    const cardData = {
      cardHolderName: 'Test Card Holder',
      nickName: 'Test Card',
      cardNumber: '12345678901345',
      expirationDate: new Date('2024-12-31'),
      cvv: '123',
      userId: '653ccebe0fd5a48d3c333b29'
    };
    let error = null;
    try {
      const newCard = new Card(cardData);
      await newCard.save();
    } catch (err) {
      console.log(err);
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not save card with a non-unique card number to the database', async () => {
    const cardData1 = {
      cardHolderName: 'Test Card Holder 1',
      nickName: 'Test Card 1',
      cardNumber: '1234567890123456',
      expirationDate: new Date('2024-12-31'),
      cvv: '123',
      userId: 'user_id_example_1'
    };
    const cardData2 = {
      cardHolderName: 'Test Card Holder 2',
      nickName: 'Test Card 2',
      cardNumber: '1234567890123456',
      expirationDate: new Date('2025-12-31'),
      cvv: '456',
      userId: 'user_id_example_2'
    };
    let error = null;
    try {
      const card1 = new Card(cardData1);
      await card1.save();
      const card2 = new Card(cardData2);
      await card2.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });

  it('Should not save card without a userId to the database', async () => {
    const cardData = {
      cardHolderName: 'Test Card Holder',
      nickName: 'Test Card',
      cardNumber: '1234567890123456',
      expirationDate: new Date('2024-12-31'),
      cvv: '123'
    };
    let error = null;
    try {
      const newCard = new Card(cardData);
      await newCard.save();
    } catch (err) {
      error = err;
    }
    expect(error).to.exist;
    expect(error).to.be.instanceOf(Error);
  });
});
