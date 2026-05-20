import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await API.post('/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Register failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', background: 'green', color: 'white' }}
                >
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
            <p>Already have account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;