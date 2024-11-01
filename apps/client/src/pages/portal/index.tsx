import SearchBar from '@/forms/search';
import CreateFolderForm from '@/forms/create-folder';
import Folders from '@/components/custom/folders';
import { AppBreadcrumb } from '@/components/custom/breadcrumb';

export default function PortalHome() {
  return (
    <main>
      <div className="flex flex-col md:flex-row md:items-center space-x-1 mb-4">
        <SearchBar />
        <CreateFolderForm />
      </div>
      <AppBreadcrumb
        routes={[{ name: 'Portal', href: '/portal', endpoint: false }]}
      />
      <Folders />
    </main>
  );
}
