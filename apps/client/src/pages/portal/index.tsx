import SearchBar from '@/forms/search';
import React from 'react';
import CreateFolderForm from '@/forms/create-folder';
import Folders from '@/components/custom/folders';

export default function PortalHome() {
  return (
    <main>
      <div className="flex flex-col md:flex-row md:items-center space-x-1 mb-4">
        <SearchBar />
        <CreateFolderForm />
      </div>
      <Folders />
    </main>
  );
}
