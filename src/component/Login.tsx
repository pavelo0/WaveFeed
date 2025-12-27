import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { store } from '../store';
import type { LoginData } from '../store/slices/authSlice';
import { login } from '../store/slices/authSlice';

interface FormErrors {
	email?: string;
	password?: string;
}

const Login = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [loginError, setLoginError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleVisible = () => {
		setIsVisible(!isVisible);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: '/' });
		}
	}, [isAuthenticated, navigate]);

	const validateForm = (data: LoginData): FormErrors => {
		const newErrors: FormErrors = {};

		if (!data.email || data.email.trim().length === 0) {
			newErrors.email = 'Email is required';
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(data.email)) {
				newErrors.email = 'Please enter a valid email address';
			}
		}

		if (!data.password || data.password.length === 0) {
			newErrors.password = 'Password is required';
		} else if (data.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		return newErrors;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData: LoginData = {
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || ''
		};

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		setLoginError(null);

		dispatch(login(formData));

		setTimeout(() => {
			const currentAuth = store.getState().auth.isAuthenticated;
			if (!currentAuth) {
				setLoginError('Invalid email or password');
			}
		}, 0);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto space-y-4"
		>
			<div>
				<input
					type="email"
					placeholder="Email"
					ref={emailRef}
					className={`w-full px-4 py-2 border rounded-lg ${
						errors.email ? 'border-red-500' : 'border-gray-300'
					}`}
					required
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-500">{errors.email}</p>
				)}
			</div>

			<div>
				<div className="relative">
					<input
						type={isVisible ? 'text' : 'password'}
						placeholder="Password"
						ref={passwordRef}
						className={`w-full px-4 py-2 border rounded-lg ${
							errors.password ? 'border-red-500' : 'border-gray-300'
						}`}
						required
					/>
					<button
						onClick={handleVisible}
						type="button"
						className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
					>
						{isVisible ? 'Hide' : 'Show'}
					</button>
				</div>
				{errors.password && (
					<p className="mt-1 text-sm text-red-500">{errors.password}</p>
				)}
			</div>

			{loginError && (
				<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-sm text-red-600">{loginError}</p>
				</div>
			)}

			<button
				type="submit"
				className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
			>
				Login
			</button>
		</form>
	);
};

export default Login;
