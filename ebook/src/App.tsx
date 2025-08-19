import Auth from "./Auth/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./Client/page";
import AdminDashboard from "./Admin/page";
// import { useUserLoginStore } from "./hooks/store";

function App() {
  // const isRegistered = useUserLoginStore((state) => state.isRegistered);
  // const isSignedIn = useUserLoginStore((state) => state.isSignedIn);
  const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nursequill.vercel.app" element={<Auth />} />
        <Route
          path="nursequill.vercel.app/ebook"
          element={
            user.isRegistered === false && user.isSignedIn === false ? (
              <Auth />
            ) : (
              <User />
            )
          }
        />
        <Route
          path="/nursequill.vercel.app/admin"
          element={
            user.isRegistered === false && user.isSignedIn === false ? (
              <Auth />
            ) : (
              <AdminDashboard />
            )
          }
        />
        <Route
          path="*"
          element={
            <p className="flex justify-center items-center text-xl">
              Not Found
            </p>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
