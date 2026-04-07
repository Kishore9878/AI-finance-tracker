import { useState } from "react";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);

    window.location.href = "/dashboard";
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded-lg"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded-lg"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="w-full bg-black text-white p-3 rounded-lg">
        Login
      </button>

      {/* 🔥 Register Link */}
      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-500 font-medium">
          Register
        </a>
      </p>
    </form>
  </div>
 );
};

export default Login;