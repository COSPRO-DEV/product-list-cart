import { formatPrice } from "../utils";

function Cart({ cart, totalItems, orderTotal, onRemove, onClear, onConfirm }) {
  return (
    <aside className="cart">
      <h2>Your Cart ({totalItems})</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <img src="/assets/images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.name} className="cart-item">
                <div>
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-line">
                    <span className="cart-qty">{item.quantity}x</span>
                    <span className="cart-unit">@ {formatPrice(item.price)}</span>
                    <span className="cart-subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </p>
                </div>
                <button
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => onRemove(item.name)}
                >
                  <span className="icon icon-remove" />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Order Total</span>
            <strong>{formatPrice(orderTotal)}</strong>
          </div>

          <p className="carbon-note">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <span>
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </p>

          <button className="primary-btn" onClick={onConfirm}>
            Confirm Order
          </button>
          <button className="clear-btn" onClick={onClear}>
            Clear Cart
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;