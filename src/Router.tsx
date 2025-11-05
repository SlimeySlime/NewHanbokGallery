import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Bride from './pages/Bride';

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
          <Route path="bride" element={<Bride />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}