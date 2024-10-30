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
import React, { FormEvent, useState } from 'react';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await instance.post('/auth/login', {
        email,
        password,
        name,
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={registerHandler}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Welcome to Artica - Let&apos;s create your account
          </CardDescription>
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
              {/* {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
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
              {/* {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
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
              {/* {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))} */}
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
