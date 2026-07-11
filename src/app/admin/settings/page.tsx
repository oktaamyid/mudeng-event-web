import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your account profile details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input id="name" defaultValue="Admin User" disabled />
                        <p className="text-muted-foreground text-[0.8rem]">
                            Your name is managed by your authentication provider
                            (Clerk).
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            defaultValue="admin@mudeng.oktaa.my.id"
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                        Manage your dashboard preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-muted-foreground text-sm">
                                Receive emails when someone registers for an
                                event.
                            </p>
                        </div>
                        <Button variant="outline" disabled>
                            Coming Soon
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
