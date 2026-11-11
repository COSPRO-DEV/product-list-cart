import { useState, useEffect } from "react";
import desserts from "./data.json";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import OrderModal from "./components/OrderModal";

function App() {
  // Cart state: loads from localStorage first, falls back to an empty array
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);

  // Save the cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Derived values (calculated on every render, NOT stored in state)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(dessert) {
    setCart((prev) => [
      ...prev,
      {
        name: dessert.name,
        price: dessert.price,
        thumbnail: dessert.image.thumbnail,
        quantity: 1,
      },
    ]);
  }

  function changeQuantity(name, change) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(name) {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }

  function clearCart() {
    setCart([]);
  }

  function startNewOrder() {
    setCart([]);
    setShowModal(false);
  }

  return (
    <main className="layout">
      <section className="products">
        <h1>Desserts</h1>
        <div className="product-grid">
          {desserts.map((dessert) => {
            const cartItem = cart.find((item) => item.name === dessert.name);
            return (
              <ProductCard
                key={dessert.name}
                dessert={dessert}
                quantity={cartItem ? cartItem.quantity : 0}
                onAdd={addToCart}
                onChangeQuantity={changeQuantity}
              />
            );
          })}
        </div>
      </section>

      <Cart
        cart={cart}
        totalItems={totalItems}
        orderTotal={orderTotal}
        onRemove={removeItem}
        onClear={clearCart}
        onConfirm={() => setShowModal(true)}
      />

      {showModal && (
        <OrderModal
          cart={cart}
          orderTotal={orderTotal}
          onStartNew={startNewOrder}
        />
      )}
    </main>
  );
}

export default App;