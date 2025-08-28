import { useNavigate } from "react-router-dom";
import { useUserLoginStore } from "../../hooks/store";

export function ProfileCard() {
  const navigate = useNavigate();
  const name = useUserLoginStore((state) => state.name);
  function handleLogout() {
    window.sessionStorage.setItem("user", JSON.stringify({ isRegistered: false, isSignedIn: false }));
    navigate("/");
  }
  return (
    <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=160&auto=format&fit=crop"
        alt="profile"
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="text-xs lowercase text-neutral-400">admin</p>
        <p className="truncate text-sm font-semibold">Welcome</p>
        <p className="truncate text-sm text-neutral-500">{name}</p>
      </div>
      <h1 onClick={handleLogout} className="flex ml-20 cursor-pointer font-semibold bg-rose-100 p-2 rounded-xl">Log out</h1>
    </div>
  );
}