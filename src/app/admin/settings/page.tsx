import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEmailDiagnostics } from "@/lib/actions/email";
import { EmailSettingsCard } from "./EmailSettingsCard";

export default async function AdminSettingsPage() {
    const diagnosticsRes = await getEmailDiagnostics();
    const diagnostics = diagnosticsRes.success
        ? diagnosticsRes.data
        : {
              config: {
                  hasApiKey: false,
                  hasFromEmail: false,
                  fromEmail: "",
                  replyTo: "",
              },
              settings: {
                  sendOnPending: false,
                  notifyAdminOnRegister: false,
                  adminNotifyEmail: "",
              },
              quota: { used: 0, limit: 100, remaining: 100 },
          };
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
                            Your profile information is managed by the system administrator.
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

            <EmailSettingsCard
                initialConfig={diagnostics.config}
                initialSettings={diagnostics.settings}
                initialQuota={diagnostics.quota}
            />
        </div>
    );
}
