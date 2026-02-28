# Contentful setup for ÈMÍ-ÌGI

**For the site owner:** The site loads products from Contentful. You need **your own** Contentful account and space (not the developer’s). Follow the steps below once; after that you can add, edit, and remove products in Contentful without touching code.

---

## 1. Create your Contentful account and space

1. Go to **[contentful.com](https://www.contentful.com)** and sign up (or log in).
2. Create a **new space** for this project (e.g. “ÈMÍ-ÌGI” or “My site”). You’ll manage all products inside this space.

---

## 2. Create the Product content type

1. In Contentful, open your space and go to **Content model**.
2. Click **Add content type**.
3. **Name:** `Product`.  
   **API identifier:** must be exactly **`product`** (all lowercase).  
   Then click **Create**.
4. Add these fields (click **Add field** for each):

| Display name  | API identifier | Type             | Required |
| ------------- | -------------- | ---------------- | -------- |
| Title         | title          | Short text       | Yes      |
| Description   | description    | Long text        | No       |
| Product image | productImage   | Media (one file) | No       |
| Image alt     | imageAlt       | Short text       | No       |
| Category      | category       | Short text       | Yes      |

**Important:** The image field **API identifier** must be **`productImage`** (so the site can display product images).

5. For **Category**, when you add entries later, use **exactly** one of these (lowercase):
   - **sculpture** — shows in the first section (solid/sculpted art).
   - **drawing** — shows in the **Art Market** section (underlined titles).

6. Click **Save** to save the content type.

---

## 3. Get your API keys

1. In your space, go to **Settings** (gear icon) → **API keys**.
2. Click **Add API key** (or use the default key).
3. Give it a name (e.g. “Website”).
4. Copy and keep safe:
   - **Space ID**
   - **Content delivery API - access token**

You’ll need both in the next step.

---

## 4. Add the keys to the website project

1. On your computer, open the **project folder** of the website (the one you got from the developer).
2. Find the file **`.env.local.example`** in the root of the project. Duplicate it and rename the copy to **`.env.local`** (no “.example”).
3. Open **`.env.local`** in a text editor and set:
   - `CONTENTFUL_SPACE_ID` = the Space ID you copied
   - `CONTENTFUL_ACCESS_TOKEN` = the Content delivery API token you copied
4. Save the file.  
   **Do not** share `.env.local` or put it in version control; it contains secrets.

If the site is already running, restart it (e.g. run `npm run dev` again) so it picks up the new values.

---

## 5. Add and publish products

1. In Contentful, go to **Content**.
2. Click **Add entry** and choose **Product**.
3. Fill in:
   - **Title** (required)
   - **Description** (optional)
   - **Product image** — upload an image (optional but recommended)
   - **Image alt** — short description of the image for accessibility (optional)
   - **Category** — type **sculpture** or **drawing** (required)
4. Click **Publish**.

The website fetches content on each page load, so new or updated products appear as soon as they are published (no redeploy needed).

---

## Summary checklist for the client

- [ ] Create Contentful account at contentful.com
- [ ] Create a new space for this project
- [ ] Create content type **Product** with API ID **product**
- [ ] Add fields: title, description, **productImage**, imageAlt, category
- [ ] Get Space ID and Content delivery API token from Settings → API keys
- [ ] Create `.env.local` in the project and add both values
- [ ] Restart the site and add your first Product entries (sculpture or drawing)
