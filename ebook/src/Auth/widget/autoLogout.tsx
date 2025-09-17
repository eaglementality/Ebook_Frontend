
import { logout } from "../../Admin/widget/profileCard";
import { useEffect } from "react";
import {useNavigate, type NavigateFunction} from 'react-router-dom';

function AutoLogout({ children }: { children: React.ReactNode }) {
    const navigate:NavigateFunction = useNavigate()
  let timer: NodeJS.Timeout;

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return logout(navigate);
    }, 5 * 60 * 1000); // 5 mins inactivity
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