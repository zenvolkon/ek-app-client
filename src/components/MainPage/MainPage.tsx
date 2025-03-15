import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { HomeOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/parcels")}>
                        Накладные
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileTextOutlined />} onClick={() => navigate("/cities")}>
                        Города
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
                        Авторизация
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                {/* Add your content here */}
            </Content>
        </Layout>
    );
}

export default MainPage;