import React, { FormEvent, useState } from 'react';

import { FolderPlus } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, folderState } from '@/store/auth';
import instance from '@/lib/api';

export default function CreateFolderForm() {
  const auth = useRecoilValue(authState);
  const [_, setFolders] = useRecoilState(folderState);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const createNewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instance.post(
        '/folder/create',
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setFolders((prev) => [...prev, data.folder]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="flex-grow w-full my-2">
          <FolderPlus /> New Folder
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={createNewHandler} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="folder-name">Name</Label>
              <Input
                name="name"
                id="folder-name"
                aria-describedby="name-error"
                placeholder="Enter your folder name..."
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {/* {state?.errors?.name &&
                  state?.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))} */}
              </div>
            </div>
          </div>

          <Button disabled={loading} type="submit">
            Create
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
