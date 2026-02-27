import AdminDashboardClient from "./AdminDashboardClient";


export const generateViewport = () => {
  return {
    themeColor: 'black',
    width: 'device-width',
    initialScale: 1,
  };
};

export const metadata = {
  title: "ByteBack | Admin Dashboard",
  description: "Monitor inventory and user performance.",
};

export default function Page() {
  return <AdminDashboardClient />;
}