import { client } from "../../../sanity/lib/client";
import { POST_QUERY } from "../../../sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return (
      <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
        <h1>Článek nebyl nalezen</h1>
        <p>Tento článek neexistuje nebo byl odstraněn.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui", maxWidth: "720px", margin: "0 auto" }}>
      <h1>{post.title}</h1>
      <p style={{ color: "#888", marginTop: "0.5rem" }}>
        {post.author && <span>Autor: {post.author} · </span>}
        {post.publishedAt && (
          <span>{new Date(post.publishedAt).toLocaleDateString("cs-CZ")}</span>
        )}
      </p>
      {post.categories && post.categories.length > 0 && (
        <p style={{ marginTop: "0.5rem" }}>
          Kategorie: {post.categories.join(", ")}
        </p>
      )}
      <hr style={{ margin: "1.5rem 0" }} />
      {post.body && <PortableText value={post.body} />}
    </main>
  );
}