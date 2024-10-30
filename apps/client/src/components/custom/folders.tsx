import React from 'react';
import { FolderOpen, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Folder } from '@/types/folder';

export default function Folders() {
  const folders: Array<Omit<Folder, 'articles'> & { articles: number }> = [
    {
      name: 'My folder',
      _id: '1',
      articles: 4,
      user: { _id: 'user_id' },
    },
  ];

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
      {folders.map((folder) => (
        <Card
          key={folder._id}
          className="flex rounded-md items-center justify-between p-2 shadow-none hover:shadow-md transition-all"
        >
          <Link
            className="flex items-center space-x-1 flex-grow"
            to={`/portal/folder/${folder._id}`}
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

          {/* ADd a dropdowm here */}
          <div>
            <MoreVertical size={18} />
          </div>
        </Card>
      ))}
    </div>
  );
}
