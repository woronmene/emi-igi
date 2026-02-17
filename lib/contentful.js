import * as contentful from "contentful";

const CONTENT_TYPE_PRODUCT = "product";

/**
 * Create a Contentful client for the Delivery API (published content).
 * Requires CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in env.
 */
function getClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    throw new Error(
      "Contentful credentials missing: set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN",
    );
  }
  return contentful.createClient({ space, accessToken });
}

/**
 * Normalize a Contentful image URL (may be protocol-relative).
 */
function imageUrl(file) {
  if (!file) return null;
  const url = typeof file === "string" ? file : file.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

/**
 * Recursively find the first string that looks like an image URL in an object.
 */
function findUrlInObject(obj, depth = 0) {
  if (depth > 5 || obj == null || typeof obj !== "object") return null;
  if (typeof obj === "string" && /^https?:\/\//.test(obj)) return obj;
  if (typeof obj === "string" && obj.startsWith("//")) return `https:${obj}`;
  if (obj.url && typeof obj.url === "string")
    return obj.url.startsWith("//") ? `https:${obj.url}` : obj.url;
  for (const key of ["file", "url", "fields"]) {
    const val = obj[key];
    if (val && typeof val === "object" && val.url)
      return val.url.startsWith("//") ? `https:${val.url}` : val.url;
    const found = findUrlInObject(val, depth + 1);
    if (found) return found;
  }
  for (const v of Object.values(obj)) {
    const found = findUrlInObject(v, depth + 1);
    if (found) return found;
  }
  return null;
}

/**
 * Get the Asset's file URL from an image field or from includes.
 * Handles: resolved asset, unresolved link, and different field shapes.
 */
function getImageUrl(imageField, includes = {}) {
  if (!imageField) return null;
  const isLink =
    imageField.sys?.type === "Link" && imageField.sys?.linkType === "Asset";
  const asset = isLink
    ? (includes?.Asset || []).find((a) => a.sys?.id === imageField.sys?.id)
    : imageField;
  if (!asset) return null;
  let file = asset.fields?.file ?? asset.file;
  if (file && typeof file === "object" && !file.url) {
    const first = Object.values(file)[0];
    if (first && typeof first === "object" && first.url) file = first;
  }
  if (file) {
    const url = typeof file === "object" ? file.url : file;
    if (url) return url.startsWith("//") ? `https:${url}` : url;
  }
  return findUrlInObject(asset);
}

/**
 * Extract plain text from a Contentful field (string or Rich text document).
 */
function toPlainText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return String(value);
  if (!Array.isArray(value.content)) return "";
  return value.content
    .map((node) => {
      if (node?.nodeType === "text") return node.value ?? "";
      if (Array.isArray(node?.content)) return toPlainText(node);
      return "";
    })
    .join("\n");
}

/**
 * Get flat fields from entry (in case Contentful returns locale-keyed fields).
 */
function getFields(entry) {
  const raw = entry.fields || {};
  if (
    raw.image != null ||
    raw.title != null ||
    raw.Image != null ||
    raw.Title != null
  )
    return raw;
  const firstLocale = Object.values(raw)[0];
  return typeof firstLocale === "object" && firstLocale !== null
    ? firstLocale
    : raw;
}

/**
 * Map a Contentful product entry to the shape used by ProductSection.
 * @param {object} entry - Contentful entry
 * @param {object} [includes] - Response includes (Asset array) for resolving image links
 */
function mapEntryToProduct(entry, includes = {}) {
  const fields = getFields(entry);
  const imageField =
    fields.image ?? fields.Image ?? fields.productImage ?? fields.product_image;
  const url = getImageUrl(imageField, includes);
  const title = toPlainText(fields.title ?? fields.Title);
  return {
    id: entry.sys.id,
    title,
    description: toPlainText(fields.description ?? fields.Description),
    imageSrc: url || "",
    imageAlt:
      toPlainText(fields.imageAlt ?? fields.image_alt) ||
      title ||
      "Product image",
  };
}

/**
 * Fetch all products from Contentful and split by category.
 * Categories: "sculpture" (solid/sculpted art), "drawing" (Art Market).
 *
 * @returns { Promise<{ sculptedArt: Array, artMarket: Array }> }
 */
export async function getProducts() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) {
    return { sculptedArt: [], artMarket: [] };
  }

  const client = getClient();

  const { items, includes } = await client.getEntries({
    content_type: CONTENT_TYPE_PRODUCT,
    order: ["fields.title"],
  });

  const assets = includes?.Asset ?? [];
  const sculptedArt = [];
  const artMarket = [];

  for (const entry of items) {
    const entryFields = getFields(entry);
    const category = (
      toPlainText(entryFields?.category ?? entryFields?.Category) || ""
    ).toLowerCase();
    const product = mapEntryToProduct(entry, { Asset: assets });
    if (!product.imageSrc && !product.title) continue;

    if (category === "drawing") {
      artMarket.push(product);
    } else {
      sculptedArt.push(product);
    }
  }

  return { sculptedArt, artMarket };
}
