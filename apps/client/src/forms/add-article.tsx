import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PlusIcon } from 'lucide-react';

export default function AddArticle() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'default'} className="w-full flex-grow ">
          <PlusIcon /> New Article
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <form className="flex flex-col space-y-2">
          <div>
            <Label htmlFor="article-add-url">URL</Label>
            <Input name="url" id="article-add-url" placeholder="Enter URL..." />
          </div>
          <div className="w-full flex">
            {/* {state?.error && (
              <p className="text-sm text-red-700">{state?.error}</p>
            )} */}
          </div>
          <Button type="submit" variant={'outline'}>
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
