import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Blog.css";
import reviewsBg from "../assets/CoverPage.jpg";
export default function Blog() {
  // Put your image in: /public/assets/BlogBackground.jpg
  // Then this works in Vite with no importing:

  const parallaxRef = useRef(null);
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const posts = useMemo(
    () => [
      {
        id: "p1",
        title: "Why we built MIS tools for faster solar design",
        date: "Jan 2026",
        tag: "Engineering",
        readTime: "5 min",
        excerpt:
          "A quick look at how we reduce friction from intake to permit-ready drawings.",
      },
      {
        id: "p2",
        title: "Residential vs commercial: what changes in the workflow",
        date: "Jan 2026",
        tag: "Solar",
        readTime: "6 min",
        excerpt:
          "Same goal, different constraints. Here’s what we optimize for in each case.",
      },
      {
        id: "p3",
        title: "Parallax + glass UI in React without heavy libraries",
        date: "Dec 2025",
        tag: "Frontend",
        readTime: "7 min",
        excerpt:
          "A clean pattern for background depth and readable content, built with simple CSS.",
      },
      {
        id: "p4",
        title: "Common permit blockers and how to avoid them",
        date: "Dec 2025",
        tag: "Permitting",
        readTime: "8 min",
        excerpt:
          "A checklist of issues we see often and what to collect upfront to save time.",
      },
    ],
    []
  );

  const tags = useMemo(() => {
    const set = new Set(posts.map((p) => p.tag));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = activeTag === "All" || p.tag === activeTag;
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query);
      return matchesTag && matchesQuery;
    });
  }, [posts, q, activeTag]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = parallaxRef.current;
      if (!el) return;

      const y = window.scrollY || 0;

      // Adjust these to taste:
      const bgTranslate = Math.round(y * 0.22); // background moves slower than page
      const glowTranslate = Math.round(y * 0.08); // a subtle extra layer

      el.style.setProperty("--bgY", `${bgTranslate}px`);
      el.style.setProperty("--glowY", `${glowTranslate}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="blog" ref={parallaxRef}>
      {/* Parallax background (image set in JSX) */}
      <div className="blog-bg-white" />
      <div className="blog-glow" aria-hidden="true" />

      {/* Glass overlay */}
      <div className="blog-glass">
        <header className="blog-hero">
          <p className="blog-kicker">Blog</p>
          <h1 className="blog-title">Notes, updates, and build logs</h1>
          <p className="blog-subtitle">
            Clean write-ups on engineering, solar workflows, and frontend UI.
          </p>

          <div className="blog-controls">
            <div className="blog-searchWrap">
              <input
                className="blog-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts..."
                aria-label="Search posts"
              />
            </div>

            <div className="blog-tags" role="tablist" aria-label="Tags">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`blog-tag ${activeTag === t ? "is-active" : ""}`}
                  onClick={() => setActiveTag(t)}
                  role="tab"
                  aria-selected={activeTag === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="blog-grid" aria-label="Posts">
          {filtered.map((p) => (
            <article className="blog-card" key={p.id}>
              <div className="blog-cardTop">
                <span className="blog-pill">{p.tag}</span>
                <span className="blog-meta">
                  {p.date} • {p.readTime}
                </span>
              </div>

              <h2 className="blog-cardTitle">{p.title}</h2>
              <p className="blog-cardExcerpt">{p.excerpt}</p>

              <div className="blog-cardBottom">
                <button type="button" className="blog-readBtn">
                  Read →
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="blog-empty">
              <h3>No posts found</h3>
              <p>Try a different search or tag.</p>
            </div>
          )}
        </section>

        <footer className="blog-footer">
          <div className="blog-footerGlass">
            <p className="blog-footerText">
              Want a topic covered? Add it to your roadmap and post it here.
            </p>
            <button type="button" className="blog-footerBtn">
              Suggest a post
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
