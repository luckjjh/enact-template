import {createSlice} from '@reduxjs/toolkit';

const {actions, reducer} = createSlice({
	name: 'general',
	initialState: {
		isForeground: true,
		isOptionMenuOpen: false,
		launchParams: {}
	},
	reducers: {
		openOptionMenu: (state, action) => {
			state.isOptionMenuOpen = action.payload;
		},
		setForeground: (state, action) => {
			state.isForeground = action.payload;
		},
		setLaunchParams: (state, action) => {
			state.launchParams = action.payload;
		}
	}
});

export const {openOptionMenu, setForeground, setLaunchParams} = actions;
export default reducer;
