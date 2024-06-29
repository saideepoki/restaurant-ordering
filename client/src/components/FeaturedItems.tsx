import { Button } from '../components/ui/button';

const featuredItems = [
  {
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, egg, and parmesan.",
    price: "$12.99",
    image: "spaghetti-carbonara.jpg"
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    price: "$10.99",
    image: "margherita-pizza.jpg"
  },
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing and croutons.",
    price: "$8.99",
    image: "caesar-salad.jpg"
  },
  // Add more items as needed
];

function FeaturedFoodItems() {
  return (
    <section className="featured-food-items-section p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item, index) => (
          <div key={index} className="menu-item-card relative bg-white p-4 rounded shadow-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover rounded mb-4 transition-transform duration-300 transform hover:scale-110" />
            <div className="menu-item-info absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-sm mb-4">{item.description}</p>
              <p className="text-lg font-bold mb-4">{item.price}</p>
              <Button className="bg-yellow-500 text-black px-4 py-2 text-sm font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition duration-300">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFoodItems;
