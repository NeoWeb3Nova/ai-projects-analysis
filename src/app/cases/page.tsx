import { CasesClient } from './CasesClient';
import { getAllCases, getCategories, getMonetizationTypes } from '@/lib/content';
import { getLocaleServer } from '@/lib/i18n-server';

export default async function CasesPage() {
    const locale = await getLocaleServer();
    const allCases = getAllCases(locale);
    const categories = getCategories(locale);
    const monetizationTypes = getMonetizationTypes(locale);

    return (
        <CasesClient
            initialCases={allCases}
            categories={categories}
            monetizationTypes={monetizationTypes}
        />
    );
}
