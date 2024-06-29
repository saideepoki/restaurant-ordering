// pages/MenuPage.jsx
import { useEffect, useState } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import {MenuItem} from '../types/MenuItem';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { useToast } from "../components/ui/use-toast"


export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    async function getMenuItems() {
      const response = await axios.get('/menuItems');
      try {
        if(!response.data.success) {
          toast({
            title: "Database retrieval",
            message: response.data.message,
            variant: "destructive",
          })
        }
        setMenuItems(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data.message ?? "Internal Server Error";
        console.error(errorMessage);
        toast({
          title: "Database retreival",
          message: errorMessage,
          variant: "destructive",
        })
      }
    }
    getMenuItems();
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="menu-page p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      {categories.map((category) => (
        <div key={category} className="category-section mb-8">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category.replace(/-/g, ' ')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItemCard key={item?._id} item={item} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

