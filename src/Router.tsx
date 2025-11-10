import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Search from './pages/Search';
import TopNav from './components/TopNav';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Display from './pages/Display';

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
          <Route path="gallery" element={<Gallery />} />
          <Route path="bride" element={<Gallery customer_type="신부" />} />
          <Route path="groom" element={<Gallery customer_type="신랑" />} />
          <Route path="guest" element={<Gallery customer_type="하객" />} />
          <Route path="parent" element={<Gallery customer_type="혼주" />} />
          <Route path="search" element={<Search />} />
          <Route path="display/:displayCode" element={<Display />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}