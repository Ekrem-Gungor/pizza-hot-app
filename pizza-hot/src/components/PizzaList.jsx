import Pizza from "./Pizza";
import useFetch from "../hooks/useFetch";

const option = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function PizzaList() {
  const { data, isloading, error } = useFetch(
    "https://pizza-hot-app.onrender.com/pizzas",
    option,
    []
  );

  if (isloading) {
    return <p className="alert alert-warning text-center">Loading...</p>;
  }

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {data.map((pizza) => (
          <Pizza key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
