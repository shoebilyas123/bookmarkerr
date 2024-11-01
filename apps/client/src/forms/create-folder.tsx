import { FormEvent, useState } from 'react';

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
import toast from 'react-hot-toast';

export default function CreateFolderForm() {
  const auth = useRecoilValue(authState);
  const [_, setFolders] = useRecoilState(folderState);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const createNewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
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
      setFolders((prev) => [
        ...prev,
        { ...data.folder, articles: data.folder.articles.length },
      ]);
      toast.success('Folder created.');
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data.errors);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open}>
      <PopoverTrigger onClick={() => setOpen(!open)}>
        <Button className="flex-grow w-full my-2">
          <FolderPlus /> New Folder
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          onSubmit={createNewHandler}
          className="space-y-6"
          onChangeCapture={() => setErrors(null)}
        >
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
                {errors?.name &&
                  errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
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
