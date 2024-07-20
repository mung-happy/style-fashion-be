import httpStatus from "http-status";
import cartService from "../services/cart.service.js";
import Carts from "../models/carts.model.js";
import errorMessage from "../config/error.js";

const CartController = {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCartsByIdUser(req.query.userId);
      res.status(httpStatus.OK).send(cart);
    } catch (err) {
      console.log(err);
      errorMessage(res, err);
    }
  },

  async addToCart(req, res) {
    try {
      const cart = await cartService.addToCartByIdUser(
        req.query.userId,
        req.body
      );
      const newCart = await cartService.getCartsByIdUser(req.query.userId);
      res.status(httpStatus.CREATED).send(newCart);
    } catch (err) {
      errorMessage(res, err);
    }
  },

  async updateCart(req, res) {
    try {
      const userId = req.query.userId;
      const cartItemId = req.query.cartItemId;
      const body = req.body;
      const cart = await Carts.findOne({
        user: userId,
      });

      if (!cart) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found");
      }

      const newProductsCart = cart.products_cart.map((item) => {
        if (item._id.toString() === cartItemId) {
          item.quantity = body.quantity;
          return item;
        }
        return item;
      });

      const cartUpdate = await cartService.updateCartByIdProductCart(userId, {
        ...body,
        products_cart: newProductsCart,
      });
      res.status(httpStatus.CREATED).send(cartUpdate);
    } catch (err) {
      errorMessage(res, err);
    }
  },

  async remove(req, res) {
    try {
      const userID = req.query.userId;
      const productCartId = req.body.productCartId;
      await cartService.deleteProductCartById(userID, productCartId);
      res.status(httpStatus.OK).send("Cart deleted successfully");
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  },
};

export default CartController;
