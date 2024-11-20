import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToSignin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/signin");
  }, [navigate]);

  return null;
};

export default RedirectToSignin;
