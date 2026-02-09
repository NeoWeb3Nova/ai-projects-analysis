import { cookies } from 'next/headers';
import { dictionaries, Locale } from './dictionaries';

export async function getLocaleServer(): Promise<Locale> {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value as Locale;
    return (locale === 'en' || locale === 'zh') ? locale : 'zh';
}

export async function getDictionaryServer() {
    const locale = await getLocaleServer();
    return dictionaries[locale];
}

export async function getTServer() {
    const dictionary = await getDictionaryServer();

    return (key: string): string => {
        const keys = key.split('.');
        let value: any = dictionary;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return value !== undefined ? value : key;
    };
}
