import { headers, cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { detectLocale, isLocale } from './locale';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('locale')?.value;

  const locale = isLocale(savedLocale)
    ? savedLocale
    : detectLocale((await headers()).get('accept-language'));

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});