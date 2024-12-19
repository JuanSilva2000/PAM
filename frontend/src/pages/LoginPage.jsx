import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import "../css/components-css/AuthForms.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-box">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@gmail.com"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email?.message && (
              <p className="warning">{errors.email?.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="label"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Escribe tu contraseña"
              className="input"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.message && (
              <p className="warning">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="button"
          >
            Login
          </button>
        </form>
        <p className="footer-text">
          No tienes una cuenta?{" "}
          <Link to="/register" className="footer-link">
            Crear nueva
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
