import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <p className="text-6xl font-bold text-neutral-200">404</p>
      <h1 className="text-xl font-bold text-neutral-900">Page not found</h1>
      <p className="text-sm text-neutral-500">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
      >
        Go to Gallery
      </button>
    </div>
  );
}
