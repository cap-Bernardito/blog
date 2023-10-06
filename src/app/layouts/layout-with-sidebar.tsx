import { Sidebar } from "widgets/sidebar";

import { Layout } from "shared/ui/layout/layout";

export const LayoutWithSidebar = () => <Layout sidebarLeftSlot={<Sidebar />} />;
