// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const useAuth = (allowedRoles) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window === "undefined") return; // Ensure running in browser
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");
  
//     console.log("Stored Token:", storedToken);
//     console.log("Stored Role:", storedRole);
  
//     if (!storedToken) {
//       console.log("No token found, redirecting to login...");
//       router.push("/medical-login");
//       return;
//     }
  
//     if (!storedRole || !allowedRoles.includes(storedRole)) {
//       console.log("Invalid role, clearing data & redirecting...");
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       router.push("/medical-login");
//       return;
//     }
  
//     setRole(storedRole);
//     setLoading(false);
//   }, [allowedRoles, router]);  

//   // Fetch user details AFTER role is confirmed
//   useEffect(() => {
//     if (!role) return;

//     const token = localStorage.getItem("token");
//     fetch("http://localhost:5000/dashboard", {
//       headers: { Authorization: token },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data.user) {
//           console.log("Invalid user data, clearing and redirecting...");
//           localStorage.removeItem("token");
//           localStorage.removeItem("role");
//           router.push("/medical-login");
//         } else {
//           setUser(data.user);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching user data:", err);
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         router.push("/medical-login");
//       });
//   }, [role, router]);

//   return { user, loading };
// };

// export default useAuth;
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = (allowedRoles) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure running in browser

    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    console.log("Checking authentication...");
    
    if (!storedToken) {
      console.warn("No token found. Redirecting to login...");
      router.replace("/medical-login");
      return;
    }

    if (!storedRole || !allowedRoles.includes(storedRole)) {
      console.warn("Invalid role. Clearing session & redirecting...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.replace("/medical-login");
      return;
    }

    setRole(storedRole);
    setLoading(false);
  }, [allowedRoles, router]);  

  // Fetch user details AFTER role is confirmed
  useEffect(() => {
    if (!role) return;

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          console.warn("Invalid user data. Clearing session & redirecting...");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.replace("/medical-login");
        } else {
          console.log("User authenticated:", data.user);
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.replace("/medical-login");
      });
  }, [role, router]);

  return { user, loading };
};

export default useAuth;
