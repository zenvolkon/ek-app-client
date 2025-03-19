import { useNavigate } from "react-router-dom";
import { Layout, Button, Space, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sider from "antd/es/layout/Sider";

const { Header, Content, Footer } = Layout;

// Создаем QueryClient
const queryClient = new QueryClient();

// Правильное описание стилей
const styles: Record<string, React.CSSProperties> = {
  header: { textAlign: "center", color: "#fff", height: 64, lineHeight: "64px", backgroundColor: "#D2691E" },
  content: { textAlign: "center", minHeight: 120, lineHeight: "120px", backgroundColor: "#FFFFFF" },
  sider: { textAlign: "center", backgroundColor: "#DCDCDC", padding: "16px" },
  footer: { textAlign: "center", color: "#fff", backgroundColor: "#808080" }
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  // Обработчик выхода
  const handleLogout = () => {
    queryClient.clear(); // Очистка кэша TanStack Query
    navigate("/"); // Перенаправление на главную
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#D2691E" } }}>
        <Layout className="layoutStyle">
          <Header style={styles.header}>Рабочее пространство</Header>
          <Layout>
            <Sider width="15%" style={styles.sider}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button type="primary" block onClick={() => navigate("/parcels")}>Накладные</Button>
                <Button type="default" block onClick={() => navigate("/cities")}>Города</Button>
                <Button danger block onClick={handleLogout}>Выход</Button>
              </Space>
            </Sider>
            <Content style={styles.content}>Content</Content>
          </Layout>
          <Footer style={styles.footer}>ООО Экспресс Кинетика</Footer>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default MainPage;

