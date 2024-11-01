import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
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

const FolderDropdown = (props: {
  name: string;
  folderId: string;
  onDelete: (id: string) => void;
}) => {
  const { token } = useRecoilValue(authState);
  const [modeOpen, setModeOpen] = useState<'delete' | 'edit' | null>(null);

  const deleteFolderHandler = async () => {
    try {
      const { data } = await instance.post(
        '/folder/delete',
        {
          folderId: props.folderId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModeOpen(null);
      props.onDelete(props.folderId);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={modeOpen !== null}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="text-neutral-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem onClick={() => setModeOpen('delete')}>
            <Trash2 size={16} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {modeOpen === 'delete' ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-slate-600">
              Are you sure you want to remove this folder?
            </DialogTitle>
            <DialogDescription>{props.name}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={deleteFolderHandler}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default FolderDropdown;
