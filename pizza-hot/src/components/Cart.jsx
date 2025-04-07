import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { UIContext } from "../contexts/UIContext";

export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);

  const { uiProgress, hideCart, showCheckout } = useContext(UIContext);

  const cartTotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <Modal open={uiProgress === "cart"}>
      <h2>Sepetiniz</h2>
      {items.length > 0 ? (
        <ul className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => addToCart(item)}
              onDecrease={() => removeFromCart(item.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="alert alert-danger text-center mt-3">
          Sepetinizde ürün bulunmamaktadır.
        </div>
      )}
      <div className="cart-summary">
        {cartTotal === 0 ? (
          ""
        ) : (
          <p className="badge text-bg-success mb-0 fs-5">
            Total: {cartTotal} ₺
          </p>
        )}

        <div className="modal-actions text-end">
          <button
            onClick={() => hideCart()}
            className="btn btn-sm btn-danger me-2"
          >
            Close
          </button>
          {cartTotal > 0 ? (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => showCheckout()}
            >
              Confirm
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}
