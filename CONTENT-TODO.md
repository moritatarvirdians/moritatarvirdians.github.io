# What you need to supply

Ordered by impact. The first block is what stands between this and being live.

---

## 1. Before launch (about two hours of work)

### Facts to verify or fix
- [ ] **Author list on the ICMI 2022 paper.** I placed your name third from the TU Delft portal listing.
      Check the actual order and fix it in `research.html`.
- [ ] **Co-authors on the PROBE preprint** (`arXiv:2510.04364`). Currently reads "and co-authors".
- [ ] **The under-review IUI paper.** I gave it a neutral working title. Replace or remove it. Do not
      name the venue while it is under blind review.
- [ ] **Google Scholar link.** Replace `REPLACE_ME` in the footer of every page (edit
      `_partials/footer.html`, then run `python3 tools/build.py sync`). If you have no Scholar profile,
      make one. It is one of the strongest `sameAs` signals for an academic entity.
- [ ] **ORCID.** Replace `0000-0000-0000-0000`. Register free at orcid.org if you do not have one.
- [ ] **Defence year.** I wrote 2027 in three places. Change if that shifts.
- [ ] **DataLand subscriber count.** The home page says "a few thousand learners". Make it accurate,
      and if the number is good, use the actual number instead.

### Files to add
- [ ] `assets/files/morita-tarvirdians-cv.pdf`
- [ ] `assets/img/og-card.jpg` — 1200×630, your photo plus your name. This is what shows up when
      anyone shares a link on LinkedIn, X, WhatsApp or Slack.
- [ ] `assets/img/portrait.jpg` — 1200×1500 (4:5)
- [ ] `assets/img/about-portrait.jpg` — 1200×1500
- [ ] `assets/img/dataland.jpg` — square, channel art or a still
- [ ] Nine video thumbnails. Fastest route: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
      for each video. Download them into `assets/img/` rather than hotlinking.
- [ ] Four square photos for the "off the clock" strip in `about.html`

### Forms
Both forms post to `REPLACE_WITH_YOUR_FORM_ENDPOINT`. GitHub Pages cannot process a form, so use a
free service. Any of these work with the existing markup:

| Service | Free tier | Note |
|---|---|---|
| Buttondown | 100 subscribers | Newsletter first, best fit for the monthly letter |
| MailerLite | 1,000 subscribers | Newsletter plus landing pages |
| Formspree | 50 submissions/month | Just collects, does not send |
| Tally | Unlimited | Prettiest, but an embedded iframe |

Recommendation: Buttondown for the newsletter and the waitlist both, as two separate tags on one list.
Replace the `action` attribute with the endpoint the service gives you and delete nothing else.

---

## 2. The photo shoot

You need about 12 usable images. A friend with a decent phone in good light gets you 80% of the way.
Shoot in two hours, one afternoon.

**Four categories, roughly three shots each:**

1. **The anchor headshot.** Head and shoulders, plain or softly blurred background, eyes to camera,
   neutral expression that is not a grin. Uses: LinkedIn, conference programmes, this site's schema
   `image`, email signature. Shoot it in landscape and portrait so it crops both ways.
2. **Environmental portrait.** You in the actual place you work. Your desk with two monitors, the EEMCS
   building, a lab space. Wide enough that the setting reads. Uses: the two hero blocks on this site.
   This is the single most important shot, because it answers "who is behind this" in one glance.
3. **Working shots.** You presenting, at a whiteboard, mid-sentence, hands moving, not looking at the
   camera. Uses: blog headers, talk announcements, the coaching page later.
4. **Detail and personal.** Hands on a keyboard, a notebook, your bike, a walk, whatever the four
   "off the clock" squares should actually be. These carry personality without needing your face.

**Practical notes**
- Wear two to three outfits in solid, matte colours. Navy, charcoal, deep green, cream, burgundy all
  photograph well. Avoid small patterns, logos and shiny fabric.
- Shoot near a large window, subject facing the light, back to a plain wall. No direct midday sun.
- Portrait mode on a phone is fine for headshots. Turn it off for the environmental shots, because it
  blurs exactly the context you want visible.
- Take four times as many as you need. You will bin most of them.
- Export at around 1600px on the long edge and compress. Every image on this site should be under
  200KB. Use `squoosh.app` or `cwebp`. Page speed is a measured factor in whether AI systems cite you.

**One decision to make deliberately:** how formal to go. Fully corporate reads wrong for a YouTube
channel. Fully casual undercuts an academic job application. The environmental shots split the
difference better than either extreme, which is why they carry both hero sections.

---

## 3. Writing you still owe the site

I drafted one post (`writing/nine-reasons-one-silence.html`) from your own published numbers, in
answer-first structure with the statistics up front, because that is the format that actually gets
cited. **Read it before publishing.** It is my draft in your voice, not your voice.

Next four posts, in the order I would write them:

1. **"What an AI can and cannot see about your thinking."** Your central thesis, explained for a
   non-academic reader, 900 words. This is the piece that has to exist. Everything else links to it.
2. **"I moved countries on incomplete information."** The personal essay that connects your own story
   to the research. This is what makes a coaching page believable later, and it is the piece most
   likely to be shared.
3. **"Web scraping in Persian, NLP in English."** Why the channel is bilingual. Ties the two halves of
   your public presence together instead of leaving them as separate lives.
4. **"Five things I got wrong in four years of PhD."** Highest-engagement genre in academic writing,
   and it costs you nothing you would not say out loud anyway.

Aim for one a month. Content updated within 30 days is measurably more likely to be cited by AI
systems than content over 90 days old, so cadence matters more than length.

---

## 4. Off-site work (this is where most of the ranking actually comes from)

Roughly 85% of AI citations come from sources that are not your own website. Your site is where you
control the story. These are where the story gets picked up.

- [ ] **Make every profile say the same thing.** Same name spelling, same one-line description, same
      photo on: LinkedIn, Google Scholar, ORCID, GitHub, YouTube, TU Delft page, Hybrid Intelligence
      page, X. Entity resolution works by consistency. Inconsistency is why systems fail to connect
      "Morita Tarvirdians" with "Morita DataLand".
- [ ] **Link back to this site from every one of them.** The `rel="me"` links in the footer point out;
      the profiles need to point in. That reciprocal pair is what confirms the entity.
- [ ] **Wikidata item.** Free, takes 20 minutes, and it is the structured source LLMs lean on hardest
      for facts about people. You qualify as a published researcher. Add your name, occupation,
      employer, ORCID, and your papers.
- [ ] **arXiv author identifier.** Merges your papers under one canonical author page.
- [ ] **YouTube video descriptions.** Put your site URL in the first two lines of every description.
      YouTube is the single strongest correlate with visibility in Google's AI Overviews, and yours is
      currently pointing at nothing.
- [ ] **Ask TU Delft** to link this site from your staff page.

---

## 5. Coaching launch checklist (2027)

- [ ] Swap the JSON-LD on `coaching.html` for a service block:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Reflective Decision Coaching",
  "provider": { "@id": "https://moritatarvirdians.com/#person" },
  "areaServed": ["NL", "Online"],
  "availableLanguage": ["en", "fa"],
  "url": "https://moritatarvirdians.com/coaching.html",
  "priceRange": "€€"
}
```

- [ ] Replace the "in development" band with real availability and a booking link (Cal.com is free).
- [ ] Add three testimonials with full names and roles. Anonymous testimonials read as invented.
- [ ] Set a price and publish it. Hiding the price loses more people than the price does.
- [ ] Add a terms page and a privacy notice. You will be processing personal data from EU residents,
      so a GDPR-adequate privacy notice is not optional.
- [ ] Decide whether the coaching gets its own domain. My view: it should not. The whole advantage you
      have over every other coach is that the method has four peer-reviewed papers behind it, and that
      advantage only reads if the pages sit on the same site.
- [ ] Keep the "this is not therapy" boundary on the page. It protects you and it is the thing that
      makes the rest of the page credible.
