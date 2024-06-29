import { Link } from 'react-router-dom';
import { CookingPot, Menu, Heart, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md p-4 flex justify-between items-center text-zinc-950 relative">
      {/* Left side with logo and restaurant name */}
      <div className="flex items-center space-x-2 text-zinc-950 font-bold text-lg">
        <Link to="/" className="flex items-center font-bold text-lg mr-3">
          <CookingPot className="h-8 w-8" />
        </Link>
        <div className = "">
          Eat
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800">
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Middle section with navigation links */}
      <div className="hidden md:flex justify-center items-center">
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
          <li><Link to="/menu" className="text-gray-800 hover:text-gray-600">Menu</Link></li>
          <li><Link to="/orders" className="text-gray-800 hover:text-gray-600">Orders</Link></li>
          <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
        </ul>
      </div>

      {/* Right side with icons and sign-in */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/search" className="text-gray-800 hover:text-gray-600">
          <Search className="h-6 w-6" />
        </Link>
        <Link to="/favourites" className="text-gray-800 hover:text-gray-600">
          <Heart className="h-6 w-6" />
        </Link>
        <Link to="/cart" className="text-gray-800 hover:text-gray-600">
          <ShoppingCart className="h-6 w-6" />
        </Link>
        <Link to="/sign-in" className="text-gray-800 hover:text-gray-600">
          <Button>Sign In</Button>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-100 shadow-md mt-2 z-10">
          <ul className="flex flex-col space-y-2 p-4">
            <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
            <li><Link to="/menu" className="text-gray-800 hover:text-gray-600">Menu</Link></li>
            <li><Link to="/orders" className="text-gray-800 hover:text-gray-600">Orders</Link></li>
            <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
            <li><Link to="/search" className="text-gray-800 hover:text-gray-600">Search</Link></li>
            <li><Link to="/favourites" className="text-gray-800 hover:text-gray-600">Favourites</Link></li>
            <li><Link to="/cart" className="text-gray-800 hover:text-gray-600">Cart</Link></li>
            <li><Link to="/sign-in" className="text-gray-800 hover:text-gray-600">
              <Button>Sign In</Button>
            </Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
