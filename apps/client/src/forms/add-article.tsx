import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PlusIcon } from 'lucide-react';
import instance from '@/lib/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FormEvent, useState } from 'react';
import { authState } from '@/store/auth';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddArticle(props: { onAdd: () => void }) {
  const params = useParams();
  const auth = useRecoilValue(authState);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setURL] = useState<string>('');

  const createNewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await instance.post(
        '/folder/article/add',
        {
          url,
          folderId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success('Bookmark added.');
      props.onAdd();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'default'} className="w-full flex-grow ">
          <PlusIcon /> Bookmark
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <form onSubmit={createNewHandler} className="flex flex-col space-y-2">
          <div>
            <Label htmlFor="article-add-url">URL</Label>
            <Input
              name="url"
              id="article-add-url"
              placeholder="Enter URL..."
              value={url}
              onChange={(e) => setURL(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="w-full flex">
            {/* {state?.error && (
              <p className="text-sm text-red-700">{state?.error}</p>
            )} */}
          </div>
          <Button disabled={loading} type="submit" variant={'outline'}>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
