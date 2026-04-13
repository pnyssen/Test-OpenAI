// ============================================================
// ROLLBACK — Stage 24 Context Form Redesign
// ============================================================
// Use this if any step fails and you need to revert.
// Execute in Chrome DevTools console on pnyssen-synapsys-odoo.odoo.com
// ============================================================

// --- R1: Restore original view arch ---
// This requires window._ORIGINAL_ARCH to be set (saved in STEP 3 pre-step)
(async () => {
    if (!window._ORIGINAL_ARCH) {
        console.error('❌ No original arch saved in window._ORIGINAL_ARCH');
        console.log('   You will need to manually query or restore from backup.');
        return;
    }

    try {
        await _write('ir.ui.view', [2442], { arch: window._ORIGINAL_ARCH });
        console.log('✅ View 2442 restored to original arch');
    } catch (e) {
        console.error('❌ View restore failed:', e);
    }
})();


// --- R2: Delete 6 o2m fields by ID ---
// Option A: If window._FIELD_IDS was saved from STEP 2
(async () => {
    if (!window._FIELD_IDS || window._FIELD_IDS.length === 0) {
        console.error('❌ No field IDs saved in window._FIELD_IDS');
        console.log('   Use Option B below to find and delete by name.');
        return;
    }

    const ids = window._FIELD_IDS.map(f => f.id);
    try {
        await _unlink('ir.model.fields', ids);
        console.log('✅ Deleted', ids.length, 'o2m fields:', ids);
    } catch (e) {
        console.error('❌ Field deletion failed:', e);
        console.log('   Try deleting one at a time:');
        for (const f of window._FIELD_IDS) {
            console.log(`   _unlink('ir.model.fields', [${f.id}]).then(() => console.log('Deleted ${f.name}'));`);
        }
    }
})();


// --- Option B: Find fields by name and delete ---
// Use if window._FIELD_IDS was not saved
/*
(async () => {
    const fieldNames = [
        'x_programme_ids',
        'x_project_ids',
        'x_asset_ids',
        'x_benefit_ids',
        'x_legal_instrument_ids',
        'x_obligation_ids'
    ];

    for (const name of fieldNames) {
        try {
            // Search for the field
            const results = await _rpc({
                model: 'ir.model.fields',
                method: 'search_read',
                args: [[['model_id', '=', 816], ['name', '=', name]]],
                kwargs: { fields: ['id', 'name'] }
            });

            if (results.length > 0) {
                await _unlink('ir.model.fields', [results[0].id]);
                console.log('✅ Deleted', name, '(ID:', results[0].id, ')');
            } else {
                console.log('⚠️', name, 'not found — may already be deleted');
            }
        } catch (e) {
            console.error('❌ Failed to delete', name, ':', e);
        }
        await new Promise(r => setTimeout(r, 500));
    }
})();
*/


// --- R3: Revert CR status if needed ---
/*
(async () => {
    const crId = window._CR_ID;
    if (!crId) {
        console.error('Set window._CR_ID first');
        return;
    }
    await _write('x_ss_change_request', [crId], {
        x_implementation_status: 'rolled_back',
        x_test_status: 'failed',
        x_test_evidence: 'Rolled back — [describe reason here]'
    });
    console.log('✅ CR', crId, 'marked as rolled_back');
})();
*/
