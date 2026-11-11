import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import { isLocale, type Locale } from '@/i18n/locale';

function getCookieLocale(): Locale {
    if (typeof document === 'undefined') {
        const currentLocale = dayjs.locale();
        return isLocale(currentLocale) ? currentLocale : 'en';
    }

    const savedLocale = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith('locale='))
        ?.slice('locale='.length);

    if (!savedLocale) return 'en';

    try {
        const locale = decodeURIComponent(savedLocale);
        return isLocale(locale) ? locale : 'en';
    } catch {
        return 'en';
    }
}

const localizedDayjs = new Proxy(dayjs, {
    apply(target, thisArg, args) {
        return Reflect.apply(target, thisArg, args).locale(getCookieLocale());
    },
});

export default localizedDayjs;
