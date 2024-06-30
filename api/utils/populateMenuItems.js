import MenuItem from "../models/MenuItem.js";

export async function populateMenuItems() {
    const indianCuisines = [
        // Starters
        {
            name: 'Samosa',
            description: 'Crispy pastry filled with spiced potatoes and peas. Perfectly fried to golden brown, served with tangy tamarind chutney.',
            price: 99,
            category: 'starters',
            imageUrl: 'samosa.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Paneer Tikka',
            description: 'Grilled paneer cubes marinated in spices. Served with mint chutney, a perfect appetizer for any meal.',
            price: 199,
            category: 'starters',
            imageUrl: 'paneer-tikka.jpg',
            rating: 4.5,
            featured: true
        },
        // Main Courses
        {
            name: 'Butter Chicken',
            description: 'Tender chicken cooked in a creamy tomato sauce. Rich and flavorful, best enjoyed with naan or rice.',
            price: 599,
            category: 'main courses',
            imageUrl: 'butter-chicken.jpg',
            rating: 4.5,
            featured: true
        },
        {
            name: 'Palak Paneer',
            description: 'Paneer cubes cooked in a spinach gravy. A healthy and delicious choice, garnished with cream and served hot.',
            price: 449,
            category: 'main courses',
            imageUrl: 'palak-paneer.jpg',
            rating: 4.2,
            featured: true
        },
        // Breads
        {
            name: 'Garlic Naan',
            description: 'Soft flatbread topped with garlic and coriander. Baked to perfection in a tandoor, perfect with any curry.',
            price: 99,
            category: 'breads',
            imageUrl: 'garlic-naan.jpg',
            rating: 4.6,
            featured: true
        },
        // Rice & Biryani
        {
            name: 'Chicken Biryani',
            description: 'Fragrant rice cooked with chicken and aromatic spices. Served with raita and salad, a complete meal in itself.',
            price: 799,
            category: 'rice & biryani',
            imageUrl: 'chicken-biryani.jpg',
            rating: 4.8,
            featured: true
        },
        {
            name: 'Vegetable Biryani',
            description: 'Aromatic basmati rice cooked with mixed vegetables. Flavored with saffron and whole spices, served with raita.',
            price: 699,
            category: 'rice & biryani',
            imageUrl: 'vegetable-biryani.jpg',
            rating: 4.3,
            featured: false
        },
        // Desserts
        {
            name: 'Gulab Jamun',
            description: 'Soft and spongy balls soaked in sugar syrup. A classic Indian dessert, served warm and garnished with pistachios.',
            price: 149,
            category: 'desserts',
            imageUrl: 'gulab-jamun.jpg',
            rating: 4.9,
            featured: true
        },
        {
            name: 'Ras Malai',
            description: 'Soft cheese patties soaked in sweetened milk. Flavored with cardamom and garnished with saffron and nuts.',
            price: 199,
            category: 'desserts',
            imageUrl: 'ras-malai.jpg',
            rating: 4.8,
            featured: true
        },
        // Drinks
        {
            name: 'Mango Lassi',
            description: 'A refreshing yogurt-based drink with mango pulp. Sweet and creamy, perfect for cooling down after a spicy meal.',
            price: 99,
            category: 'drinks',
            imageUrl: 'mango-lassi.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Masala Chai',
            description: 'Traditional Indian spiced tea made with black tea, milk, and spices. A warm and comforting drink.',
            price: 49,
            category: 'drinks',
            imageUrl: 'masala-chai.jpg',
            rating: 4.6,
            featured: false
        },
        // Sides
        {
            name: 'Papadum',
            description: 'Crispy thin crackers made from lentil flour. Lightly spiced and perfect as a side or snack.',
            price: 29,
            category: 'sides',
            imageUrl: 'papadum.jpg',
            rating: 4.4,
            featured: false
        },
        {
            name: 'Raita',
            description: 'A cooling yogurt sauce with cucumber and spices. Perfect to balance the heat of spicy dishes.',
            price: 49,
            category: 'sides',
            imageUrl: 'raita.jpg',
            rating: 4.2,
            featured: false
        },
        // Appetizers
        {
            name: 'Aloo Tikki',
            description: 'Spiced potato patties served with chutney. Crispy on the outside, soft on the inside, a popular street food.',
            price: 99,
            category: 'appetizers',
            imageUrl: 'aloo-tikki.jpg',
            rating: 4.6,
            featured: true
        },
        {
            name: 'Bhajia',
            description: 'Vegetable fritters made with a spiced gram flour batter. Crispy and delicious, served with mint chutney.',
            price: 129,
            category: 'appetizers',
            imageUrl: 'bhajia.jpg',
            rating: 4.5,
            featured: false
        },
        // Additional Items
        {
            name: 'Dal Makhani',
            description: 'Creamy black lentils slow-cooked with spices. Rich and flavorful, a perfect vegetarian main course.',
            price: 399,
            category: 'main courses',
            imageUrl: 'dal-makhani.jpg',
            rating: 4.6,
            featured: false
        },
        {
            name: 'Chole Bhature',
            description: 'Spicy chickpeas served with fluffy fried bread. A hearty and popular North Indian dish.',
            price: 249,
            category: 'main courses',
            imageUrl: 'chole-bhature.jpg',
            rating: 4.7,
            featured: false
        },
        {
            name: 'Mango Kulfi',
            description: 'Traditional Indian ice cream flavored with mango. Creamy and dense, served with a sprinkle of pistachios.',
            price: 149,
            category: 'desserts',
            imageUrl: 'mango-kulfi.jpg',
            rating: 4.8,
            featured: false
        },
        {
            name: 'Tandoori Chicken',
            description: 'Chicken marinated in yogurt and spices, roasted in a tandoor. Juicy and smoky, served with lemon wedges.',
            price: 499,
            category: 'main courses',
            imageUrl: 'tandoori-chicken.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Naan',
            description: 'Soft and fluffy flatbread baked in a tandoor. Perfect accompaniment to any curry.',
            price: 79,
            category: 'breads',
            imageUrl: 'naan.jpg',
            rating: 4.5,
            featured: true
        },
        {
            name: 'Chicken Tikka',
            description: 'Marinated chicken pieces grilled to perfection. Served with mint chutney and onion rings.',
            price: 399,
            category: 'appetizers',
            imageUrl: 'chicken-tikka.jpg',
            rating: 4.6,
            featured: false
        },
        {
            name: 'Mutton Rogan Josh',
            description: 'Tender mutton pieces cooked in a rich gravy. A Kashmiri delicacy with aromatic spices.',
            price: 599,
            category: 'main courses',
            imageUrl: 'mutton-rogan-josh.jpg',
            rating: 4.8,
            featured: false
        },
        {
            name: 'Paneer Butter Masala',
            description: 'Paneer cubes in a rich and creamy tomato gravy. A vegetarian delight, best served with naan or rice.',
            price: 499,
            category: 'main courses',
            imageUrl: 'paneer-butter-masala.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Pani Puri',
            description: 'Crispy hollow puris filled with spicy water and tangy tamarind chutney. A popular street food snack.',
            price: 99,
            category: 'appetizers',
            imageUrl: 'pani-puri.jpg',
            rating: 4.8,
            featured: true
        },
        {
            name: 'Jalebi',
            description: 'Crispy and sweet spirals soaked in sugar syrup. A traditional Indian dessert enjoyed warm.',
            price: 99,
            category: 'desserts',
            imageUrl: 'jalebi.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Thandai',
            description: 'A refreshing drink made with milk, nuts, and spices. Traditionally enjoyed during festivals.',
            price: 99,
            category: 'drinks',
            imageUrl: 'thandai.jpg',
            rating: 4.6,
            featured: false
        },
        {
            name: 'Aloo Gobi',
            description: 'Potato and cauliflower cooked with spices. A flavorful vegetarian dish, garnished with fresh coriander.',
            price: 349,
            category: 'main courses',
            imageUrl: 'aloo-gobi.jpg',
            rating: 4.5,
            featured: false
        },
        {
            name: 'Lassi',
            description: 'A traditional yogurt-based drink. Available in sweet or salted variations, perfect for hot days.',
            price: 59,
            category: 'drinks',
            imageUrl: 'lassi.jpg',
            rating: 4.7,
            featured: true
        },
        {
            name: 'Kheer',
            description: 'Rice pudding cooked with milk and sugar. Flavored with cardamom and garnished with nuts.',
            price: 129,
            category: 'desserts',
            imageUrl: 'kheer.jpg',
            rating: 4.8,
            featured: true
        },
        {
            name: 'Pav Bhaji',
            description: 'Spicy vegetable mash served with buttered bread rolls. A popular street food from Mumbai.',
            price: 249,
            category: 'main courses',
            imageUrl: 'pav-bhaji.jpg',
            rating: 4.6,
            featured: true
        },
    ];

    try {
        await MenuItem.deleteMany({});
        await MenuItem.insertMany(indianCuisines);
        console.log("Menu items populated successfully");
    } catch (error) {
        console.error('Error populating menu items:', error);
    }
}
