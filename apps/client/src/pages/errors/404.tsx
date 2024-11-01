import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      id="error-page"
      className="flex w-screen h-screen items-center justify-center shadow-md"
    >
      <div className="flex flex-col items-center space-y-3 bg-white border p-6 rounded-md">
        <h1 className="text-2xl font-medium text-gray-700 mb-6">
          404 Not Found
        </h1>
        <p className="text-xl mb-2 text-gray-600">
          The page you are trying to access is not available!
        </p>
        <Button>
          <Link to="/portal">Go To Home</Link>
        </Button>
      </div>
    </div>
  );
}
