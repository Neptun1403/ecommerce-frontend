import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    fetchProduct();
}, []);

    const fetchProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await API.post('/cart', { product_id: product.id, quantity: 1 });
            alert('Added to cart!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error');
        }
    };

    if (loading) return <p style={{ padding: '20px' }}>Loading...</p>;
    if (!product) return <p style={{ padding: '20px' }}>Product not found</p>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/')}
                style={{ marginBottom: '20px', padding: '8px 15px', cursor: 'pointer' }}
            >
                ← Back
            </button>
            <div style={{ display: 'flex', gap: '40px' }}>
                <img
                    src={product.image_url || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div>
                    <h2>{product.name}</h2>
                    <p style={{ color: 'gray' }}>{product.category_name}</p>
                    <h3 style={{ color: 'green', fontSize: '28px' }}>${product.price}</h3>
                    <button
                        onClick={addToCart}
                        style={{
                            padding: '12px 30px',
                            background: 'blue',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '20px'
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;