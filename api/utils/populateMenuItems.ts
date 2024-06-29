import MenuItem from "../models/MenuItem"

async function populateMenuItems() {
    const indianCuisines = [
        {
          name: 'Butter Chicken',
          description: 'Tender chicken cooked in a creamy tomato sauce.',
          price: 599,
          category: 'main courses',
          imageUrl: '../public/images/butter-chicken.jpg'
        },
        {
          name: 'Palak Paneer',
          description: 'Paneer cubes cooked in a spinach gravy.',
          price: 449,
          category: 'main courses',
          imageUrl: '../public/images/palak-paneer.jpg'
        },
        {
          name: 'Chicken Biryani',
          description: 'Fragrant rice cooked with chicken and aromatic spices.',
          price: 799,
          category: 'rice & biryani',
          imageUrl: '../public/images/chicken-biryani.jpg'
        },
      ];

      try {
        await MenuItem.insertMany(indianCuisines)
        console.log("Menu items populated successfully")
      } catch (error) {
        console.error('Error populating menu items:', error);
      }
}

populateMenuItems();