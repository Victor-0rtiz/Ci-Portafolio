import { Navigate } from "react-router-dom";
import { useDB } from "../content/dbContext";

export default function ProtectedRoute({children}) {
    const {user} = useDB();
    if (!user) return <Navigate to="/login"/>
    return <>{children}</>
}