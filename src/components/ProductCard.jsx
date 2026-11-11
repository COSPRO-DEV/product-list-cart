import { formatPrice } from "../utils";

function ProductCard({ dessert, quantity, onAdd, onChangeQuantity }) {
  const { image, name, category, price } = dessert;

  return (
    <article className="card">
      <div className="card-media">
        <picture>
          <source media="(min-width: 1024px)" srcSet={image.desktop} />
          <source media="(min-width: 640px)" srcSet={image.tablet} />
          <img
            className={quantity > 0 ? "card-img selected" : "card-img"}
            src={image.mobile}
            alt={name}
          />
        </picture>

        {quantity === 0 ? (
          <button className="add-btn" onClick={() => onAdd(dessert)}>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="qty-control">
            <button
              className="qty-btn"
              aria-label={`Decrease ${name} quantity`}
              onClick={() => onChangeQuantity(name, -1)}
            >
              <span className="icon icon-minus" />
            </button>
            <span className="qty-number">{quantity}</span>
            <button
              className="qty-btn"
              aria-label={`Increase ${name} quantity`}
              onClick={() => onChangeQuantity(name, 1)}
            >
              <span className="icon icon-plus" />
            </button>
          </div>
        )}
      </div>

      <p className="card-category">{category}</p>
      <h2 className="card-name">{name}</h2>
      <p className="card-price">{formatPrice(price)}</p>
    </article>
  );
}

export default ProductCard;