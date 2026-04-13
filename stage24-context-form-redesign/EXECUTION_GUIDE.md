# Stage 24 — Context Form View Redesign (Option B)

**CR:** CHG-2026-074  
**Authority:** D007-TIEM-STAGE24-CONTEXT-FORM-ENHANCEMENT  
**Target:** x_ss_context_master (model 816), ir.ui.view 2442  
**Operator:** STAGE24-CONTEXT-FORM-VIEW-OPTION-B  

## Prerequisites

- Logged into `pnyssen-synapsys-odoo.odoo.com` as UID 5 (Phil Nyssen)
- Chrome DevTools console open (F12 → Console)
- `_create`, `_write`, `_read` helpers available in Odoo JS context

## Execution Order

### STEP 1 — Register CR
Run `STEP1_register_cr.js` in console.  
**Record** the returned CR ID (saved to `window._CR_ID`).

### STEP 2 — Create 6 o2m Fields
Run `STEP2_create_o2m_fields.js` in console.  
If CDP timeout occurs, use the fallback individual `.then()` calls (commented at bottom of file).  
**Record** all 6 field IDs (saved to `window._FIELD_IDS`).

Fields created:
| Field | Relation Model | Relation Field |
|-------|---------------|---------------|
| `x_programme_ids` | `x_itc_program` | `x_context_id` |
| `x_project_ids` | `project.project` | `x_context_id` |
| `x_asset_ids` | `x_ss_asset_register` | `x_context_id` |
| `x_benefit_ids` | `x_ss_benefit_register` | `x_context_id` |
| `x_legal_instrument_ids` | `x_ss_legal_instrument` | `x_context_id` |
| `x_obligation_ids` | `x_ss_compliance_obligation` | `x_context_id` |

### STEP 3 — Update View 2442
1. First run the **pre-step** block to save original arch to `window._ORIGINAL_ARCH`
2. Then run the **main** block to write the new arch

5 notebook tabs created:
1. **Overview** — Stewardship + Classification
2. **Programmes & Services** — x_programme_ids (domain: live/review)
3. **Delivery & Outputs** — x_project_ids (no domain), x_asset_ids (domain: live/review), x_benefit_ids (domain: live/review)
4. **Legal & Governance** — x_legal_instrument_ids (domain: live/review), x_obligation_ids (no domain)
5. **Operating Notes** — x_operating_notes textarea

### STEP 4 — Validate and Close
Run validation checks V1–V7:
- **V1** (automated): Query confirms 6 o2m fields exist
- **V2–V7** (manual UI): Follow console instructions

After all PASS, uncomment and run `closeCR()`.

## Rollback

If anything fails, run `ROLLBACK.js`:
- **R1:** Restores original view arch from `window._ORIGINAL_ARCH`
- **R2:** Deletes 6 o2m fields by saved IDs

No data is at risk — o2m fields are virtual and readonly.

## Constraints Verified

- No new models
- No new actions or menus
- No workflow modifications
- No authority creation
- No automation rules
- All o2m fields readonly in view
