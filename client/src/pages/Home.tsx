import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import FeaturedFoodItems from '../components/FeaturedItems';
import axios from 'axios';

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/user/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section relative h-screen bg-cover bg-center text-white" style={{ backgroundImage: "url('hero.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
          <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeInDown">Welcome to Our Restaurant</h1>
          <p className="text-2xl mb-8 animate__animated animate__fadeInUp animate__delay-1s">Experience the best dining with us</p>
          <div className="flex space-x-4">
            <Link to="/menu">
              <Button className="bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                View Menu
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/sign-up">
                <Button className="bg-transparent border border-yellow-500 text-yellow-500 px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:text-black transition duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <FeaturedFoodItems/>

      {/* Special Offers */}
      <section className="special-offers-section bg-yellow-100 p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
        <p className="text-lg mb-6">Check out our latest promotions and discounts!</p>
        <Link to="/specials">
          <Button className="bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition duration-300">
            View Offers
          </Button>
        </Link>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Repeat this block for each testimonial */}
          <div className="testimonial-card bg-white p-4 rounded shadow">
            <p className="text-gray-600 mb-4">"Amazing food and excellent service!"</p>
            <p className="text-lg font-semibold">- Customer Name</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Our Restaurant. All rights reserved.</p>
        <p>Follow us on <a href="https://www.facebook.com" className="text-yellow-500">Facebook</a>, <a href="https://www.instagram.com" className="text-yellow-500">Instagram</a>, <a href="https://www.twitter.com" className="text-yellow-500">Twitter</a>.</p>
      </footer>
    </div>
  );
}

export default Home;
