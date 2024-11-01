import Logo from '@/components/custom/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import instance from '@/lib/api';
import { authState } from '@/store/auth';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  if (auth.token) {
    return <Navigate to="/portal" />;
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/portal');
    }
  }, [auth]);

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await instance.post('/auth/register', {
        email,
        password,
        name,
      });

      const authItem = {
        user: {
          _id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          createdAt: data.user.createdAt,
        },
        token: data.token,
      };
      setAuth(authItem);

      localStorage.setItem('auth', JSON.stringify(authItem));
      navigate('/portal');
    } catch (err: any) {
      setAuth({ user: null, token: null });
      console.log(err);
      setErrors(err.response.data.errors);
      toast.error((err as any).response.data.message);
    }
  };

  return (
    <form onSubmit={registerHandler} onChange={() => setErrors(null)}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between space-x-2 mb-3">
            <div className="flex items-center">
              <Logo />
              <span className="text-slate-800">BookMarkerr App</span>
            </div>
            <sub className="mb-2 text-slate-600">Beta 0.0.1</sub>
          </CardTitle>
          <CardDescription>Let&apos;s create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="user-name">Full Name</Label>
            <Input
              name="name"
              id="user-name"
              type="default"
              placeholder="Enter your full name..."
              aria-describedby="name-error"
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
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input
              name="email"
              id="user-email"
              type="email"
              placeholder="Enter your email..."
              aria-describedby="email-error"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div id="email-error" aria-live="polite" aria-atomic="true">
              {errors?.email &&
                errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <Label htmlFor="user-pass">Password</Label>
            <Input
              name="password"
              id="user-pass"
              type="password"
              placeholder="Enter new password..."
              aria-describedby="pass-error"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div id="pass-error" aria-live="polite" aria-atomic="true">
              {errors?.password &&
                errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <p className="text-sm mb-4">
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="font-bold hover:text-slate-600 hover:underline"
            >
              Login
            </a>
          </p>
          <Button className="w-full" type="submit">
            Register
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
