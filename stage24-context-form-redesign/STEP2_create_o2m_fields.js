// ============================================================
// STEP 2 — Create 6 one2many fields on model 816
// ============================================================
// Execute in Chrome DevTools console on pnyssen-synapsys-odoo.odoo.com
// These are virtual reverse-navigation fields — zero storage, readonly.
// ============================================================

(async () => {
    const fields = [
        { name: 'x_programme_ids', relation: 'x_itc_program', relation_field: 'x_context_id', desc: 'Programmes' },
        { name: 'x_project_ids', relation: 'project.project', relation_field: 'x_context_id', desc: 'Projects' },
        { name: 'x_asset_ids', relation: 'x_ss_asset_register', relation_field: 'x_context_id', desc: 'Assets' },
        { name: 'x_benefit_ids', relation: 'x_ss_benefit_register', relation_field: 'x_context_id', desc: 'Benefits' },
        { name: 'x_legal_instrument_ids', relation: 'x_ss_legal_instrument', relation_field: 'x_context_id', desc: 'Legal Instruments' },
        { name: 'x_obligation_ids', relation: 'x_ss_compliance_obligation', relation_field: 'x_context_id', desc: 'Obligations' },
    ];

    const createdIds = [];

    for (const f of fields) {
        try {
            const id = await _create('ir.model.fields', {
                model_id: 816,
                name: f.name,
                ttype: 'one2many',
                relation: f.relation,
                relation_field: f.relation_field,
                field_description: f.desc,
                state: 'manual'
            });
            console.log('✅', f.name, '→ field ID:', id);
            createdIds.push({ name: f.name, id: id });
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            console.error('❌ Failed to create', f.name, ':', e);
        }
    }

    console.log('');
    console.log('=== SUMMARY ===');
    console.log('Created field IDs:', JSON.stringify(createdIds, null, 2));
    console.log('Save these IDs for rollback if needed.');
    window._FIELD_IDS = createdIds;
})();


// ============================================================
// FALLBACK — If the above times out (CDP 45s timeout),
// use individual non-async calls, one at a time:
// ============================================================
/*
// Field 1: x_programme_ids
_create('ir.model.fields', {
    model_id: 816, name: 'x_programme_ids', ttype: 'one2many',
    relation: 'x_itc_program', relation_field: 'x_context_id',
    field_description: 'Programmes', state: 'manual'
}).then(id => console.log('x_programme_ids → field ID:', id));

// Wait ~2 seconds, then run Field 2:
_create('ir.model.fields', {
    model_id: 816, name: 'x_project_ids', ttype: 'one2many',
    relation: 'project.project', relation_field: 'x_context_id',
    field_description: 'Projects', state: 'manual'
}).then(id => console.log('x_project_ids → field ID:', id));

// Wait ~2 seconds, then run Field 3:
_create('ir.model.fields', {
    model_id: 816, name: 'x_asset_ids', ttype: 'one2many',
    relation: 'x_ss_asset_register', relation_field: 'x_context_id',
    field_description: 'Assets', state: 'manual'
}).then(id => console.log('x_asset_ids → field ID:', id));

// Wait ~2 seconds, then run Field 4:
_create('ir.model.fields', {
    model_id: 816, name: 'x_benefit_ids', ttype: 'one2many',
    relation: 'x_ss_benefit_register', relation_field: 'x_context_id',
    field_description: 'Benefits', state: 'manual'
}).then(id => console.log('x_benefit_ids → field ID:', id));

// Wait ~2 seconds, then run Field 5:
_create('ir.model.fields', {
    model_id: 816, name: 'x_legal_instrument_ids', ttype: 'one2many',
    relation: 'x_ss_legal_instrument', relation_field: 'x_context_id',
    field_description: 'Legal Instruments', state: 'manual'
}).then(id => console.log('x_legal_instrument_ids → field ID:', id));

// Wait ~2 seconds, then run Field 6:
_create('ir.model.fields', {
    model_id: 816, name: 'x_obligation_ids', ttype: 'one2many',
    relation: 'x_ss_compliance_obligation', relation_field: 'x_context_id',
    field_description: 'Obligations', state: 'manual'
}).then(id => console.log('x_obligation_ids → field ID:', id));
*/
