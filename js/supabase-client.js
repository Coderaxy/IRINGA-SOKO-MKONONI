/* Optional Supabase client bootstrap. Include Supabase v2 CDN + supabase-config.js before this file. */
(function () {
  const cfg = window.ISM_SUPABASE_CONFIG;
  if (!cfg || !cfg.url || !cfg.anonKey || cfg.url.includes('WEKA_') || cfg.anonKey.includes('WEKA_')) {
    console.info('[ISM] Supabase haijaunganishwa bado; app itaendelea kutumia browser storage.');
    window.ismDb = null;
    return;
  }
  if (!window.supabase || !window.supabase.createClient) {
    console.error('[ISM] Supabase SDK haijapakiwa.');
    window.ismDb = null;
    return;
  }
  window.ismDb = window.supabase.createClient(cfg.url, cfg.anonKey);
  console.info('[ISM] Supabase client imeunganishwa.');
})();
