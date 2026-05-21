import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (searchTerm = '') => {
        try {
            const res = await API.get(`/products?search=${searchTerm}`);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product_id) => {
        try {
            await API.post('/cart', { product_id, quantity: 1 });
            alert('Added to cart!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding to cart');
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchProducts(e.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Products</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {products.map(product => (
                        <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '15px',
                                width: '200px'
                            }}>
                                <img
                                    src={product.image_url || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                />
                                <h4>{product.name}</h4>
                                <p>${product.price}</p>
                                <p style={{ color: 'gray', fontSize: '12px' }}>{product.category_name}</p>
                                <button
                                    onClick={(e) => { e.preventDefault(); addToCart(product.id); }}
                                    style={{ width: '100%', padding: '8px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;