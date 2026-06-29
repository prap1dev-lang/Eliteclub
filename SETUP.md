# Elite Club — Setup Guide

This is the **only file you need** to take the site from "running locally with placeholders"
to "fully working with a live database and file uploads."

Everything is already coded. You just paste 4–5 keys into `.env.local`, run one SQL file,
and you're live.

---

## 0. Run it locally (already works)

```bash
npm install        # already done
npm run dev        # → http://localhost:3000
```

The public site works right now. Forms and the admin panel will say "Supabase not configured"
until you do steps 1–3 below.

---

## 1. Supabase (free) — database

1. Go to **https://supabase.com** → create a free account → **New Project**.
   - Pick any name + a strong database password + a region close to India (e.g. Mumbai).
2. Wait ~2 minutes for it to provision.
3. **Create the tables:** left sidebar → **SQL Editor** → **New query** →
   open the file [`supabase-schema.sql`](./supabase-schema.sql) from this project, paste the
   **entire** contents, and click **Run**. You should see "Success."
4. **Get your keys:** left sidebar → **Project Settings** (gear) → **API**. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role / secret** key → `SUPABASE_SERVICE_ROLE_KEY`  *(keep this secret!)*

---

## 2. Cloudinary (free) — photo / video / ID uploads

1. Go to **https://cloudinary.com** → free account.
2. On the **Dashboard**, copy your **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
3. Create an **unsigned upload preset** (this lets the browser upload directly):
   - **Settings** (gear) → **Upload** tab → scroll to **Upload presets** → **Add upload preset**.
   - Set **Signing Mode** = **Unsigned**.
   - (Optional) set a folder like `elite-club`.
   - **Save**, then copy the **preset name** → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

---

## 3. Fill in `.env.local`

Open [`.env.local`](./.env.local) and replace the placeholders:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...      # anon public
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...          # service_role secret

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset

ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=any-long-random-string-here
```

> Generate a strong session secret:
> `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**Restart the dev server** after editing `.env.local` (`Ctrl+C`, then `npm run dev`).

---

## 4. Use it

- **Public site:** http://localhost:3000
- **Register:** /register · /register/influencer · /register/photographer · /register/videographer
- **Hire talent:** /hire
- **Become a partner:** /partner
- **Admin panel:** http://localhost:3000/admin  (log in with your `ADMIN_PASSWORD`)

Submit a test registration, then open the admin panel → **Registrations** to see it,
view uploaded files, change status, mark verified, mark payment as paid, and add notes.

---

## 5. Deploy (Vercel — free)

1. Push this folder to a GitHub repo.
2. Go to **https://vercel.com** → **New Project** → import the repo.
3. In **Environment Variables**, add the **same keys** from your `.env.local`
   (all of them, including `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`).
4. Deploy. Your site is live. The admin cookie is automatically `Secure` in production.

---

## Payments (current behaviour)

As requested, payments are **tracked, not charged** for now:
- Influencer registration captures a **₹1,100** fee → saved as `payment_status = pending`.
- Photographer / Videographer → **free** → `payment_status = waived`.
- Business requirement posting captures **₹1,100** → `pending`.
- In the admin panel you can flip any record's payment to **Paid**.

To add a real gateway later (e.g. Razorpay), wire it into the form's submit step and update
`payment_status` to `paid` on a verified payment webhook. The data model is already ready for it.

---

## Where things live

| Area | Path |
|------|------|
| Landing page sections | `src/components/home/` |
| Registration forms | `src/components/forms/` |
| Public pages | `src/app/(public)/` |
| API routes | `src/app/api/` |
| Admin panel | `src/app/admin/` + `src/components/admin/` |
| Domain data (states, packages, fees, hero images) | `src/lib/constants.ts` |
| Database schema | `supabase-schema.sql` |

To swap the hero / parallax model photos, edit `HERO_IMAGES` in `src/lib/constants.ts`.
