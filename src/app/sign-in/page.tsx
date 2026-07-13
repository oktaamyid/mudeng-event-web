"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
    const [state, action, isPending] = useActionState(login, undefined);

    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
                <Card className="shadow-sm">
                    <CardHeader className="space-y-3 pb-6 text-center">
                        <div className="bg-primary/10 mx-auto flex aspect-square size-12 items-center justify-center rounded-xl">
                            <Image
                                src="https://cdn.mudeng.oktaa.my.id/logo/logo-monogram.svg"
                                alt="Mudeng Logo"
                                width={24}
                                height={24}
                                className="size-6"
                            />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                Welcome back
                            </CardTitle>
                            <CardDescription>
                                Enter your credentials to access the admin panel
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form action={action} className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            {state?.error && (
                                <p className="text-sm font-medium text-red-500">
                                    {state.error}
                                </p>
                            )}
                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                                disabled={isPending}
                            >
                                {isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isPending ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
