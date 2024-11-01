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
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  if (auth.token) {
    return <Navigate to="/portal" />;
  }

  useEffect(() => {
    if (auth.token) {
      navigate('/portal');
    }
  }, [auth]);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await instance.post('/auth/login', {
        email,
        password,
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
    } catch (err) {
      console.log(err);
      toast.error((err as any).response.data.message);
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Let&apos;s log you in!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <p className="text-sm mb-4">
            Don&apos;t have an account?{' '}
            <a
              href="/auth/register"
              className="font-bold hover:text-slate-600 hover:underline"
            >
              Register Here!
            </a>
          </p>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
