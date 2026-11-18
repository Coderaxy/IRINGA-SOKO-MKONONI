# Kifurushi cha kupeleka Iringa Soko Mkononi mtandaoni

## Kile ambacho kimeandaliwa
- `vercel.json`: mipangilio ya msingi ya ku-host tovuti tuli (HTML/CSS/JS) kwenye Vercel.
- `database/supabase-schema.sql`: muundo wa kuunda tables na sera za database ya Supabase.
- `DATABASE-HOSTING-GUIDE-SW.md`: mwongozo wa kuanzisha Supabase na Vercel.
- `.gitignore`: huzuia mafaili ya siri ya ndani kuingia Git.

## Hatua ambazo bado zinahitaji wewe kuidhinisha
1. Fungua akaunti ya GitHub na Vercel, kisha ruhusu Vercel kuunganishwa na GitHub.
2. Pakia yaliyomo ndani ya folda `ism_work` kwenye repository mpya ya GitHub.
3. Kwenye Vercel chagua **Add New → Project**, chagua repository hiyo, kisha bonyeza **Deploy**.
4. Fungua Supabase na utengeneze project mpya.
5. Kwenye Supabase SQL Editor, nakili na endesha `database/supabase-schema.sql`.
6. Hifadhi Project URL na anon/publishable key za Supabase kwa hatua ya kuunganisha programu.

## Muhimu
Kifurushi hiki kinaandaa hosting configuration na schema ya database. HAKIWEZI kuunda project ndani ya akaunti zako bila ruhusa/credentials zako. Pia schema pekee haimaanishi kuwa kila fomu ya tovuti tayari imeunganishwa na database; muunganisho wa JavaScript na majaribio ya usalama bado yanahitajika kabla ya matumizi halisi.

Usiweke `service_role` key, password, au secret yoyote kwenye JavaScript ya browser au GitHub.
