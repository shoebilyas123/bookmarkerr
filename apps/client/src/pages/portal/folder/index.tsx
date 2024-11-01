import React, { useEffect, useState } from 'react';

import AddArticle from '@/forms/add-article';
import SearchBar from '@/forms/search';
import { useRecoilValue } from 'recoil';
import instance from '@/lib/api';
import { authState } from '@/store/auth';
import { Article, Folder } from '@/types/folder';
import { useParams } from 'react-router-dom';
import { AppBreadcrumb } from '@/components/custom/breadcrumb';
import { BookmarkDropdown } from '@/components/custom/bookmark-dropdown';

export default function FolderData() {
  const auth = useRecoilValue(authState);
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [folderData, setFolderData] = useState<Folder | null>(null);

  const getFolderData = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/folder/${params.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setFolderData(data.folder);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFolderData();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-1 mb-4">
        <SearchBar />
        <AddArticle onAdd={getFolderData} />
      </div>
      <AppBreadcrumb
        routes={[
          { name: 'Portal', href: '/portal', endpoint: false },
          ...(folderData
            ? [
                {
                  name: folderData?.name,
                  href: folderData?._id,
                  endpoint: true,
                },
              ]
            : []),
        ]}
      />
      {loading ? (
        <>Loading...</>
      ) : !folderData || folderData?.articles?.length < 1 ? (
        <div className="w-[100%] h-[100%] flex items-center justify-center ">
          <div className="mt-12 flex flex-col items-center space-y-3">
            <p className="text-2xl text-neutral-500 font-medium">
              You have not bookmarked any pages!
            </p>
            <p className="text-xl text-neutral-500 ">
              Create on "+ Bookmark" button to bookmark a page
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-1 grid-cols-1">
          {folderData.articles.map((article) => (
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
              <BookmarkDropdown
                url={article.url}
                name={article.title}
                folderId={folderData._id}
                onDelete={(e) => {
                  setFolderData((prev: any) => ({
                    ...prev,
                    articles: prev?.articles.filter(
                      (art: Article) => art.url !== e
                    ),
                  }));
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
