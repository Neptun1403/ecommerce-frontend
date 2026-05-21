import { useState, useEffect } from 'react';
import API from '../services/api';

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await API.get('/cart');
            setCart(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        try {
            await API.delete(`/cart/${id}`);
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h4>{item.product_name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                                <p>Total: ${item.total_price}</p>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                style={{ background: 'red', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                </>
            )}
        </div>
    );
}

export default Cart;