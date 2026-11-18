# Iringa Soko Mkononi — Database na Hosting (mwongozo wa Kiswahili)

## Kile kilichoandaliwa
- `database/supabase-schema.sql`: muundo wa PostgreSQL wenye profiles, categories, products, favorites, needs, orders, shipments, conversations/messages, support tickets/logs na promotions; RLS policies na bucket ya picha.
- `js/supabase-config.example.js`: mfano wa kuweka Project URL na anon/public key.
- `js/supabase-client.js`: bootstrap ya hiari ya Supabase JS v2.

**Muhimu:** Hii ni schema na scaffolding ya kuanzisha database. Database ya mtandaoni haijaundwa mpaka SQL iendeshwe kwenye project yako ya Supabase. Frontend ya sasa bado ina sehemu zinazotumia localStorage; kuweka keys peke yake hakugeuzi moja kwa moja kila fomu kuwa online. CRUD/auth/upload wiring na majaribio ya mwisho bado yanahitajika kabla ya kuitangaza kama marketplace kamili.

## A. Fungua Supabase (mara moja)
1. Fungua https://supabase.com/dashboard na jisajili/ingia.
2. Bonyeza **New project**. Chagua organization, jina `iringa-soko-mkononi`, password imara ya database, na region iliyo karibu inayopatikana.
3. Subiri project imalize kuanzishwa.
4. Fungua **SQL Editor** > **New query**.
5. Fungua faili `database/supabase-schema.sql` ndani ya ZIP, nakili maandishi yote, yabandike kwenye SQL Editor, kisha bonyeza **Run**.
6. Fungua **Project Settings > API** (au Connect). Nakili **Project URL** na **anon/public key** tu.
7. Kwenye folder `js`, nakili `supabase-config.example.js` na iite `supabase-config.js`; jaza URL na anon key. Usibadilishe au kuweka `service_role`/secret key kwenye website.

## B. Auth settings
1. Supabase Dashboard > **Authentication > URL Configuration**.
2. Weka Site URL ya domain yako baada ya ku-host (kwa majaribio unaweza kutumia Vercel URL).
3. Weka Vercel URL pia kwenye Redirect URLs.
4. Kwa majaribio, unaweza kuzima email confirmation tu kama unaelewa athari zake; kwa matumizi halisi acha uthibitishaji wa email ukiwashwa na weka SMTP inayofaa.

## C. Host website kwa Vercel
1. Fungua https://vercel.com/signup na jisajili (rahisi kwa GitHub).
2. Pakia project folder `ism_work` kwenye GitHub kama repository mpya (public au private).
3. Vercel > **Add New > Project** > chagua repository hiyo.
4. Framework Preset: **Other**; Build Command na Output Directory viache wazi kwa static HTML project hii.
5. Bonyeza **Deploy**. Vercel itakupa URL ya `*.vercel.app`.
6. Rudi Supabase > Authentication > URL Configuration; weka URL ya Vercel kama Site URL na Redirect URL.

## D. Jaribio la msingi
- Fungua Vercel URL kwenye browser na ujaribu kurasa zote.
- Supabase > Table Editor: hakikisha tables zimeonekana.
- Storage: hakikisha bucket `product-images` ipo.
- Usichapishe `supabase-config.js` yenye secret yoyote; anon/public key pekee ndiyo inayoruhusiwa browser, na RLS lazima ibaki imewashwa.

## Mipaka ya toleo hili
- Schema inalinda rekodi kwa Row Level Security, lakini inahitaji kukaguliwa na kujaribiwa kwa sera za biashara kabla ya uzinduzi wa umma.
- Fomu za sasa bado zinatumia browser storage kwa baadhi ya kazi. Lazima zifungwe na `window.ismDb` kwa usajili, login, bidhaa, picha, oda, delivery, messaging na support kabla data isambae kati ya watumiaji.
- Live courier tracking inahitaji API ya kampuni ya usafirishaji; chatbot ya sasa ni FAQ ya msingi, si AI ya moja kwa moja.
- Usihifadhi password za watumiaji wewe mwenyewe; tumia Supabase Auth.
