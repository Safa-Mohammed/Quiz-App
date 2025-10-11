 import { useNavigate } from "react-router-dom";
import { notFoundImg } from "../../assets/Images";
 
interface NotFoundProps {
  /** Optional image URL - if not provided the default will be used */
  imageSrc?: string;
  /** Optional message under the title */
  message?: string;
}

export default function NotFoundPage({
  imageSrc = notFoundImg,
  message = "The page you are looking for doesn\'t exist or has been moved.",
}: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full      p-8 sm:p-12 text-center">
        {/* Image centered and responsive */}
        <div className="flex justify-center mb-8">
          <img
            src={imageSrc}
            alt="Page not found illustration"
            className="w-52 max-w-sm h-auto object-contain"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Page not found</h1>

        <p className="text-sm sm:text-base text-gray-600 mb-6">{message}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3  rounded-lg border border-black text-black hover:bg-gray-100 transition w-full sm:w-auto"
            aria-label="Go back"
          >
           Go back
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg bg-black text-white hover:opacity-95 transition w-full sm:w-auto"
            aria-label="Go to homepage"
          >
            Go to Homepage
          </button>
        </div>

       </div>
    </main>
  );
}
