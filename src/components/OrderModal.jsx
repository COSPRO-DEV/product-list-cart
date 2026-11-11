import { formatPrice } from "../utils";

function OrderModal({ cart, orderTotal, onStartNew }) {
  return (
    <div className="overlay">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <img src="/assets/images/icon-order-confirmed.svg" alt="" />
        <h2 id="modal-title">Order Confirmed</h2>
        <p className="modal-sub">We hope you enjoy your food!</p>

        <div className="modal-summary">
          <ul>
            {cart.map((item) => (
              <li key={item.name} className="modal-item">
                <img src={item.thumbnail} alt="" />
                <div className="modal-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-line">
                    <span className="cart-qty">{item.quantity}x</span>
                    <span className="cart-unit">@ {formatPrice(item.price)}</span>
                  </p>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Order Total</span>
            <strong>{formatPrice(orderTotal)}</strong>
          </div>
        </div>

        <button className="primary-btn" onClick={onStartNew}>
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderModal;