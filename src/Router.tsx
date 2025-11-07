import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

const AppLayout = () => (
  <div className="flex flex-col m-auto min-h-screen justify-between">
    <TopNav />
    <main className="pt-16 flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery customer_type="전체"/>} />
          <Route path="bride" element={<Gallery customer_type="신부" />} />
          <Route path="groom" element={<Gallery customer_type="신랑" />} />
          <Route path="guest" element={<Gallery customer_type="하객" />} />
          <Route path="parent" element={<Gallery customer_type="혼주" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}