import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): ReactNode {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return null; // Retorna null ou outro componente de carregamento, se preferir.
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
