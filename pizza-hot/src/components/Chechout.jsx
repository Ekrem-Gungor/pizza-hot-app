import Modal from "./UI/Modal";
import { useContext } from "react";
import { UIContext } from "../contexts/UIContext";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";

const option = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { uiProgress, hideCheckout } = useContext(UIContext);

  const { data, isloading, error, SendRequest } = useFetch(
    "https://pizza-hot-app.onrender.com/orders",
    option
  );

  const cartTotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    SendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      })
    );
  }

  function handleClose() {
    hideCheckout();
    clearCart();
  }

  if (data && !error) {
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2 className="text-center">Order Placed</h2>
        <div className="checkout-form">
          <h4 className="text-center">Thank you for your order!</h4>
          <p className="text-center">
            Your order has been placed successfully.
          </p>
          <div className="modal-actions text-end">
            <button
              onClick={() => handleClose()}
              className="btn btn-sm btn-outline-danger me-2"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2 className="text-center">Checkout</h2>
      <div className="checkout-form">
        <form onSubmit={handleSubmit}>
          {error && <p className="alert alert-danger text-center">{error}</p>}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control"
              id="name"
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                  id="email"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  className="form-control"
                  id="phone"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              type="text"
              name="address"
              placeholder="Enter your address"
              className="form-control"
              id="address"
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your City"
                  className="form-control"
                  id="city"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Enter your District"
                  className="form-control"
                  id="district"
                />
              </div>
            </div>
          </div>
          {isloading ? (
            <p className="alert alert-warning text-center">Loading...</p>
          ) : (
            <>
              <div className="cart-summary">
                <div className="modal-actions text-end">
                  <button
                    onClick={() => hideCheckout()}
                    className="btn btn-sm btn-outline-danger me-2"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Submit
                  </button>
                </div>
                <p className="badge text-bg-primary mb-2 fs-5">
                  Total Price: {cartTotal} ₺
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}
