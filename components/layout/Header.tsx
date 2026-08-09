import Image from "next/image";
import Link from "next/link";

import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { AppLocale } from "@/config/i18n";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";
import { getFooterCopy, navLabel } from "@/features/i18n/nav-copy";
import { localizePath } from "@/lib/i18n";

type HeaderProps = {
  readonly locale: AppLocale;
};

const LOGO_SRC = "/logo/gglbet-logo.gif";
const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 50;

export function Header({ locale }: HeaderProps) {
  const auth = getFooterCopy(locale).auth;
  const loginLabel = auth[0]?.label ?? navLabel("Log in", locale);
  const registerLabel = auth[1]?.label ?? navLabel("Register", locale);

  return (
    <header className="sticky top-0 z-header border-b border-border-brand/70 bg-surface-muted">
      <Container
        size="wide"
        className="flex h-header items-center justify-between gap-2 sm:gap-3 lg:gap-4"
      >
        <div className="flex min-w-0 items-center gap-6 xl:gap-8">
          <Link
            href={localizePath(ROUTES.home, locale)}
            className="relative shrink-0"
            aria-label={SITE_NAME}
          >
            <span className="block h-10 w-[7.25rem] lg:h-[50px] lg:w-[150px]">
              <Image
                src={LOGO_SRC}
                alt={SITE_NAME}
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                priority
                unoptimized
                className="h-full w-full object-contain object-left"
              />
            </span>
          </Link>
          <MegaMenu locale={locale} />
        </div>

        {/* Desktop auth — unchanged layout from lg up */}
        <div className="hidden items-center gap-2 lg:flex lg:gap-3">
          <LanguageSwitch locale={locale} />
          <Button
            href={localizePath(ROUTES.login, locale)}
            variant="outline"
            size="sm"
          >
            {loginLabel}
          </Button>
          <Button href={localizePath(ROUTES.register, locale)} size="sm">
            {registerLabel}
          </Button>
        </div>

        {/* Mobile / tablet conversion bar: Log in · Register · Menu */}
        <div className="flex min-w-0 shrink-0 items-center gap-1 min-[390px]:gap-1.5 sm:gap-2 lg:hidden">
          <Button
            href={localizePath(ROUTES.login, locale)}
            variant="outline"
            size="sm"
            className="h-9 shrink-0 px-2.5 text-xs min-[390px]:px-3 min-[390px]:text-sm sm:h-control-sm"
          >
            {loginLabel}
          </Button>
          <Button
            href={localizePath(ROUTES.register, locale)}
            variant="primary"
            size="sm"
            className="h-9 shrink-0 px-2.5 text-xs min-[390px]:px-3 min-[390px]:text-sm sm:h-control-sm"
          >
            {registerLabel}
          </Button>
          <MobileNavigation locale={locale} />
        </div>
      </Container>
    </header>
  );
}
