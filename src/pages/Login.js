import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/login', { email, password });
            login(res.data.user, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    style={{ width: '100%', padding: '10px', background: 'blue', color: 'white' }}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            <p>No account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;