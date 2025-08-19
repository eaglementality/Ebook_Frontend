import Auth from "./Auth/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./Client/page";
import AdminDashboard from "./Admin/page";
import { useUserLoginStore } from "./hooks/store";

function App() {
  const isRegistered = useUserLoginStore((state) => state.isRegistered);
  const isSignedIn = useUserLoginStore((state) => state.isSignedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/ebook"
          element={isRegistered  === false && isSignedIn === false ? <Auth /> : <User />}
        />
        <Route
          path="/admin"
          element={isRegistered === false && isSignedIn === false ? <Auth /> : <AdminDashboard />}
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
