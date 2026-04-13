// ============================================================
// STEP 3 — Update View 2442 with full embedded-tab XML
// ============================================================
// Execute in Chrome DevTools console on pnyssen-synapsys-odoo.odoo.com
//
// IMPORTANT: Before running this, save the current view arch for rollback:
//   const currentView = await _read('ir.ui.view', [2442], ['arch']);
//   window._ORIGINAL_ARCH = currentView[0].arch;
//   console.log('Original arch saved to window._ORIGINAL_ARCH');
// ============================================================

// --- PRE-STEP: Save original arch for rollback ---
(async () => {
    try {
        const currentView = await _read('ir.ui.view', [2442], ['arch']);
        window._ORIGINAL_ARCH = currentView[0].arch;
        console.log('✅ Original arch saved to window._ORIGINAL_ARCH');
        console.log('   Length:', window._ORIGINAL_ARCH.length, 'chars');
    } catch (e) {
        console.error('⚠️ Could not read current arch — proceed with caution:', e);
    }
})();

// --- Wait a moment, then run the update below ---

// --- MAIN: Write new arch to view 2442 ---
(async () => {
    const newArch = `<form string="Context">
  <header>
    <field name="x_status" widget="statusbar" statusbar_visible="active"/>
  </header>
  <sheet>
    <div class="oe_button_box" name="button_box">
      <button class="oe_stat_button" type="action" name="1039" icon="fa-sitemap">
        <field name="x_programme_count" widget="statinfo" string="Programmes"/>
      </button>
      <button class="oe_stat_button" type="action" name="1040" icon="fa-tasks">
        <span class="o_stat_text">Tasks</span>
      </button>
      <button class="oe_stat_button" type="action" name="1041" icon="fa-cube">
        <field name="x_asset_count" widget="statinfo" string="Assets"/>
      </button>
      <button class="oe_stat_button" type="action" name="1042" icon="fa-line-chart">
        <field name="x_benefit_count" widget="statinfo" string="Benefits"/>
      </button>
      <button class="oe_stat_button" type="action" name="1043" icon="fa-balance-scale">
        <field name="x_legal_instrument_count" widget="statinfo" string="Legal"/>
      </button>
      <button class="oe_stat_button" type="action" name="1044" icon="fa-exchange">
        <field name="x_open_cr_count" widget="statinfo" string="Open CRs"/>
      </button>
    </div>
    <div class="oe_title">
      <h1><field name="x_name" readonly="1"/></h1>
    </div>
    <group>
      <group string="Identity">
        <field name="x_context_id"/>
        <field name="x_context_name"/>
        <field name="x_context_type"/>
      </group>
      <group string="Organisation">
        <field name="x_primary_company_id"/>
        <field name="x_ownership_type"/>
      </group>
    </group>
    <notebook>
      <page string="Overview">
        <group>
          <group string="Stewardship">
            <field name="x_steward"/>
            <field name="x_authority_reference"/>
          </group>
          <group string="Classification">
            <field name="x_precinct_typology"/>
            <field name="x_open_obligation_count" string="Open Obligations" readonly="1"/>
          </group>
        </group>
      </page>
      <page string="Programmes &amp; Services">
        <field name="x_programme_ids" readonly="1" domain="[('x_architecture_class', 'in', ['live', 'review'])]">
          <list>
            <field name="x_name"/>
            <field name="x_program_status"/>
            <field name="x_offering_layer"/>
            <field name="x_service_catalogue_id"/>
            <field name="x_architecture_class"/>
          </list>
        </field>
      </page>
      <page string="Delivery &amp; Outputs">
        <separator string="Projects"/>
        <field name="x_project_ids" readonly="1">
          <list>
            <field name="name"/>
            <field name="stage_id"/>
            <field name="user_id"/>
            <field name="x_service_catalogue_id"/>
          </list>
        </field>
        <separator string="Assets"/>
        <field name="x_asset_ids" readonly="1" domain="[('x_architecture_class', 'in', ['live', 'review'])]">
          <list>
            <field name="x_name"/>
            <field name="x_asset_class"/>
            <field name="x_asset_type_xyz"/>
            <field name="x_asset_status"/>
            <field name="x_architecture_class"/>
          </list>
        </field>
        <separator string="Benefits"/>
        <field name="x_benefit_ids" readonly="1" domain="[('x_architecture_class', 'in', ['live', 'review'])]">
          <list>
            <field name="x_name"/>
            <field name="x_benefit_status"/>
            <field name="x_asset_class"/>
            <field name="x_kpi_metric"/>
            <field name="x_architecture_class"/>
          </list>
        </field>
      </page>
      <page string="Legal &amp; Governance">
        <separator string="Legal Instruments"/>
        <field name="x_legal_instrument_ids" readonly="1" domain="[('x_architecture_class', 'in', ['live', 'review'])]">
          <list>
            <field name="x_name"/>
            <field name="x_instrument_type"/>
            <field name="x_status"/>
            <field name="x_effective_date"/>
            <field name="x_expiry_date"/>
            <field name="x_architecture_class"/>
          </list>
        </field>
        <separator string="Compliance Obligations"/>
        <field name="x_obligation_ids" readonly="1">
          <list>
            <field name="x_name"/>
            <field name="x_obligation_type"/>
            <field name="x_status"/>
            <field name="x_due_date"/>
            <field name="x_evidence_reference"/>
          </list>
        </field>
      </page>
      <page string="Operating Notes">
        <field name="x_operating_notes" placeholder="Daily notes, follow-ups, steward observations..."/>
      </page>
    </notebook>
  </sheet>
</form>`;

    try {
        await _write('ir.ui.view', [2442], { arch: newArch });
        console.log('✅ View 2442 updated successfully');
        console.log('   5 notebook tabs: Overview, Programmes & Services, Delivery & Outputs, Legal & Governance, Operating Notes');
        console.log('   6 o2m fields embedded with readonly="1"');
        console.log('   Domain filters applied to x_programme_ids, x_asset_ids, x_benefit_ids, x_legal_instrument_ids');
        console.log('   Stat buttons retained (actions 1039-1044)');
    } catch (e) {
        console.error('❌ View update failed:', e);
        console.log('   Run ROLLBACK script to restore original arch if needed.');
    }
})();
