import { useState, useEffect } from 'react';
import API from '../services/api';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await API.get('/orders/my');
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '10px'
                    }}>
                        <p><b>Order ID:</b> {order.id}</p>
                        <p><b>Product:</b> {order.product_name}</p>
                        <p><b>Quantity:</b> {order.quantity}</p>
                        <p><b>Price:</b> ${order.price}</p>
                        <p><b>Status:</b> {order.status}</p>
                        <p><b>Date:</b> {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;