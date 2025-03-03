import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = (allowedRoles) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token) {
      router.push("/medical-login"); // Redirect to login if no token
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/medical-login");
    }

    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.push("/medical-login");
        } else {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error("Error in useAuth fetch:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/medical-login");
      })
      .finally(() => setLoading(false)); // Stop loading when check is complete
  }, [router, allowedRoles]);

  return { user, loading };
};

export default useAuth;
