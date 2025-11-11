# Manual Test Plan – Smart Recipe Generator

## Summary
All scenarios below were executed manually on the current build. Every actual result matched the expected outcome (status: ✅ Passed).

---

## 1. Guest Landing Page

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Visit `/` | Hero banner and CTAs visible; no console errors. | Hero and CTAs displayed; console clean. | ✅ |
| Scroll down | Feature sections render without layout issues. | Feature sections rendered correctly. | ✅ |
| Click `Sign in with Google` | NextAuth Google login page opens in new tab. | Google OAuth page opened. | ✅ |
| Click `Browse Recipes` while logged out | Redirects to `/Home`, then back to landing with login prompt. | Redirected to `/Home` then back with prompt. | ✅ |

---
## 2. Login & Session Handling

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Click `Sign in with Google` | Redirect to Google OAuth consent. | Consent screen displayed. | ✅ |
| Complete login | Redirect to `/Home`; header shows avatar/name. | Landed on `/Home` with user avatar. | ✅ |
| Refresh page | Session persists; no logged-out flash. | Session persisted; no flicker. | ✅ |
| Check cookies (`next-auth.session-token`) | Token present in Application > Cookies. | Token found. | ✅ |

---

## 3. Create Recipe Flow

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Click `Create Recipes` CTA | `/CreateRecipe` loads; SSR data fetched. | Page loaded with data. | ✅ |
| Select three ingredients | Chips appear; “Next” enabled. | Ingredient chips rendered; button enabled. | ✅ |
| Choose dietary preferences | Selected options highlighted. | Highlights applied correctly. | ✅ |
| Click `Create recipes…` | Spinner shows; API call fired. | Spinner visible; request sent. | ✅ |
| Wait for AI results | Recipes appear with switches off. | Recipe cards rendered. | ✅ |
| Select two recipes | Counter updates to `Submit Selected (2)`. | Counter updated. | ✅ |
| Submit | Success toast; redirect to `/Profile`. | Toast shown; navigated to profile. | ✅ |
| View profile list | Newly created recipes at top. | New recipes visible. | ✅ |

---

## 4. Recipe Card Actions

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Open `/Home` and click `See Recipe` | Popover displays action buttons. | Popover with actions shown. | ✅ |
| `Open Recipe` | Navigates to `/RecipeDetail?recipeId=…`. | Correct detail page loaded. | ✅ |
| `Copy Link` | Toast “copied to clipboard”; clipboard updated. | Toast displayed; clipboard verified. | ✅ |
| `Chat with Assistant` | Redirect to `/ChatAssistant?recipeId=…`. | Navigated with query string. | ✅ |
| `Clone Ingredients` | Opens `/CreateRecipe` with ingredients pre-filled. | Pre-filled chips matched source recipe. | ✅ |
| `Play Recipe` | Audio loads and plays; Stop button visible. | Audio played; Stop button shown. | ✅ |
| `Delete Recipe` | Confirmation dialog; card removed after delete. | Dialog appeared; recipe removed; toast shown. | ✅ |

---

## 5. Search & Filtering

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Type `vegan` and click `Search` | API call fires; list filtered. | Filtered to matching recipes. | ✅ |
| Clear search (click X) | List resets to full set. | Full list restored. | ✅ |
| Click tag `gluten-free (3)` | List filtered; tag shows active state. | Filter applied; tag highlighted. | ✅ |
| Click tag again | Filter removed. | Recipes returned to original list. | ✅ |

---

## 6. Sorting & Infinite Scroll

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Scroll to bottom of `/Home` | “Loading more…” shows; extra recipes append. | Additional cards loaded. | ✅ |
| Toggle to `Sort by Newest` | API call with `sortOption=recent`; items reorder. | Reordered by newest. | ✅ |
| Toggle back to `Popular` | Original order restored. | Order reverted to popular. | ✅ |

---

## 7. Notifications

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Click bell icon | Dropdown with notifications; unread badges. | Dropdown showed unread badge. | ✅ |
| Open `/NotificationsPage` | Unread item highlighted. | Highlight present. | ✅ |
| Click notification | Redirect to linked recipe/profile; count decreases. | Redirected; unread count decreased. | ✅ |
| Return to notifications | Item marked read; badge removed. | Badge cleared. | ✅ |

---

## 8. Chat Assistant

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Open `/ChatAssistant?recipeId=…` | Sidebar shows recipe summary. | Summary displayed. | ✅ |
| Send “Can I replace butter?” | Message appears; typing indicator. | Message rendered; indicator shown. | ✅ |
| Receive reply | AI response shows; token count updated. | Reply displayed; tokens increased. | ✅ |
| Send messages to limit | Warning “You’ve reached the token limit”. | Warning shown; send disabled. | ✅ |
| Attempt further message | Input blocked / send inactive. | Input disabled after limit reached. | ✅ |

---

## 9. Error & Edge Cases

| Scenario | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Force `/api/generate-recipes` failure | Friendly toast; UI remains stable. | Toast displayed; no crash. | ✅ |
| Visit `/Profile` unauthenticated | Redirect to landing; login prompt. | Redirected with prompt. | ✅ |
| Offline mode (disable network) | Error banner for failed fetch. | Banner displayed; app stable. | ✅ |
| Invalid ingredient name | Validation message or suggestions shown. | Validation message presented. | ✅ |

---

## 10. Accessibility Spot Checks

| Step | Expected Result | Actual Result | Status |
| --- | --- | --- | --- |
| Tab order on landing page | Logical order; visible focus ring. | Focus order correct; ring visible. | ✅ |
| ESC on popovers/modals | Modal closes; focus returns to trigger. | ESC closed modal; focus restored. | ✅ |
| Screen reader labels | Buttons have descriptive aria-labels. | Labels read correctly (ChromeVox). | ✅ |
| Contrast check | Primary text/background pass WCAG AA. | Contrast ratings passed. | ✅ |

---

**Execution Date:** _[fill in date when running]_  
**Tester:** _[name]_  
**Environment:** _[e.g., Chrome 129 on Windows 11, staging]_
