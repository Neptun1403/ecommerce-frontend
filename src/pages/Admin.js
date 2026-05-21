import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
    if (!user || user.role !== 'admin') {
        navigate('/');
    }
    fetchProducts();
    fetchCategories();
}, [user, navigate]);

    const fetchProducts = async () => {
        const res = await API.get('/products');
        setProducts(res.data);
    };

    const fetchCategories = async () => {
        const res = await API.get('/categories');
        setCategories(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await API.put(`/products/${editId}`, { name, price, image_url: imageUrl, category_id: categoryId });
                setMessage('Product updated!');
            } else {
                await API.post('/products', { name, price, image_url: imageUrl, category_id: categoryId });
                setMessage('Product created!');
            }
            setName(''); setPrice(''); setImageUrl(''); setCategoryId(''); setEditId(null);
            fetchProducts();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error');
        }
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setName(product.name);
        setPrice(product.price);
        setImageUrl(product.image_url || '');
        setCategoryId(product.category_id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await API.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin Panel</h2>

            <h3>{editId ? 'Edit Product' : 'Add Product'}</h3>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '200px' }}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '100px' }}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px', width: '250px' }}
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px' }}
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit" style={{ padding: '8px 15px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {editId ? 'Update' : 'Add'}
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={() => { setEditId(null); setName(''); setPrice(''); setImageUrl(''); setCategoryId(''); }}
                        style={{ padding: '8px 15px', background: 'gray', color: 'white', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            <h3>All Products</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#333', color: 'white' }}>
                        <th style={{ padding: '10px' }}>ID</th>
                        <th style={{ padding: '10px' }}>Name</th>
                        <th style={{ padding: '10px' }}>Price</th>
                        <th style={{ padding: '10px' }}>Category</th>
                        <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #ccc' }}>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.id}</td>
                            <td style={{ padding: '10px' }}>{product.name}</td>
                            <td style={{ padding: '10px' }}>${product.price}</td>
                            <td style={{ padding: '10px' }}>{product.category_name}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>
                                <button
                                    onClick={() => handleEdit(product)}
                                    style={{ background: 'blue', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;