import { CaseForm } from '@/components/admin/CaseForm';

export default function NewCasePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">Create New Case</h2>
            <CaseForm />
        </div>
    );
}
