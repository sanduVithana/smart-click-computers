import { useState } from "react";
import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAPI(form);

      login(data);

      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl mb-5">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          className="bg-blue-600 text-white p-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;