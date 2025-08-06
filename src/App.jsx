import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Dashboard from "@/components/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <div
        className="App min-h-screen bg-gradient-to-br from-violet-400 via-purple-500 to-blue-600 bg-[length:400%_400%] animate-gradient-x">
        <div className="min-h-screen backdrop-blur-sm bg-white/10">
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{
                    zIndex: 9999
                }} />
        </div>
    </div></BrowserRouter>
  );
}

export default App;