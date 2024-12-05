import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./pages/404";
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import BlogDetailPage from "./pages/blog/Detail";
import BlogPage from "./pages/blog/Index";
import BlogListPage from "./pages/blog/List";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import { useState } from "react";
import Layout from "./pages/blog/Layout";

// 목 데이터(Mock Data)
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련글" },
  { id: 3, title: "블로그 3", cate: "design", content: "디자인 관련글 2" },
  { id: 4, title: "블로그 4", cate: "idea", content: "아이디어 관련글" },
  { id: 5, title: "블로그 5", cate: "design", content: "디자인 관련글 3" },
];

function App() {
  const [isMember, setIsMember] = useState(true);
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage title="좋은회사" year={2024} />} />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog" element={<Layout />}>
            <Route index element={<BlogPage data={BlogDatas} />} />
            <Route path=":id" element={<BlogDetailPage />} />
            {/* <Route path="list?id=1&cate=design" element={<BlogListPage />} /> */}
            <Route path="list" element={<BlogListPage />} />
          </Route>

          {/* 존재하지 않는 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 By Hong</p>
        {isMember ? <p>로그인 하셨네요</p> : <p>로그인 전 입니다</p>}
      </Footer>
    </Router>
  );
}

export default App;
