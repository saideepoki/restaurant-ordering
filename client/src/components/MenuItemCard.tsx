// components/MenuItemCard.jsx
import { useState } from 'react';
import { StarsIcon } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';

const MenuItemCard = ({ item }) => {
  const [rating, setRating] = useState(item.rating);
  const { toast } = useToast();

  const handleRating = async (newRating) => {
    try {
      const response = await axios.put(`/menuItems/${item._id}/rate`, { rating: newRating });
      if (response.data.success) {
        setRating(newRating);
        toast({
          title: 'Rating Updated',
          description: 'Item rating updated successfully.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Rating Update Failed',
          description: response.data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
      toast({
        title: 'Rating Update Failed',
        description: 'An error occurred while updating item rating.',
        variant: 'destructive',
      });
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('/cart/add', { itemId: item._id });
      if (response.data.success) {
        toast({
          title: 'Item added',
          description: 'Item added to cart successfully.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Add to cart failed',
          description: response.data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast({
        title: 'Add to cart failed',
        description: 'An error occurred while adding item to cart.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="menu-item-card bg-white p-4 rounded shadow-lg">
      <div className="flex">
        <img src={item.imageUrl} alt={item.name} className="w-1/3 h-32 object-cover rounded" />
        <div className="ml-4 w-2/3">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <StarsIcon
                key={index}
                className={`h-5 w-5 cursor-pointer ${
                  index < rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => handleRating(index + 1)}
              />
            ))}
          </div>
          <p className="text-lg font-bold mt-2">₹{item.price}</p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItemCard;
