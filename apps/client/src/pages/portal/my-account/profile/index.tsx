import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import instance from '@/lib/api';
import { authState } from '@/store/auth';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';

export default function MyProfile() {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState<boolean>(false);

  const editProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData(e?.target as HTMLFormElement);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
      };

      const { data } = await instance.post(
        '/auth/profile/edit',
        { ...payload },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      const editedAuth = { token: auth.token, user: data.user };
      setAuth(editedAuth);
      toast.success('Account info. updated.');
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={editProfileHandler} className="flex flex-col items-center">
      <h1 className="text-xl font-medium text-gray-600 mt-6">MyProfile</h1>

      {/* My Image */}
      {/* <div className="bg-white w-full h-fit flex items-center justify-between border p-6 rounded-md">
        {auth.user?.avatar ? (
          <img src={auth.user.avatar} width={75} height={75} />
        ) : (
          <div className="bg-green-600 w-[75px] h-[75px] flex items-center justify-center rounded">
            <p className="text-6xl text-slate-100 font-medium">
              {auth.user?.name.at(0)?.toUpperCase()}
            </p>
          </div>
        )}

        <div>
          <Label htmlFor="picture">Choose Avatar</Label>
          <Input id="picture" type="file" name="avatar" className="w-fit" />
        </div>
      </div> */}

      {/* Personal Information */}
      <div className="bg-white mt-6 border rounded-md flex flex-col w-full p-4 space-y-4">
        <h1 className="text-lg font-medium text-gray-600 ">MyProfile</h1>

        <div>
          <Label htmlFor={'edit-acc-email'} className="text-gray-500">
            Name
          </Label>
          <Input
            type="name"
            name="name"
            placeholder={'Edit your name...'}
            defaultValue={auth.user?.name}
            className="w-[250px]"
          />
        </div>
        <div>
          <Label htmlFor={'edit-acc-email'} className="text-gray-500">
            E-mail
          </Label>
          <Input
            name="email"
            type="email"
            placeholder={'Edit your email...'}
            defaultValue={auth.user?.email}
            className="w-[250px]"
          />
        </div>
      </div>
      <div className="w-full mt-6">
        <Button disabled={loading} type={'submit'} variant={'default'}>
          Save
        </Button>
      </div>
    </form>
  );
}
