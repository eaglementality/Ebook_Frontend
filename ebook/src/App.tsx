import Auth from "./Auth/page";
import { Route, Routes,  } from "react-router-dom";
import User from "./Client/page";
import AdminDashboard from "./Admin/page";
import ProtectedRoute from "./Auth/widget/protectedRoute";
import AutoLogout from "./Auth/widget/autoLogout";
// import { useEffect } from "react";
// import { useUserLoginStore } from "./hooks/store";

function App() {
  // const isRegistered = useUserLoginStore((state) => state.isRegistered);
  // const isSignedIn = useUserLoginStore((state) => state.isSignedIn);
  // const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
  // const navigate = useNavigate();

  // function Redirect() {
  //   if (
  //     (user.isRegistered === false && user.isSignedIn === false) ||
  //     (user.isRegistered === undefined && user.isSignedIn === undefined)
  //   ) {
  //     return <Auth />;
  //   }
  // }
  // useEffect(() => {
  //   Redirect();
  // }, [user]);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/ebook" element={<ProtectedRoute allowedRole="USER"><AutoLogout><User /></AutoLogout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><AutoLogout><AdminDashboard /></AutoLogout></ProtectedRoute>} />
      <Route
        path="*"
        element={
          <p className="flex justify-center items-center text-xl">Not Found</p>
        }
      />
    </Routes>
  );
}

export default App;
