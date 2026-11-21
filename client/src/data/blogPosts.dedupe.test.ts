import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "./blogPosts";

describe("blog posts", () => {
  it("publishes each slug once", () => {
    const slugs = BLOG_POSTS.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
