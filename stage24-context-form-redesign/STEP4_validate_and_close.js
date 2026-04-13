// ============================================================
// STEP 4 — Validate and Close CR
// ============================================================
// Execute in Chrome DevTools console on pnyssen-synapsys-odoo.odoo.com
//
// Run each validation check (V1–V7) sequentially.
// V2–V7 require manual UI inspection — instructions provided as comments.
// ============================================================

// --- V1: Fields exist ---
// Query ir.model.fields for model_id=816, ttype='one2many'
(async () => {
    try {
        const fields = await _read('ir.model.fields', [], ['name', 'ttype', 'relation', 'relation_field'], {
            domain: [['model_id', '=', 816], ['ttype', '=', 'one2many']]
        });

        const expectedNames = [
            'x_programme_ids',
            'x_project_ids',
            'x_asset_ids',
            'x_benefit_ids',
            'x_legal_instrument_ids',
            'x_obligation_ids'
        ];

        const found = fields.filter(f => expectedNames.includes(f.name));
        console.log('V1 — Fields exist check:');
        console.log('   Expected: 6 fields');
        console.log('   Found:', found.length, 'fields');
        found.forEach(f => console.log('   ✅', f.name, '→', f.relation, '(via', f.relation_field + ')'));

        if (found.length === 6) {
            console.log('V1: ✅ PASS');
        } else {
            console.log('V1: ❌ FAIL — missing fields:', expectedNames.filter(n => !found.find(f => f.name === n)));
        }
    } catch (e) {
        console.error('V1: ❌ ERROR:', e);
        // Fallback: use search_read or _rpc
        console.log('Fallback: try using _rpc to search ir.model.fields');
    }
})();

// --- V2: View renders ---
// MANUAL CHECK:
// 1. Navigate to Contexts app
// 2. Open CTX-SS form
// 3. Confirm 5 notebook tabs visible:
//    - Overview
//    - Programmes & Services
//    - Delivery & Outputs
//    - Legal & Governance
//    - Operating Notes
console.log('V2: MANUAL — Navigate to Contexts app → open CTX-SS form → confirm 5 tabs visible');

// --- V3: Programmes tab ---
// MANUAL CHECK:
// 1. Click "Programmes & Services" tab on CTX-SS
// 2. Confirm PRG-VU-HEEP-001 appears (architecture_class=live)
// 3. Confirm SYSTEM/LEGACY programmes do NOT appear
console.log('V3: MANUAL — Click "Programmes & Services" tab → confirm PRG-VU-HEEP-001 visible, SYSTEM/LEGACY filtered out');

// --- V4: Assets tab ---
// MANUAL CHECK:
// 1. Click "Delivery & Outputs" tab
// 2. Confirm AST-HEEP-001 and AST-HEEP-002 appear
// 3. Confirm SYSTEM/LEGACY assets do NOT appear
console.log('V4: MANUAL — Click "Delivery & Outputs" tab → confirm AST-HEEP-001/002 visible, SYSTEM/LEGACY filtered out');

// --- V5: Stat buttons still work ---
// MANUAL CHECK:
// 1. Click the "Programmes" stat button
// 2. Confirm it navigates to the filtered list view (action 1039)
console.log('V5: MANUAL — Click "Programmes" stat button → confirm navigation to action 1039 list view');

// --- V6: Kanban/List unaffected ---
// MANUAL CHECK:
// 1. Switch to kanban view
// 2. Switch to list view
// 3. Confirm both render correctly (views 2441/2440 are independent)
console.log('V6: MANUAL — Switch to kanban & list views → confirm they render correctly');

// --- V7: Other contexts ---
// MANUAL CHECK:
// 1. Open CTX-AVA form
// 2. Confirm tabs show only CTX-AVA records (or empty if no LIVE+REVIEW records)
console.log('V7: MANUAL — Open CTX-AVA form → confirm tabs show only CTX-AVA records');


// ============================================================
// CLOSE CR — Run after ALL V1–V7 pass
// ============================================================
// Replace CR_ID with the actual ID from STEP 1 (or use window._CR_ID)

async function closeCR() {
    const crId = window._CR_ID;
    if (!crId) {
        console.error('❌ No CR ID found. Set window._CR_ID = <id> first, or replace directly below.');
        return;
    }

    try {
        await _write('x_ss_change_request', [crId], {
            x_implementation_status: 'implemented',
            x_test_status: 'passed',
            x_test_evidence: 'V1-V7 all PASS. 6 o2m fields created. View 2442 updated. Tabs render with LIVE+REVIEW domain filtering. Stat buttons functional. Kanban/list unaffected.'
        });
        console.log('✅ CR', crId, 'closed — implementation_status=implemented, test_status=passed');
    } catch (e) {
        console.error('❌ CR closure failed:', e);
    }
}

// Uncomment and run after confirming V1–V7:
// closeCR();
