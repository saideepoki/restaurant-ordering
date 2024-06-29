import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { MenuItem } from '../types/MenuItem';
import { IndianRupee } from 'lucide-react';

function FeaturedFoodItems() {
    const[featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    async function getFeaturedItems() {
      try {
        const response = await axios.get('/featuredItems');
        console.log(response.data.message);
        setFeaturedItems(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data.message ?? "Internal Server Error";
        console.error(errorMessage);
      }
    }
    getFeaturedItems();
  },[])
  return (
    <section className="featured-food-items-section p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Menu Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredItems.map((item: MenuItem, index: number) => (
          <div key={index} className="menu-item-card relative bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex">
              <div className="w-1/2">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 1l2.4 7.4H22l-6.1 4.5 2.3 7.3L12 17l-6.2 4.5 2.3-7.3L2 8.4h7.6L12 1z"/>
                        </svg>
                      ))}
                      {item.rating % 1 !== 0 && (
                        <svg className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 1l2.4 7.4H22l-6.1 4.5 2.3 7.3L12 17l-6.2 4.5 2.3-7.3L2 8.4h7.6L12 1z"/>
                        </svg>
                      )}
                    </div>
                    <span className="ml-1">{item.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm mb-4">{item.description}</p>
                  <p className="text-lg font-bold mb-4 flex justfy-center items-center">
                  <span><IndianRupee height={20} width={15}/></span>
                  {item.price}
                  </p>
                  <Button className="bg-yellow-500 text-black px-4 py-2 text-sm font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition duration-300">
                    Add to Cart
                  </Button>
                </div>
              </div>
              <div className="w-1/2">
                <img src={item.imageUrl} alt={item.name} className="w-full h-auto object-cover rounded-l-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedFoodItems;
