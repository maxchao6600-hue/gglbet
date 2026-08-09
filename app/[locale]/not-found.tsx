import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/constants/routes";
import { SITE_NAME } from "@/constants/site";

export default function NotFound() {
  return (
    <Section padding="lg" aria-labelledby="not-found-heading">
      <Container size="narrow" className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          404
        </p>
        <h1
          id="not-found-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight text-ink"
        >
          Page not found
        </h1>
        <p className="mt-4 text-base text-ink-muted">
          The page you requested does not exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href={ROUTES.home}>Back to {SITE_NAME}</Button>
        </div>
        <p className="mt-6 text-sm text-ink-subtle">
          Looking for help?{" "}
          <Link
            href={ROUTES.contact}
            className="font-medium text-brand hover:text-primary-hover"
          >
            Contact us
          </Link>
        </p>
      </Container>
    </Section>
  );
}
