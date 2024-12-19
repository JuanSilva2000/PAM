import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext"; 
import "../css/components-css/AuthForms.css";

const RegisterPage = () => {
  const { signup, error, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (value) => {
    await signup(value);
  };
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-box">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Escribe tu nombre"
              className="input"
              {...register("username")}
              autoFocus
            />
            {errors.username?.message && (
              <p className="warning">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@domain.tld"
              className="input"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="warning">
                {errors.email?.message}
              </p>
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
              placeholder="********"
              className="input"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="warning">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="label"
            >
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className="input"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="warning">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="button"
          >
            Registrar
          </button>
        </form>
        <p className="footer-text">
          Tienes una cuenta?
          <Link className="footer-link" to="/login">
            Logeate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
