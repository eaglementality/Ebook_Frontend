import { Navigate } from "react-router-dom";

function ProtectedRoute({children, allowedRole}:{children: React.ReactNode; allowedRole: "USER" | "ADMIN"}){

const userStringifiedObj = localStorage.getItem('user')
let user = JSON.parse(userStringifiedObj as string)

  if (!user || user.role !== allowedRole) {
    return <Navigate to='/' replace />;
  }
  return children
}
export default ProtectedRoute;