import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { allPosts } from "@/data/posts";
import { cityBySlug, cityPages } from "@/data/cities";
import NotFound from "@/pages/NotFound";

const CityLandingPage = () => {
  const { citySlug = "" } = useParams<{ citySlug: string }>();
  const city = cityBySlug(citySlug);

  useEffect(() => {
    if (!city) return;

    const pageUrl = `https://blog.hyvefreelance.com/${city.slug}`;
    document.title = city.metaTitle;

    const setMeta = (selector: string, key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        const attr = selector.includes('property="') ? "property" : "name";
        const name = selector.match(new RegExp(`${attr}="([^"]+)"`))?.[1];
        if (name) element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute(key, value);
    };

    setMeta('meta[name="description"]', "content", city.metaDescription);
    setMeta('meta[property="og:title"]', "content", city.metaTitle);
    setMeta('meta[property="og:description"]', "content", city.metaDescription);
    setMeta('meta[property="og:url"]', "content", pageUrl);
    setMeta('meta[name="twitter:card"]', "content", "summary");
    setMeta('meta[name="twitter:title"]', "content", city.metaTitle);
    setMeta('meta[name="twitter:description"]', "content", city.metaDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };
    let script = document.getElementById("city-faq-schema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "city-faq-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => { script?.remove(); };
  }, [city]);

  if (!city) return <NotFound />;

  const relatedPosts = city.articleSlugs
    .map((slug) => allPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof allPosts)[number] => Boolean(post));

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="text-primary hover:underline">HYVE Blog</Link>
        <span className="mx-2">/</span><span aria-current="page">{city.city}</span>
      </nav>

      <header className="max-w-4xl border-b border-border pb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          Freelance hiring guide · {city.city}
        </p>
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">{city.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{city.intro[0]}</p>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{city.intro[1]}</p>
        <a href="https://app.hyvefreelance.com/auth/login"
          className="mt-7 inline-flex items-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">
          Explore talent on HYVE
        </a>
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="min-w-0">
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold">Freelance hiring in {city.city}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{city.localContext}</p>
          </section>
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold">What to hire for in {city.city}</h2>
            <ul className="mt-4 space-y-3">
              {city.hiringFocus.map((item) => <li key={item} className="border-l-2 border-primary pl-4 leading-7">{item}</li>)}
            </ul>
          </section>
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold">{city.adviceTitle}</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-muted-foreground">
              {city.advice.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-bold">Frequently asked questions</h2>
            {city.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-border py-5">
                <h3 className="font-heading text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </section>
          {relatedPosts.length > 0 && (
            <section className="border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold">More HYVE hiring guides</h2>
              <ul className="mt-4 space-y-3">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="font-medium text-primary underline underline-offset-4">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="font-heading text-2xl font-bold">Looking for freelance talent in {city.city}?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Share your project requirements with HYVE and explore freelance professionals and project teams for your business.
            </p>
            <a href="https://app.hyvefreelance.com/auth/login"
              className="mt-5 inline-flex rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground">
              Explore talent on HYVE
            </a>
          </section>
        </article>

        <aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="font-heading text-lg font-bold">Explore cities</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
            {cityPages.map((item) => (
              <li key={item.slug}>
                <Link to={`/${item.slug}`} aria-current={item.slug === city.slug ? "page" : undefined}
                  className="text-muted-foreground hover:text-primary">{item.city}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default CityLandingPage;
