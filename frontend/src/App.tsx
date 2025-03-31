import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import ExploreServersPage from './pages/ExploreServersPage';
import RegisterPage from './pages/RegisterPage';
import ServerDetailPage from './pages/ServerDetailPage';
import './App.css';

// Create a custom theme based on the new dark design with turquoise accents
const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#00f8e0', // Bright turquoise from the image
		},
		secondary: {
			main: '#ff4a4a', // Red accent from the second image
		},
		background: {
			default: '#121212', // Dark background
			paper: '#181818', // Slightly lighter dark for cards/papers
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0b0b0',
		},
	},
	typography: {
		fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
		h1: {
			fontWeight: 800,
			letterSpacing: '-0.02em',
		},
		h2: {
			fontWeight: 800,
			letterSpacing: '-0.01em',
		},
		h3: {
			fontWeight: 700,
		},
		h4: {
			fontWeight: 700,
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
					fontWeight: 600,
				},
				containedPrimary: {
					background: 'linear-gradient(90deg, #00dfca 0%, #00f8e0 100%)',
					color: '#000000',
					'&:hover': {
						background: 'linear-gradient(90deg, #00c7b4 0%, #00e0ca 100%)',
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					backgroundImage: 'none',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					backgroundImage: 'none',
					border: '1px solid rgba(255, 255, 255, 0.1)',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#121212',
					backgroundImage: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/explore" element={<ExploreServersPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/servers/:id" element={<ServerDetailPage />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
