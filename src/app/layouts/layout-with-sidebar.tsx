import { Sidebar } from "widgets/sidebar";
import { ToolsPanel } from "widgets/tools-panel/tools-panel";

import { Layout } from "shared/ui/layout/layout";

export const LayoutWithSidebar = () => <Layout sidebarLeftSlot={<Sidebar />} toolsSlot={<ToolsPanel />} />;
