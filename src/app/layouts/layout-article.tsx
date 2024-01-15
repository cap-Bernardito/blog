import { OpenLoginModal } from "widgets/login-modal";
import { Sidebar } from "widgets/sidebar";
import { ToolsPanel } from "widgets/tools-panel/tools-panel";

import { Button } from "shared/ui/button";
import { Layout } from "shared/ui/layout/layout";

import { routePaths } from "../app-router/app-router-config";

export const LayoutArticle = () => (
  <Layout
    sidebarLeftSlot={<Sidebar />}
    toolsSlot={
      <ToolsPanel>
        <OpenLoginModal />
      </ToolsPanel>
    }
    controlsSlot={
      <Button as={"a"} to={routePaths.articles} title="Вернуться к статьям">
        Назад
      </Button>
    }
  />
);
