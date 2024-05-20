import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Layout, Menu, Button, Space, ConfigProvider } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductsPage from './products/pages/ProductsPage';
import ShoppingCartPage from './shopping-cart/pages/ShoppingCartPage';
import TikTokLogo from './assets/TikTok.png';
import { IntlProvider, FormattedMessage } from 'react-intl';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import messages from './locales';

const { Header, Content, Footer } = Layout;

const CustomHeader: React.FC<{ locale: string; changeLocale: (locale: string) => void }> = ({ locale, changeLocale }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = location.pathname.replace(`/${locale}`, `/${newLocale}`);
    navigate(newPath);
    changeLocale(newLocale);
  };

  const selectedKey = location.pathname.split('/').slice(2).join('/');

  return (
    <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529', padding: '0' }}>
      <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={TikTokLogo} alt="TikTok Logo" style={{ width: '80px', height: 'auto' }} />
      </a>
      <Menu theme="dark" mode="horizontal" selectedKeys={[`/${locale}/${selectedKey}`]} style={{ flex: 1 }}>
        <Menu.Item key={`/${locale}/products`} icon={<AppstoreOutlined />}>
          <Link to={`/${locale}/products`}><FormattedMessage id="products" /></Link>
        </Menu.Item>
        <Menu.Item key={`/${locale}/shopping-cart`} icon={<ShoppingCartOutlined />}>
          <Link to={`/${locale}/shopping-cart`}><FormattedMessage id="shoppingCart" /></Link>
        </Menu.Item>
      </Menu>
      <Space style={{ marginLeft: 'auto', marginRight: '20px' }}>
        <Button type={locale === 'en' ? 'primary' : 'default'} onClick={() => handleLocaleChange('en')}>English</Button>
        <Button type={locale === 'zh' ? 'primary' : 'default'} onClick={() => handleLocaleChange('zh')}>中文</Button>
      </Space>
    </Header>
  );
};

const AppContent: React.FC<{ locale: string; changeLocale: (locale: string) => void }> = ({ locale, changeLocale }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomHeader locale={locale} changeLocale={changeLocale} />
      <Content style={{ padding: '0 80px', backgroundColor: '#f0f2f5', flex: 1 }}>
        <div className="site-layout-content" style={{ height: '100%' }}>
          <Routes>
            <Route path="/:locale/products" element={<ProductsPage />} />
            <Route path="/:locale/shopping-cart" element={<ShoppingCartPage />} />
            <Route path="/" element={<Navigate to="/en/products" />} />
            <Route path="*" element={<Navigate to="/en/products" />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>抖音电商 ©2024 Created by TikTok</Footer>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

const AppWrapper: React.FC = () => {
  const location = useLocation();
  const initialLocale = location.pathname.split('/')[1] || 'en';
  const [locale, setLocale] = useState(initialLocale);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  const antdLocale = locale === 'en' ? enUS : zhCN;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ConfigProvider locale={antdLocale}>
        <AppContent locale={locale} changeLocale={changeLocale} />
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;
