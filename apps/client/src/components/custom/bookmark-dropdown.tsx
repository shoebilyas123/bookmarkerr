import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import instance from '@/lib/api';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';

export const BookmarkDropdown = (props: {
  url: string;
  name: string;
  folderId: string;
  onDelete: (_url: string) => void;
}) => {
  const { token } = useRecoilValue(authState);
  const [isOpen, setIsOpen] = useState(false);
  const deleteBookmarkHandler = async () => {
    try {
      const { data } = await instance.post(
        '/folder/article/delete',
        {
          url: props.url,
          folderId: props.folderId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsOpen(false);
      props.onDelete(props.url);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="text-neutral-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash2 size={16} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-slate-600">
            Are you sure you want to remove this bookmark?
          </DialogTitle>
          <DialogDescription>{props.name}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteBookmarkHandler}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
