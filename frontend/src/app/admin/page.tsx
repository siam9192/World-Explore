import destinations from "../../../public/json/destinations.json";
import AdminDashboard from "./page-content";

export default function AdminHomePage() {
  return <AdminDashboard destinations={destinations} />;
}
