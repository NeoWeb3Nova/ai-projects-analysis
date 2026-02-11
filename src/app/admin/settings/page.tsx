import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your admin preferences and site configuration.
                </p>
            </div>
            <Separator />
            <div className="space-y-4 max-w-xl">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="site_name">Site Name</Label>
                    <Input type="text" id="site_name" placeholder="AI Projects Analysis" disabled />
                    <p className="text-[0.8rem] text-muted-foreground">
                        Configuration stored in environment variables.
                    </p>
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="admin_email">Admin Email</Label>
                    <Input type="email" id="admin_email" placeholder="neo.web3.nova@gmail.com" disabled />
                    <p className="text-[0.8rem] text-muted-foreground">
                        Managed via Supabase Auth and Environment Variables.
                    </p>
                </div>

                <div className="pt-4">
                    <Button disabled>Save Changes (Coming Soon)</Button>
                </div>
            </div>
        </div>
    );
}
