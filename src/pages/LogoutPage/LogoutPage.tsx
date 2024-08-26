import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreService } from "src/api/useStoreService";

export function LogoutPage() {
  const storeService = useStoreService();
  const navigate = useNavigate();

  useEffect(() => {
    storeService.logout();
    navigate("/login");
    navigate(0);
  }, [storeService, navigate]);

  return <div></div>;
}
