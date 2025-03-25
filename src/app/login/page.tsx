"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '../UI/NavBar';
import Footer from '../UI/Footer';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      // Redirect to home page after successful login
      window.location.href = '/';
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p>Don't have an account? <Link href="/register" className="text-yellow-500 hover:text-yellow-400">Register here</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 