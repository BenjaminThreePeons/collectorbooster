import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { POSTS_QUERY } from "../../sanity/lib/queries";

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  const mainPost = posts?.[0];
  const otherPosts = posts?.slice(1) || [];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f10",
        color: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: "3rem" }}>
          <p
            style={{
              color: "#c9a34a",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.8rem",
              marginBottom: "0.75rem",
            }}
          >
            Czech MTG magazín
          </p>

          <h1
  style={{
    fontSize: "3.2rem",
    lineHeight: 1,
    margin: 0,
    fontWeight: "800",
  }}
>
  Collector Booster TEST
</h1>
        </header>

        {mainPost ? (
          <section
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "1.6fr 1fr",
              marginBottom: "3rem",
            }}
          >
            <article
              style={{
                background:
                  "linear-gradient(135deg, #18181b 0%, #111827 100%)",
                border: "1px solid #2a2a2e",
                borderRadius: "20px",
                padding: "2rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
              }}
            >
              <p
                style={{
                  color: "#c9a34a",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                Hlavní článek
              </p>

              <h2
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1.1,
                  marginTop: 0,
                  marginBottom: "1rem",
                }}
              >
                <Link
                  href={`/posts/${mainPost.slug.current}`}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  {mainPost.title}
                </Link>
              </h2>

              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {mainPost.publishedAt
                  ? new Date(mainPost.publishedAt).toLocaleDateString("cs-CZ")
                  : ""}
                {mainPost.author ? ` · ${mainPost.author}` : ""}
              </p>

              <Link
                href={`/posts/${mainPost.slug.current}`}
                style={{
                  display: "inline-block",
                  backgroundColor: "#c9a34a",
                  color: "#111",
                  textDecoration: "none",
                  fontWeight: "700",
                  padding: "0.9rem 1.2rem",
                  borderRadius: "999px",
                }}
              >
                Přečíst článek
              </Link>
            </article>

            <aside
              style={{
                backgroundColor: "#141416",
                border: "1px solid #2a2a2e",
                borderRadius: "20px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "1.25rem",
                  fontSize: "1.2rem",
                }}
              >
                Další články
              </h3>

              <div style={{ display: "grid", gap: "1rem" }}>
                {otherPosts.length > 0 ? (
                  otherPosts.map((post) => (
                    <article
                      key={post._id}
                      style={{
                        borderTop: "1px solid #2a2a2e",
                        paddingTop: "1rem",
                      }}
                    >
                      <h4
                        style={{
                          marginTop: 0,
                          marginBottom: "0.35rem",
                          fontSize: "1.05rem",
                          lineHeight: 1.3,
                        }}
                      >
                        <Link
                          href={`/posts/${post.slug.current}`}
                          style={{
                            color: "#f5f5f5",
                            textDecoration: "none",
                          }}
                        >
                          {post.title}
                        </Link>
                      </h4>

                      <p
                        style={{
                          margin: 0,
                          color: "#a1a1aa",
                          fontSize: "0.95rem",
                        }}
                      >
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("cs-CZ")
                          : ""}
                      </p>
                    </article>
                  ))
                ) : (
                  <p style={{ color: "#a1a1aa", margin: 0 }}>
                    Zatím tu není další článek.
                  </p>
                )}
              </div>
            </aside>
          </section>
        ) : (
          <p>Zatím tu není žádný článek.</p>
        )}
      </div>
    </main>
  );
}