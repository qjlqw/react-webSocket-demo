import React, { useContext, useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Routes from "../../router";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Dropdown,
  Space,
  Avatar,
  Badge,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem({ label, key, icon, children, element, path }) {
  return {
    key,
    icon,
    children,
    label,
    element,
    path
  };
}

const items = Routes.routes[0].children.map((item) => {
  const list = getItem(Object.assign(item, { key: item.path }));
  return list;
});

const DropdownList = [
  {
    key: "1",
    label: "个人信息",
  },
  {
    key: "2",
    label: "退出登录",
  },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [BreadcrumbName, setBreadcrumbName] = useState([]);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /**
   * 递归使数组扁平化 缓存 flattenArray 的结果
   * */
  const flatItems = React.useMemo(() => {
    function flattenArray(arr, parentKey = '') {
      return arr.reduce((acc, val) => {
        // react-router 会将 children 作为属性传递给组件，这里删除掉 hasErrorBoundary 属性, 避免传递给组件, 导致报错 
        delete val.hasErrorBoundary;
        // 生成当前菜单项的 key， 在onselectMenu方法根据key来匹配当前菜单项，获取面包屑标题，`${parentKey}-${val.path}` 用于生成唯一的 key
        const currentKey = parentKey ? `${parentKey}/${val.path}` : val.path;
        val.key = currentKey;
        // 将当前菜单项添加到数组中
        acc.push(val);
        // 如果当前菜单项有子菜单，递归调用 flattenArray
        if (val.children && val.children.length > 0) {
          const children = flattenArray(val.children, currentKey);
          acc.push(...children);
        }
        return acc;
      }, []);
    }
    return flattenArray(items);
  }, [items]);
  console.log(flatItems);
  
  /**
   * 点击菜单时触发，获取当前菜单的面包屑
   * */
  function onselectMenu({ item, key, keyPath, selectedKeys }) {
    console.log(item, key, keyPath, selectedKeys);
    
    setBreadcrumbName([]);
    let currentMenu = null
    
    // 递归查找当前菜单项及其父级的 label
    function findLabelsByKey(arr, key, path = []) {
      // 遍历数组，查找当前菜单项
      for (const item of arr) {
        // 如果当前菜单项的 key 与传入的 key 相等，返回当前菜单项的 label
        if (item.key === key) {
          currentMenu = item;
          return [...path, item.label];
        }
        // 如果当前菜单项有子菜单，递归调用 findLabelsByKey
        if (item.children && item.children.length > 0) {
          const result = findLabelsByKey(item.children, key, [...path, item.label]);
          if (result) return result;
        }
      }
      return null;
    }
    const labels = findLabelsByKey(flatItems, key);
    if (labels) {
      // 设置面包屑标题
      setBreadcrumbName(labels);
      navigate(currentMenu.path);
    }
  }

  function onHandleDropdown({ key }) {
    if (key === "2") {
      console.log("退出登录");
    }
  }

  useEffect(() => {
    if (items.length > 0) {
      setBreadcrumbName([items[0].label]);
    }
  }, [items]);

   // 将 BreadcrumbName 转换为 Breadcrumb 的 items 格式
   const breadcrumbItems = BreadcrumbName.map((item, index) => ({
      key: index,
      title: item,
    }));

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          onSelect={onselectMenu}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 20px",
            marginBottom: 16,
            alignItems: "center",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Breadcrumb items={breadcrumbItems}>
            {/* {BreadcrumbName.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))} */}
          </Breadcrumb>
          <Dropdown
            menu={{
              items: DropdownList,
              onClick: onHandleDropdown,
            }}
            trigger={['click']}
            onClick={onHandleDropdown}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Badge count={1}>
                  <Avatar icon={<UserOutlined />} />
                </Badge>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          
          <div
            style={{
              padding: 12,
              minHeight: '85vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          react-admin ©{new Date().getFullYear()} Created by Mr.Qin
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
