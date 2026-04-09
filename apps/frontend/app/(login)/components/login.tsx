"use client";
import {
  type userLoginSchema,
  zodUserLogin,
} from "@fastify-e-commerce/schemas";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { signInFunction } from "@/app/lib/requests/login";
import { DefaultButton } from "@/app/lib/components/default-button";
import { InputField } from "@/app/lib/components/input-field";
import { loginAction } from "@/app/actions/auth";
import { useState } from "react";
export function Login() {
  const [loginError, setLoginError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginSchema>({
    resolver: zodResolver(zodUserLogin),
  });

  function onSubmit(data: userLoginSchema) {
    signInFunction(data).then((response) => {
      console.log(response);
      loginAction(data).then((response) => {
        if (response.error) {
          setLoginError(response.error);
        }
      });
    });
  }

  function onFocusRemoveError(){
    setLoginError(undefined)
  }

  return (
    <div className="space-y-1">
      {loginError && (
        <div className="p-6 bg-red-300 rounded-lg flex items-center justify-center">
          <p className="text-red-500 font-semibold text-lg">{loginError}</p>
        </div>
      )}
      <div className="md:rounded-2xl p-12 flex flex-col items-center gap-10 w-full h-dvh md:h-auto max-w-md bg-zinc-900/50 border border-zinc-800 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back!
          </h1>
          <p className="font-normal text-zinc-400 text-base">
            Please provide your credentials to access your account.
          </p>
        </div>

        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            onFocus={onFocusRemoveError}
            errorMessage={errors.email?.message}
            label="Email address"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="h-12 bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 focus:ring-indigo-500"
          />

          <div className="flex flex-col gap-2">
            <InputField
            onFocus={onFocusRemoveError}
            errorMessage={errors.password?.message}
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="h-12 bg-zinc-950 border-zinc-700 text-white focus:ring-indigo-500"
            />
            <Link
              href="#"
              className="text-sm text-indigo-400 hover:text-indigo-300 self-end transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <DefaultButton type="submit" label="Sign In" />
        </form>

        <p className="text-sm text-zinc-500">
          {`Don't have an account?`}
          <Link
            href="#"
            className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
