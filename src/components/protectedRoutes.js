import { useDB } from "../content/dbContext";

export default function protectedRoute({children}) {
    const {} = useDB();
}