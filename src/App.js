import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Row, Col } from "antd";
import DynamicForm from "./Components/dynamicForm";
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <Layout>
      <Content>
        <Row>
          <Col span="24">
            <div className="container">
              <div className="heading">
                <h3>Dynamic form in Ant Design</h3>
              </div>
              <DynamicForm />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
