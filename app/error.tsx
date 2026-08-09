"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type ErrorPageProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section padding="lg" aria-labelledby="error-heading">
      <Container size="narrow" className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-danger">
          Error
        </p>
        <h1
          id="error-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight text-ink"
        >
          Something went wrong
        </h1>
        <p className="mt-4 text-base text-ink-muted">
          An unexpected error occurred while loading this page.
        </p>
        <div className="mt-8 flex justify-center">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        </div>
        {error.digest ? (
          <p className="mt-6 text-xs text-ink-subtle">Reference: {error.digest}</p>
        ) : null}
      </Container>
    </Section>
  );
}
