import { expect } from 'chai';
import { Card } from '@/models';

describe('Card Model Test - Positive', () => {
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

  it('Should find a card by ID in the database', async () => {
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

    const foundCard = await Card.findById(savedCard._id);

    expect(foundCard._id).to.deep.equal(savedCard._id);
    expect(foundCard.nickName).to.equal('Test Card');
  });

  it('Should find cards by user ID in the database', async () => {
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

    const foundCards = await Card.find({ userId: '653ccebe0fd5a48d3c333b29' });

    expect(foundCards.length).to.be.greaterThan(0); // Ensure that cards are found
    expect(foundCards[0]._id.toString()).to.equal(savedCard._id.toString());
    expect(foundCards[0].nickName).to.equal('Test Card');
    expect(foundCards[0].userId.toString()).to.equal('653ccebe0fd5a48d3c333b29');
  });

  it('Should update a card in the database', async () => {
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

    const updatedCardData = {
      nickName: 'Updated Card'
    };

    const updatedCard = await Card.findByIdAndUpdate(savedCard._id, updatedCardData, { new: true });

    expect(updatedCard.nickName).to.equal('Updated Card');
  });

  it('Should delete a card from the database', async () => {
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

    const deletedCard = await Card.findByIdAndDelete(savedCard._id);

    expect(deletedCard).to.not.be.null;
    expect(deletedCard._id.toString()).to.equal(savedCard._id.toString());
  });
});

describe('Card Model Test - Negative', () => {
  afterEach(async () => {
    await Card.deleteMany({});
  });

  it('Should not save a card with invalid fields to the database', async () => {
    const cardData = {
      cardHolderName: 'Test Card Holder',
      nickName: 'Test Card',
      expirationDate: new Date('2024-12-31'),
      userId: '653ccebe0fd5a48d3c333b29'
    };

    let error = null;
    try {
      const newCard = new Card(cardData);
      await newCard.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
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

  it('Should not find a non-existent card in the database', async () => {
    const existingUserId = '653ccebe0fd5a48d3c333b29';
    const foundCard = await Card.find({ userId: existingUserId });

    expect(foundCard).to.be.an('array').that.is.empty;
  });

  it('Should not delete a non-existent card from the database', async () => {
    const nonExistentCardId = '653ccebe0fd5a48d3c333b29';
    const deletedCard = await Card.findByIdAndDelete(nonExistentCardId);

    expect(deletedCard).to.be.null;
  });
});
