import React from 'react';
import Header from './components/Header/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserQuery } from './hooks/useUserQuery';
import PostList from './components/PostList';
import { BrowserRouter, Routes, Route } from "react-router";
import PostPage from './pages/PostPage/PostPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './components/CreatePost';

const App: React.FC = () => {
  const siteName = "Blogz";
  useUserQuery();
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header siteName={siteName} />
        <main className="mx-auto px-4 py-12 min-h-96 container">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/create" element={<ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {siteName}
          </div>
        </footer>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
