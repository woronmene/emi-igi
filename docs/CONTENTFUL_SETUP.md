# Contentful setup for ÈMÍ-ÌGI

This site loads products from Contentful so you can add, edit, and remove items without changing code.

## 1. Create a Contentful account and space

1. Go to [contentful.com](https://www.contentful.com) and sign up or log in.
2. Create a new space (or use an existing one).

## 2. Create the Product content type

1. Go to **Content model** and click **Add content type**.
2. Name: **Product**. API identifier should be **product** (lowercase).
3. Add these fields:

| Display name | API identifier        | Type        | Required |
| ------------ | --------------------- | ----------- | -------- |
| Title        | title                 | Short text  | Yes      |
| Description  | description           | Long text   | No       |
| Image        | image or productImage | Media (one) | No       |
| Image alt    | imageAlt              | Short text  | No       |
| Category     | category              | Short text  | Yes      |

4. For **Category**, use one of these exact values (lowercase):
   - **sculpture** — appears in the first section (solid/sculpted art, cream background).
   - **drawing** — appears in the **Art Market** section (different background, underlined titles).

5. Save the content type.

## 3. Get your API keys

1. Go to **Settings** → **API keys**.
2. Create an API key (or use the default).
3. Copy the **Space ID** and **Content delivery API - access token**.

## 4. Add keys to the project

1. In the project root, copy `.env.local.example` to `.env.local`.
2. Set:
   - `CONTENTFUL_SPACE_ID` = your Space ID
   - `CONTENTFUL_ACCESS_TOKEN` = your Content delivery API token

Do not commit `.env.local` (it is gitignored).

## 5. Add content

1. Go to **Content** in Contentful.
2. Click **Add entry** and choose **Product**.
3. Fill in Title, Description, Image (upload), and set Category to **sculpture** or **drawing**.
4. **Publish** the entry.

The site fetches content on every page load, so new or updated products appear as soon as they are published (no redeploy needed).
