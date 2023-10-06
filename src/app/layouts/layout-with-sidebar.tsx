import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/sidebar";

import { Layout } from "shared/ui/layout/layout";

export const LayoutWithSidebar = () => <Layout headerSlot={<Navbar />} sidebarSlot={<Sidebar />} />;
