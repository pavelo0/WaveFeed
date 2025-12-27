import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../lib/api';

export interface LocalUser extends User {
	password: string;
}

export interface RegisterData {
	name: string;
	username: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

interface AuthState {
	users: LocalUser[];
	currentUser: LocalUser | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	users: [],
	currentUser: null,
	isAuthenticated: false
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,

	reducers: {
		register: (state, action: PayloadAction<RegisterData>) => {
			const existingUser = state.users.find(
				user => user.email === action.payload.email
			);

			if (!existingUser) {
				const newUser: LocalUser = {
					id: Date.now(),
					name: action.payload.name,
					username: action.payload.username,
					email: action.payload.email,
					password: action.payload.password
				};

				state.users.push(newUser);
				state.currentUser = newUser;
				state.isAuthenticated = true;
			}
		},

		login: (state, action: PayloadAction<LoginData>) => {
			const user = state.users.find(
				user => user.email === action.payload.email
			);

			if (user && user.password === action.payload.password) {
				state.currentUser = user;
				state.isAuthenticated = true;
			}
		},

		logout: state => {
			state.currentUser = null;
			state.isAuthenticated = false;
		}
	}
});

export const { register, login, logout } = authSlice.actions;
