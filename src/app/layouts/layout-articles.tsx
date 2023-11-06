import { Sidebar } from "widgets/sidebar";
import { SidebarSecondary } from "widgets/sidebar-secondary";
import { ToolsPanel } from "widgets/tools-panel/tools-panel";

import { ChangeArticlesView } from "features/change-articles-view";

import { Layout } from "shared/ui/layout/layout";

export const LayoutArticles = () => (
  <Layout
    sidebarLeftSlot={<Sidebar />}
    toolsSlot={<ToolsPanel />}
    sidebarRightSlot={<SidebarSecondary />}
    controlsSlot={<ChangeArticlesView />}
  />
);
