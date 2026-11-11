export const supportedLocales = ['en', 'es'] as const;
export type Locale = (typeof supportedLocales)[number];

export function isLocale(value: string | undefined): value is Locale {
    return supportedLocales.includes(value as Locale);
}

export function detectLocale(acceptLanguage: string | null): Locale {
    const candidates = (acceptLanguage ?? '')
        .split(',')
        .map((item, index) => {
            const [tag, ...params] = item.trim().split(';');
            const q = params.find((param) => param.trim().startsWith('q='));
            const quality = q ? Number(q.trim().slice(2)) : 1;

            return { tag, quality, index };
        })
        .filter((item) => item.tag && item.quality > 0)
        .sort((a, b) => b.quality - a.quality || a.index - b.index);

    for (const { tag } of candidates) {
        try {
            const language = new Intl.Locale(tag).language.toLowerCase();
            if (isLocale(language)) return language;
        } catch {
            // Ignora etiquetas de idioma inválidas.
        }
    }

    return 'en';
}