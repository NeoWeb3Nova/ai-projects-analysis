import { CasesClient } from './CasesClient';
import { getAllCases, getCategories, getMonetizationTypes } from '@/lib/content';

export default function CasesPage() {
    const allCases = getAllCases();
    const categories = getCategories();
    const monetizationTypes = getMonetizationTypes();

    return (
        <CasesClient
            initialCases={allCases}
            categories={categories}
            monetizationTypes={monetizationTypes}
        />
    );
}
