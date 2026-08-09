import { SeoContainer } from "@/components/seo/SeoContainer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AboutSection } from "@/features/home/components/AboutSection";
import { CardGridSection } from "@/features/home/components/CardGridSection";
import { FaqSection } from "@/features/home/components/FaqSection";
import { FeaturedGamesSection } from "@/features/home/components/FeaturedGamesSection";
import { FinalCtaSection } from "@/features/home/components/FinalCtaSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { HomeMediaFigure } from "@/features/home/components/HomeMediaFigure";
import { HomeProvidersSection } from "@/features/home/components/HomeProvidersSection";
import {
  HomeNewsTeaser,
  HomePromotionCard,
} from "@/features/home/components/HomeOfferCards";
import { PointsSection } from "@/features/home/components/PointsSection";
import { SectionIntro } from "@/features/home/components/SectionIntro";
import { TrustSecuritySection } from "@/features/home/components/TrustSecuritySection";
import { WinnersSection } from "@/features/home/components/WinnersSection";
import { HOME_V2_MEDIA } from "@/features/home/home-v2-media";
import type { HomeUiCopy } from "@/features/home/home-ui-copy";
import type { AppLocale } from "@/config/i18n";
import { ZH_STRING_PLACEHOLDER } from "@/config/i18n";
import { createHomeBreadcrumb } from "@/lib/seo/breadcrumb";
import {
  buildFaqPageJsonLd,
  buildOrganizationJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo/json-ld";
import type { HomePageContent } from "@/types/home";
import type { NewsArticle } from "@/types/news";
import type { Promotion } from "@/types/promotion";

type HomePageProps = {
  readonly content: HomePageContent;
  readonly featuredPromotions: readonly Promotion[];
  readonly latestNews: readonly NewsArticle[];
  readonly locale: AppLocale;
  readonly uiCopy: HomeUiCopy;
};

function isRenderableTitle(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return !trimmed.includes(ZH_STRING_PLACEHOLDER);
}

export function HomePage({
  content,
  featuredPromotions,
  latestNews,
  locale,
  uiCopy,
}: HomePageProps) {
  const breadcrumb = [createHomeBreadcrumb()];
  const promotions = featuredPromotions.filter((item) =>
    isRenderableTitle(item.title),
  );
  const news = latestNews.filter((item) => isRenderableTitle(item.title));

  return (
    <>
      <SeoContainer
        jsonLd={[
          buildOrganizationJsonLd(),
          buildWebPageJsonLd({
            name: content.seo.title,
            description: content.seo.description,
            path: content.seo.path,
          }),
          buildFaqPageJsonLd(content.faq.items),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: content.trendingGames.heading,
            itemListElement: content.trendingGames.items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: item.href,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: content.featuredPromotions.heading,
            itemListElement: promotions.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: item.canonicalPath,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: content.latestNews.heading,
            itemListElement: news.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: item.canonicalPath,
            })),
          },
        ]}
      />

      {/* 1. Sticky Header (SiteShell) → 2. Featured Games first */}
      <FeaturedGamesSection data={content.trendingGames} />

      {/* 3. Hero — unchanged content/art/CTA; below Featured Games */}
      <HeroSection data={content.hero} priority={false} />

      <Container size="wide" className="pt-3 sm:pt-4">
        <Breadcrumbs items={breadcrumb} className="py-2" />
      </Container>

      {/* 4. Why Choose GGLBET */}
      <PointsSection
        data={content.whyChoose}
        columns="4"
        className="bg-surface"
        fallbackSrc={HOME_V2_MEDIA.whyChoose}
      />

      {/* 5. Game Categories */}
      <CardGridSection
        data={content.gameCategories}
        columns="5"
        categoryCards
        className="bg-surface"
        fallbackSrc={HOME_V2_MEDIA.categories}
      />

      {/* 6. Featured Providers */}
      <HomeProvidersSection
        data={content.popularProviders}
        copy={uiCopy}
        locale={locale}
      />

      {/* 7. Promotions */}
      <Section
        id={content.featuredPromotions.id}
        padding="lg"
        containerSize="wide"
        aria-labelledby={`${content.featuredPromotions.id}-heading`}
        className="home-v2-section bg-surface"
      >
        <div className="home-v2-section__bg" aria-hidden />
        <div className="home-v2-split relative z-[1]">
          <SectionIntro
            headingId={`${content.featuredPromotions.id}-heading`}
            eyebrow={content.featuredPromotions.eyebrow}
            heading={content.featuredPromotions.heading}
            subheading={content.featuredPromotions.subheading}
            body={content.featuredPromotions.body}
            ctas={content.featuredPromotions.ctas}
          />
          <HomeMediaFigure
            src={content.featuredPromotions.media.src}
            alt={content.featuredPromotions.media.label}
            aspect="wide"
            fallbackSrc={HOME_V2_MEDIA.promotions}
            sizes="(max-width: 1024px) 42vw, 440px"
            className="home-v2-media--premium"
          />
        </div>
        {promotions.length > 0 ? (
          <ul className="relative z-[1] mt-8 home-v2-rail home-v2-rail--3 sm:mt-10">
            {promotions.map((promotion) => (
              <li key={promotion.id}>
                <HomePromotionCard promotion={promotion} />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <WinnersSection data={content.latestWinners} />

      {/* 8. Guides */}
      <CardGridSection
        data={content.casinoGuides}
        columns="3"
        className="bg-surface"
        fallbackSrc={HOME_V2_MEDIA.guides}
      />

      {/* 9. News */}
      <Section
        id={content.latestNews.id}
        padding="lg"
        containerSize="wide"
        aria-labelledby={`${content.latestNews.id}-heading`}
        className="home-v2-section"
      >
        <div className="home-v2-section__bg" aria-hidden />
        <div className="home-v2-split relative z-[1]">
          <SectionIntro
            headingId={`${content.latestNews.id}-heading`}
            eyebrow={content.latestNews.eyebrow}
            heading={content.latestNews.heading}
            subheading={content.latestNews.subheading}
            body={content.latestNews.body}
            ctas={content.latestNews.ctas}
          />
          <HomeMediaFigure
            src={content.latestNews.media.src}
            alt={content.latestNews.media.label}
            aspect="wide"
            fallbackSrc={HOME_V2_MEDIA.news}
            sizes="(max-width: 1024px) 42vw, 440px"
            className="home-v2-media--premium"
          />
        </div>
        {news.length > 0 ? (
          <ul className="relative z-[1] mt-8 home-v2-rail home-v2-rail--3 sm:mt-10">
            {news.map((article) => (
              <li key={article.id}>
                <HomeNewsTeaser article={article} />
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {/* 10. Trust */}
      <TrustSecuritySection data={content.trustSecurity} />

      <PointsSection
        data={{
          ...content.paymentMethods,
          points: content.paymentMethods.methods,
        }}
        columns="2"
        showPointMedia
        className="bg-surface"
        fallbackSrc={HOME_V2_MEDIA.payments}
      />

      <PointsSection
        data={content.responsibleGaming}
        columns="3"
        mediaFirst
        fallbackSrc={HOME_V2_MEDIA.responsible}
      />

      <AboutSection data={content.about} className="bg-surface" />

      {/* 11. FAQ */}
      <FaqSection data={content.faq} />

      {/* 12. Final CTA → 13. Footer (SiteShell) */}
      <FinalCtaSection data={content.finalCta} />
    </>
  );
}
