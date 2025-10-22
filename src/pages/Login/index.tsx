import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Hero from "./components/Hero";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

export const Login = () => {
  const [error, setError] = useState("");

  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  return (
    <div className="min-h-screen flex">
      <Hero />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <Header />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon icon="material-symbols:error" className="text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  {error}
                </span>
              </div>
            </div>
          )}
          <LoginForm onError={setError} />
        </div>
      </div>
    </div>
  );
};
