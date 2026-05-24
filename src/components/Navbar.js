import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: '#333',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
                🛒 E-Commerce
            </Link>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
                <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
                {user ? (
                    <>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Hi, {user.name}</Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" style={{ color: 'yellow', textDecoration: 'none' }}>Admin</Link>
                        )}
                        <button
                            onClick={handleLogout}
                            style={{ background: 'red', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;