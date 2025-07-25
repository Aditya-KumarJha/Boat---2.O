import React, { useEffect, useState } from 'react';
import { Card, Layout, Menu, Avatar, Button, Divider, Tag } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  ArrowLeftOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  HeartOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import instance from '../utils/axios';
import Tilt from 'react-parallax-tilt';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const res = await instance.get(`/api/user/collection`, {
          params: {
            email: user?.primaryEmailAddress?.emailAddress,
          },
        });
        setSavedItems(res.data || []);
      } catch (err) {
        console.error('Error fetching saved items:', err);
      }
    };

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchSavedItems();
    }
  }, [user]);

  if (!user) return <Loading />;

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <span style={{ color: '#f5f5dc' }}>Dashboard</span>,
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/" style={{ color: '#f5f5dc' }}>Home</Link>,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span style={{ color: '#f5f5dc' }}>Logout</span>,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f172a, #0d9488, #065f46)' }} className="min-w-0">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        width="13.75rem"
        breakpoint="lg"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          paddingTop: '2rem',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          overflow: 'hidden',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="text-white text-lg font-semibold px-[1rem] pb-[1.5rem]">
          <Link to="/" className="flex items-center gap-2 text-[#f5f5dc] hover:text-gray-300">
            <ArrowLeftOutlined />
            {!collapsed && 'Back'}
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          style={{
            background: 'transparent',
            color: '#f5f5dc',
          }}
        />
      </Sider>

      <Layout className="min-w-0" style={{ background: 'transparent', marginLeft: collapsed ? '80px' : '13.75rem', transition: 'margin-left 0.2s ease' }}>
        <Header
          style={{
            background: 'linear-gradient(to right, #0f172a, #0d9488, #065f46)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0 2vw',
          }}
        >
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="font-medium"
          >
            Logout
          </Button>
        </Header>

        <Content
          className="min-w-0"
          style={{
            margin: '3vh 3vw',
            backgroundColor: '#0f172a',
            padding: '2rem',
            borderRadius: '1rem',
          }}
        >
          <div className="flex flex-col items-center gap-2 mb-8 text-center">
            <Avatar
              src={user.imageUrl}
              size={100}
              icon={<UserOutlined />}
              style={{ border: '2px solid #0d9488' }}
              draggable={false}
            />
            <h2 className="text-xl font-bold text-[#f5f5dc]">Welcome back,</h2>
            <p className="text-[#f5f5dc]">{user.fullName || user.username}</p>
            <Tag color="#0d9488" style={{ marginTop: '0.5rem' }}>Member since {new Date(user.createdAt).toLocaleDateString()}</Tag>
          </div>

          <Divider style={{ borderColor: '#0d9488', color: '#ffffff' }}>
            Dashboard Overview
          </Divider>


          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[{
              title: 'Your Overview',
              icon: <ShoppingOutlined style={{ color: '#0d9488' }} />,
              content: (
                <>
                  <p className="text-[#f5f5dc]">Total Orders: 3</p>
                  <p className="text-[#f5f5dc]">Wishlist Items: {savedItems.length}</p>
                  <p className="text-[#f5f5dc]">Last Login: {new Date().toLocaleString()}</p>
                </>
              ),
            }, {
              title: 'Recent Activity',
              icon: <ClockCircleOutlined style={{ color: '#0d9488' }} />,
              content: (
                <ul className="list-disc pl-5 space-y-1 text-[#f5f5dc]">
                  <li>Browsed "Wireless Earbuds" - 2h ago</li>
                  <li>Added "Bass Headphones" to Wishlist - yesterday</li>
                  <li>Visited "Soundbar" page - 3 days ago</li>
                </ul>
              ),
            }, {
              title: 'Account Details',
              icon: <ProfileOutlined style={{ color: '#0d9488' }} />,
              content: (
                <>
                  <p className="text-[#f5f5dc]">Email: {user.primaryEmailAddress?.emailAddress}</p>
                  <p className="text-[#f5f5dc]">Signed Up: {new Date(user.createdAt).toLocaleDateString()}</p>
                </>
              ),
            }, {
              title: 'Recent Orders',
              icon: <FileDoneOutlined style={{ color: '#0d9488' }} />,
              content: (
                <ul className="list-disc pl-5 space-y-1 text-[#f5f5dc]">
                  <li>#00124 – Wireless Earbuds – ₹1,999</li>
                  <li>#00123 – Bass Headphones – ₹2,499</li>
                  <li>#00122 – Soundbar – ₹3,299</li>
                </ul>
              ),
            }, {
              title: 'Wishlist Summary',
              icon: <HeartOutlined style={{ color: '#0d9488' }} />,
              content: savedItems.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-[#f5f5dc]">
                  {savedItems.map((item, index) => (
                    <li key={index} className="line-clamp-2">
                      {item.productId?.title || 'Unnamed product'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#f5f5dc]">No items in wishlist.</p>
              ),
            }, {
              title: 'Payment Methods',
              icon: <CreditCardOutlined style={{ color: '#0d9488' }} />,
              content: (
                <>
                  <p className="text-[#f5f5dc]">Default: **** **** **** 4242</p>
                  <p className="text-[#f5f5dc]">UPI Linked: yesbank@upi</p>
                  <Button type="link" style={{ color: '#3e4ef5' }}>
                    Manage Payment Options
                  </Button>
                </>
              ),
            }].map(({ title, icon, content }) => (
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} key={title}>
                <Card
                  title={<span className="flex items-center gap-2 text-[#f5f5dc]">{icon} {title}</span>}
                  className="transition-all duration-300 hover:shadow-2xl"
                  style={{
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  bodyStyle={{ paddingTop: '0.75rem' }}
                >
                  {content}
                </Card>
              </Tilt>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;