import { Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/photo/:id" element={<PhotoDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
