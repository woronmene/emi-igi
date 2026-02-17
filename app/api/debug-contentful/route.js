import * as contentful from "contentful";
import { NextResponse } from "next/server";

/**
 * Temporary debug route to inspect raw Contentful response.
 * Visit /api/debug-contentful to see the structure.
 * Remove or protect this route in production.
 */
export async function GET() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    return NextResponse.json(
      { error: "Contentful env not set" },
      { status: 500 },
    );
  }

  const client = contentful.createClient({ space, accessToken });
  const response = await client.getEntries({
    content_type: "product",
    limit: 1,
  });

  const item = response.items[0];
  if (!item) {
    return NextResponse.json({ message: "No products found", items: [] });
  }

  // Serialize a safe view of the first entry and its image field
  const fields = item.fields || {};
  const imageField = fields.image ?? fields.Image ?? null;
  const imageKeys = imageField ? Object.keys(imageField) : [];
  const imageSys = imageField?.sys ? { ...imageField.sys } : null;
  const imageFieldsKeys = imageField?.fields
    ? Object.keys(imageField.fields)
    : [];
  const fileObj = imageField?.fields?.file ?? imageField?.file;
  const fileKeys =
    fileObj && typeof fileObj === "object" ? Object.keys(fileObj) : [];
  const fileUrl =
    fileObj?.url ??
    (typeof fileObj === "object" ? Object.values(fileObj)[0]?.url : null);

  return NextResponse.json({
    message: "First product entry structure (for debugging image)",
    entryId: item.sys?.id,
    fieldNames: Object.keys(fields),
    image: {
      imageFieldExists: !!imageField,
      imageKeys,
      imageSys,
      imageFieldsKeys,
      fileObj: fileObj
        ? {
            keys: fileKeys,
            url: fileObj.url,
            sample:
              typeof fileObj === "object" && !fileObj.url
                ? Object.values(fileObj)[0]
                : null,
          }
        : null,
      resolvedUrl: fileUrl,
    },
    includesAssetCount: response.includes?.Asset?.length ?? 0,
  });
}
