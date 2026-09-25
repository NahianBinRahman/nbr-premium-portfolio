import { NextResponse } from "next/server";
import { FALLBACK_ARTICLES, MEDIUM_FEED_URL, MEDIUM_PROFILE_URL } from "@/utils/articles";
import { Article, MediumFeedResponse } from "@/types/article";

export const revalidate = 3600; // Cache for 1 hour

function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, "—")
    .replace(/&#8211;/g, "–")
    .replace(/\u00a0/g, " ")
    .trim();
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<figcaption[^>]*>.*?<\/figcaption>/gi, "")
    .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, "")
    .replace(/<pre[^>]*>.*?<\/pre>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function parseMediumRss(xmlText: string): Article[] {
  const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g);
  if (!itemMatches || itemMatches.length === 0) return [];

  const articles: Article[] = [];

  for (let i = 0; i < itemMatches.length; i++) {
    const itemXml = itemMatches[i];

    // Title
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const titleRaw = titleMatch ? titleMatch[1] : "Untitled Article";
    const title = cleanText(titleRaw);

    // Link
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    let link = linkMatch ? cleanText(linkMatch[1]) : MEDIUM_PROFILE_URL;
    link = link.split("?")[0]; // remove ?source=rss tracking query parameter

    // Guid
    const guidMatch = itemXml.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
    const guid = guidMatch ? cleanText(guidMatch[1]) : "";
    const id = guid.split("/p/")[1] || guid.split("/").pop() || `article-${i}`;

    // pubDate
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const pubDate = pubDateMatch ? cleanText(pubDateMatch[1]) : new Date().toISOString();
    const formattedDate = formatDate(pubDate);

    // Creator
    const creatorMatch =
      itemXml.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/) ||
      itemXml.match(/<creator>([\s\S]*?)<\/creator>/);
    const creator = creatorMatch ? cleanText(creatorMatch[1]) : "Nahian Bin Rahman";

    // Categories
    const categoryMatches = itemXml.match(/<category>([\s\S]*?)<\/category>/g);
    const categories: string[] = [];
    if (categoryMatches) {
      categoryMatches.forEach((catTag) => {
        const catValue = cleanText(catTag.replace(/<\/?category>/g, ""));
        if (catValue) {
          // Normalize tag string (e.g. artificial-intelligence -> Artificial Intelligence)
          const formattedCat = catValue
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          categories.push(formattedCat);
        }
      });
    }

    // Default categories if none found in RSS
    if (categories.length === 0) {
      if (title.toLowerCase().includes("veo") || title.toLowerCase().includes("video")) {
        categories.push("Generative AI", "VEO 3", "Video AI");
      } else if (title.toLowerCase().includes("django") || title.toLowerCase().includes("hosting")) {
        categories.push("Django", "Python", "Cloud Deployment");
      } else if (title.toLowerCase().includes("htmx")) {
        categories.push("Full-Stack", "Htmx", "Frontend");
      } else {
        categories.push("Artificial Intelligence", "Tech Architecture");
      }
    }

    // Content:encoded
    const contentMatch = itemXml.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
    const content = contentMatch ? contentMatch[1] : "";

    // Extract cover image (ignore tracking pixel with "stat?event=")
    let coverImage: string | null = null;
    const imgMatches = content.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
    for (const match of imgMatches) {
      const src = match[1];
      if (src && !src.includes("stat?event=") && !src.includes("medium.com/_/stat")) {
        coverImage = src;
        break;
      }
    }

    // Extract clean text snippet
    const rawText = stripHtml(content);
    let snippet = rawText.slice(0, 180).trim();
    if (snippet.length >= 170) {
      snippet = snippet.replace(/[\s\p{P}]+$/u, "") + "...";
    }
    if (!snippet) {
      snippet = "Read the complete article and architectural insights on Medium.";
    }

    // Calculate reading time
    const words = rawText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(3, Math.ceil(words / 220));
    const readTime = `${minutes} min read`;

    articles.push({
      id,
      title,
      link,
      guid,
      pubDate,
      formattedDate,
      creator,
      coverImage,
      snippet,
      categories,
      readTime,
      featured: i === 0,
    });
  }

  return articles;
}

export async function GET() {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Medium RSS responded with status: ${res.status}`);
    }

    const xmlText = await res.text();
    const articles = parseMediumRss(xmlText);

    if (articles.length === 0) {
      throw new Error("No articles parsed from RSS feed");
    }

    const responseData: MediumFeedResponse = {
      success: true,
      source: "live",
      updatedAt: new Date().toISOString(),
      profileUrl: MEDIUM_PROFILE_URL,
      author: "Nahian Bin Rahman",
      total: articles.length,
      articles,
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch live Medium RSS, using fallback articles:", error);

    const fallbackResponse: MediumFeedResponse = {
      success: true,
      source: "fallback",
      updatedAt: new Date().toISOString(),
      profileUrl: MEDIUM_PROFILE_URL,
      author: "Nahian Bin Rahman",
      total: FALLBACK_ARTICLES.length,
      articles: FALLBACK_ARTICLES,
    };

    return NextResponse.json(fallbackResponse);
  }
}
