import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export const Header = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate({ to: '/login' });
		setIsLogin(true);
	};
	const handleRegister = () => {
		navigate({ to: '/register' });
		setIsLogin(true);
	};

	const handleLogout = () => {
		dispatch(logout());
		navigate({ to: '/' });

		setIsLogin(false);
	};

	return (
		<header>
			<h1>DevFeed</h1>

			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					<li>
						<Link to="/contacts">Contacts</Link>
					</li>
					{isLogin && (
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					)}
				</ul>
			</nav>

			{!isLogin && (
				<>
					<button onClick={handleLogin}>Login</button>
					<button onClick={handleRegister}>Register</button>
				</>
			)}
			{isLogin && <button onClick={handleLogout}>Logout</button>}
		</header>
	);
};
