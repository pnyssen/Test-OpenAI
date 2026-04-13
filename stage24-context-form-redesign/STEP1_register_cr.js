// ============================================================
// STEP 1 — Register Change Request CHG-2026-074
// ============================================================
// Execute in Chrome DevTools console on pnyssen-synapsys-odoo.odoo.com
// Logged in as UID 5 (Phil Nyssen)
// ============================================================

(async () => {
    try {
        const crId = await _create('x_ss_change_request', {
            x_change_name: 'Context Form View Enhancement — 6 o2m Navigation Fields',
            x_reference: 'CHG-2026-074',
            x_context_id: 1,
            x_change_type: 'standard',
            x_change_scope: 'platform',
            x_operating_plane: 'cross',
            x_impact_level: 'low',
            x_risk_level: 'low',
            x_approval_status: 'approved',
            x_implementation_status: 'in_progress',
            x_test_required: true,
            x_test_status: 'pending',
            x_authority_reference: 'D007-TIEM-STAGE24-CONTEXT-FORM-ENHANCEMENT',
            x_operator_trace: 'STAGE24-CONTEXT-FORM-VIEW-OPTION-B',
            x_impacted_objects: 'x_ss_context_master (model 816), ir.ui.view 2442',
            x_rollback_plan: 'R1: Delete 6 o2m fields from model 816. R2: Restore original view 2442 arch XML.',
            x_company_id: 1
        });

        console.log('✅ CR created — ID:', crId);
        console.log('📋 Record this ID for STEP 4 closure.');
        console.log('   Variable saved: window._CR_ID =', crId);
        window._CR_ID = crId;
    } catch (e) {
        console.error('❌ CR creation failed:', e);
    }
})();
