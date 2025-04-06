
//TODO: camibiar el mockup por una API real.

const mockProducts = [


    {
        id: 1,
        name: "Camiseta Naruto",
        description: "Camiseta de Naruto con 50% de descuento",
        price: "10.99€",
        originalPrice: "20.99€",
        discount: "50%",
        image: "/assets/products/image1.jpg",
        likes: 0,
        hasLiked: false,
        category: "anime",
        ratings: [],
        comments: [],
        inWishlist: false // Nuevo campo
    },
    {
        id: 2,
        name: "Camiseta Linkin Park",
        description: "Camiseta de Linkin Park con 10% de descuento",
        price: "18.89€",
        originalPrice: "20.99€",
        discount: "10%",
        image: "/assets/products/image2.jpg",
        likes: 0,
        hasLiked: false,
        category: "bandas",
        ratings: [],
        comments: [],
        inWishlist: false // Nuevo campo
    },
    {
        id: 3,
        name: "Camiseta Limp Bizkit",
        description: "Camiseta de Limp Bizkit con 35% de descuento",
        price: "13.64€",
        originalPrice: "20.99€",
        discount: "35%",
        image: "/assets/products/image3.jpg",
        likes: 0,
        hasLiked: false,
        category: "bandas",
        ratings: [],
        comments: [],
        inWishlist: false // Nuevo campo
    },
    {
        id: 4,
        name: "Camiseta Dragon Ball Z",
        description: "Camiseta de Dragon Ball Z con 95% de descuento",
        price: "1.05€",
        originalPrice: "20.99€",
        discount: "95%",
        image: "/assets/products/image4.jpg",
        likes: 0,
        hasLiked: false,
        category: "anime",
        ratings: [],
        comments: [],
        inWishlist: false // Nuevo campo
    },
    {
        id: 5,
        name: "Camiseta One Piece",
        description: "Camiseta de One Piece con 20% de descuento",
        price: "16.79€",
        originalPrice: "20.99€",
        discount: "20%",
        image: "/assets/products/image5.jpg",
        likes: 0,
        hasLiked: false,
        category: "anime",
        ratings: [],
        comments: [],
        inWishlist: false // Nuevo campo
    }
];

let cart = [];
export const getProductsByCategory = (category) => {
    return mockProducts.filter(product => product.category === category);
};
export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

export const addToMockupCart = (productConfig) => {
    cart.push(productConfig);
};

export const getMockupCart = () => {
    return cart;
};

export const addRating = (productId, rating) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        product.ratings.push(rating);
    }
};

export const valorateProduct = async (productId, hasLiked) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        if (hasLiked) {
            product.likes -= 1;
            product.hasLiked = false;
        } else {
            product.likes += 1;
            product.hasLiked = true;
        }
        return { likes: product.likes, hasLiked: product.hasLiked };
    }
    throw new Error('Product not found');
};

export const toggleWishlist = (productId) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        product.inWishlist = !product.inWishlist;
    }
};

const api = {
    fetchProducts,
    addToMockupCart,
    getMockupCart,
    addRating,
    valorateProduct,
    toggleWishlist // Nueva función
};

export default api;