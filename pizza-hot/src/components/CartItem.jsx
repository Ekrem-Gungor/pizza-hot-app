export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item border-bottom p-2">
      <p>
        {item.title} - {Number(item.quantity || 0) * Number(item.price) || 0} ₺
      </p>
      <div className="actions">
        <button onClick={onDecrease} className="btn btn-sm btn-outline-primary">
          <i className="bi bi-dash-lg"></i>
        </button>
        <span>{Number(item.quantity)}</span>
        <button onClick={onIncrease} className="btn btn-sm btn-outline-primary">
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </li>
  );
}
