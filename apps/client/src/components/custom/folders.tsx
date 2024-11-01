import React, { useState, useEffect } from 'react';
import { FolderOpen, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { authState, folderState } from '@/store/auth';
import instance from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Folder } from '@/types/folder';
import FolderDropdown from './folder-dropdown';

export default function Folders() {
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState<boolean>(false);
  const [folders, setFolders] = useRecoilState(folderState);

  const getMyFolders = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/folder/all`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFolders(data.folders);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMyFolders();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : !folders || folders.length < 1 ? (
    <div className="w-[100%] h-[100%] flex items-center justify-center ">
      <div className="mt-12 flex flex-col items-center space-y-3">
        <p className="text-2xl text-neutral-500 font-medium">
          This section looks so neat and clean!
        </p>
        <p className="text-xl text-neutral-500 ">
          Create on "New Folder" button to add a folder
        </p>
      </div>
    </div>
  ) : (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
      {folders.map((folder) => (
        <Card
          key={folder._id}
          className="flex rounded-md items-center justify-between p-2 shadow-none hover:shadow-md transition-all"
        >
          <Link
            className="flex items-center space-x-1 flex-grow"
            to={`/portal/${folder._id}`}
          >
            <div>
              <FolderOpen size={36} className="text-white " fill="#334155" />
            </div>
            <div className="flex flex-col items-between">
              <p className="text-sm font-medium">{folder.name}</p>
              <p className="text-xs text-gray-500">
                {folder.articles} articles
              </p>
            </div>
          </Link>
          <div>
            <FolderDropdown
              name={folder.name}
              onDelete={(id) =>
                setFolders((prev) => prev.filter((f) => f._id !== id))
              }
              folderId={folder._id}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
