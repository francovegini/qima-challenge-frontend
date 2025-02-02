import { Layout as LayoutAntd, Menu, theme } from 'antd';
import { ShoppingCartOutlined, UserOutlined, } from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeSession } from "../../utils/session.ts";

const { Content, Sider } = LayoutAntd;

type LayoutProps = {
  children: React.ReactNode;
};

const items = [
  {
    key: '1',
    icon: <ShoppingCartOutlined />,
    label: 'Products',
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: 'Logout',
    danger: true,
  },
];

export const Layout = ({ children }: LayoutProps) => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenu = (event: { key: string }) => {
    if (event.key === '1') {
      navigate('/');
    } else if (event.key === '2') {
      removeSession();
      navigate('/login');
    }
  }

  return (
      <LayoutAntd style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
                onClick={handleMenu}
          />
        </Sider>

        <LayoutAntd>
          <Content
              style={{
                margin: '20px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
          >
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
  );
}

export default Layout;
