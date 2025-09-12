
import { logout } from "../../Admin/widget/profileCard";
import { useEffect } from "react";

function AutoLogout({ children }: { children: React.ReactNode }) {
  let timer: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      logout()
    }, 30 * 60 * 1000); // 30 mins inactivity
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer(); // start timer

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timer);
    };
  }, []);

  return children
}
export default AutoLogout;