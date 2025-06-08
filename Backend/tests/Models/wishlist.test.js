import * as wishlistModel from '../../src/Models/wishlist.js';

describe('Wishlist Model', () => {
  it('addToWishlist debe devolver error si faltan datos', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await wishlistModel.addToWishlist(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});