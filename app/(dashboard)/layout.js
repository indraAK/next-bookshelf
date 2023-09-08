import Header from "@/components/layouts/header";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  );
}
