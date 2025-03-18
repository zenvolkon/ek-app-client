import './MainPage.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Layout,
    ConfigProvider,
    Menu,
    theme,
    Button, 
    Collapse,
    Flex,
    Space} from 'antd';
import { 
    HomeOutlined,
    FileTextOutlined,
    UserOutlined } from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import { groupCollapsed } from "console";
import { Footer } from 'antd/es/layout/layout';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#D2691E',
  };
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#FFFFFF',
  };
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#DCDCDC',
  };
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#808080',
  };
  

const { Header, Content } = Layout;

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout className='layoutStyle'>
            <Header style={headerStyle}>Рабочее пространство</Header>
            <Layout>
                <Sider width="15%" style={siderStyle}>
                    <Space direction='vertical' style={{ width: '100%' }}>
                            <Button color='orange' onClick={() => navigate('/parcels')}>Накладные</Button>
                            <Button onClick={() => navigate('/cities')}>Города</Button>
                            <Button onClick={() => navigate('/')}>Выход</Button>
                    </Space>

                </Sider>
                <Content style={contentStyle}>Content</Content>
            </Layout>
            <Footer style={footerStyle}>ООО Экспресс Кинетика</Footer>
        </Layout>
    );
}

export default MainPage;