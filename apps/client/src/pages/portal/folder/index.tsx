import React from 'react';

import AddArticle from '@/forms/add-article';
import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import SearchBar from '@/forms/search';

export default function FolderData() {
  const searchParams = { query: '' };
  const articles = [
    {
      _id: 1,
      title: 'New Title',
      url: 'http://google.com',
    },
    {
      _id: 2,

      title: 'New Title',
      url: 'http://google.com',
    },
    {
      _id: 3,

      title: 'New Title',
      url: 'http://google.com',
    },
    {
      _id: 4,

      title: 'New Title',
      url: 'http://google.com',
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-1 mb-4">
        <SearchBar />
        <AddArticle />
      </div>

      <div className="grid gap-1 grid-cols-1">
        {articles
          .filter(
            (art) =>
              art.title.includes(searchParams.query || '') ||
              art.url.includes(searchParams.query || '')
          )
          .map((article) => (
            <div
              key={article.url}
              className="flex items-center w-full justify-between bg-white hover:bg-neutral-100 rounded-md border p-4"
            >
              <a
                target="_blank"
                href={article.url}
                className="text-md text-neutral-800 font-medium hover:text-sky-600"
              >
                {article.title}
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="text-neutral-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Edit className="text-neutral-500" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className="text-neutral-500" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
      </div>
    </div>
  );
}
