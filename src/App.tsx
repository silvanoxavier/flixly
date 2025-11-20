"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import MainLayout from './layouts/MainLayout';
import Index from './pages/Index';
import Channels from './pages/Channels';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="/channels" element={<Channels />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;