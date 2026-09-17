# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35165292681
- Commit: `368652e101fb53b83d7aa835c1981c93ceb102e3`
- Attempt: 2
- Written (UTC): 2026-09-17T00:32:41.323Z
- Passed: 718 · Skipped: 70 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 2, shard 3, shard 5
- Sources without results: none

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 61 user(s) owned by process 35165292681-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 46 user(s) owned by process 35165292681-3
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 60 user(s) owned by process 35165292681-5
```

## admin-translations-data.spec.ts › U4b translations console › TR-34 the Data roster names each row's identity and changes nothing else

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "{\"category\":{\"016acfb4-0ddf-4b83-a9a5-da9caa0b76b0\":{\"name\":\"ሌሎች የጉዞ እና ማረፊያ አገልግሎቶች\"},\"03da80ac-704c-43ca-a61c-8668ba18b0d2\":{\"name\":\"ላፕቶፖች\"},\"04d09898-b629-4bad-8c91-c6a757842ad1\":{\"name\":\"የስልክ መለዋወጫዎች\"},\"05d88c23-198d-4abc-8c3d-10e1fe917fbe\":{\"name\":\"ከጉዞ ጋር የተያያዙ አገልግሎቶች እና እቃዎች\"},\"06162c87-0fab-4a0a-adbd-e20e8b066b32\":{\"name\":\"ኮንክሪት እና ሜሶነሪ\"},\"0640d68d-f7c2-4f84-b9ba-35f8d1778ed5\":{\"name\":\"ሌሎች መዋቢያዎችና የግል እንክብካቤ ምርቶች\"},\"06ae6d51-babc-41f9-a6eb-b809216e24b4\":{\"name\":\"አገልግሎቶች\"},\"089358fb-f8e3-419e-96eb-664f744193bf\":{\"name\":\"ዩኒፎርሞች\"},\"0b60852f-c587-4e0c-a0eb-2fb3045be808\":{\"name\":\"ሽቶዎች\"},\"0d0251c6-17af-4b50-a218-aa1902c53367\":{\"name\":\"የቤት አገልግሎቶች\"},\"0da1fe50-8813-4b2d-9db3-83c003508a65\":{\"name\":\"የኤሌክትሪክ ተሽከርካሪዎች\"},\"0e3e86e6-8ec8-4ffa-80a9-9f1389dbb957\":{\"name\":\"ሌሎች የግንባታ እቃዎችና መሳርያዎች\"},\"1018692c-4460-4e8f-92d9-8fadec572e52\":{\"name\":\"ከብቶች\"},\"11f17726-b424-4739-8d36-a7014510f99a\":{\"name\":\"የስፖርት መሳሪያዎች\"},\"13b2ef24-5f54-4b8a-97c4-fb15d19fa391\":{\"name\":\"ታብሌቶች\"},\"14366de7-134c-446c-ab9e-f72195010ef7\":{\"name\":\"ፍሪላንስ እና ኮንትራት\"},\"16bf4f0d-0e9c-47f4-b850-33df6ff973d8\":{\"name\":\"የማይንቀሳቀስ የቤት ንብረት\"},\"1983210b-5277-4f19-9c66-b7102e3504f8\":{\"name\":\"የቤት ማስዋቢያ\"},\"19b98e3e-b203-4f9d-86b5-4eff6fe1e98a\":{\"name\":\"መለዋወጫዎች እና እቃዎች\"},\"226a775b-5209-4ca6-9f0a-07397c3e92d0\":{\"name\":\"ሌሎች ቁሳቁሶችና መሳሪያዎች\"},\"22a6398f-9ff2-4e4c-bce0-21bca431afc1\":{\"name\":\"ቁሳቁሶችና መሳሪያዎች\"},\"22d275bb-fdaf-4a15-9ba8-a668b8dc381d\":{\"name\":\"የቢሮ መሳሪያዎች\"},\"242d8be0-fbe4-4913-a2a1-444d6140dc7b\":{\"name\":\"ትላልቅ የመጓጓዣ መኪናዎች\"},\"2518d7ed-7112-4d0c-bf6b-a2219afefff4\":{\"name\":\"የቤት እንስሳት አገልግሎቶች\"},\"26a674eb-da82-4380-bd23-fa3fc3fdc1ec\":{\"name\":\"ትናንሽ ሴዳኖች\"},\"282686b0-56d8-4753-a070-2edea18fff7f\":{\"name\":\"ካሜራዎች እና ፎቶግራፍ\"},\"2917d749-f25f-4cc5-88b0-895b0517c73a\":{\"name\":\"መሬት\"},\"29b76e15-15df-4949-b6d1-470812aa1902\":{\"name\":\"ሪልቶር እና ተዛማጅ አገልግሎቶች\"},\"2af64654-1d87-45d3-a068-12a5a0a6d88e\":{\"name\":\"የጥገና አገልግሎቶች\"},\"2cebb9be-9e2d-4311-8710-24de36c8ecd3\":{\"name\":\"የኮምፒውተር መለዋወጫዎች\"},\"315311de-b0bc-4333-969a-4fc37fca99c0\":{\"name\":\"የሴቶች ልብስ\"},\"31a02b1e-bc1d-44b2-9e69-5edc9fc89770\":{\"name\":\"ጫማዎች\"},\"36130c60-6caf-431f-852f-6173b88d6d9a\":{\"name\":\"የዝግጅት ማደራጀት አገልግሎቶች\"},\"3798f518-c8ea-48f3-9872-6b8a81a95c59\":{\"name\":\"የሙሉ ጊዜ ስራዎች\"},\"388a0174-1a02-445e-81ab-e34c879dcdc0\":{\"name\":\"ሌሎች የማይንቀሳቀስ የቤት ንብረት\"},\"38b565d7-299b-4ea0-98a3-bee7e08d3b5f\":{\"name\":\"ኦዲዮ እና ጆሮ ማዳመጫዎች\"},\"399b1043-b75f-46c1-9954-ec021c85d048\":{\"name\":\"ሞተር ሳይክሎች\"},\"3fe7fd94-faa3-4f65-8c40-5020045e43df\":{\"name\":\"የቤት እቃዎች\"},\"41da8b68-ad09-4ccf-9395-35ba301145b1\":{\"name\":\"አውቶሞቲቭ\"},\"42858fa6-b12a-48e6-89a3-25b46d0cda73\":{\"name\":\"አትክልት እና የውጪ ቦታ\"},\"4308eae1-c9bd-40d7-8744-514e8f7dd3bf\":{\"name\":\"ከቤት ሆኖ መስራት\"},\"4716c192-f713-4e69-a397-e37156713e27\":{\"name\":\"የኩላሊት እና የሆርሞን መድኃኒቶች\"},\"49b50ecc-9ab2-4ea9-9ae2-df79210a516f\":{\"name\":\"ትላልቅ ሴዳኖች\"},\"4b7796c0-f0d2-4fca-b171-341c3ce78007\":{\"name\":\"የውጪ መዝናኛ\"},\"4bda2bdc-9d56-4a7d-ae70-271d73f7181b\":{\"name\":\"የሕክምና መሣሪያዎች አቅራቢዎች\"},\"52e77e18-0aef-46e4-ac82-4046f7b19d26\":{\"name\":\"የሙያ አገልግሎቶች\"},\"55da99d0-32df-4a83-a148-fb39f1ca65eb\":{\"name\":\"የኤሌክትሪክ እና የመብራት ቁሶች\"},\"560394a2-1ecf-4f4d-954e-c888b5aa59a1\":{\"name\":\"የከብት መኖ\"},\"56232dbf-bb08-4048-bc6d-77d4a0975765\":{\"name\":\"ትምህርት እና ስልጠና\"},\"56931667-2b79-4f38-bef3-e198e6a97878\":{\"name\":\"ስፖርት እና መዝናኛ\"},\"59b0b6d1-a6cc-4c03-b9be-bfe0abb458a5\":{\"name\":\"ግብርና እና እርሻ\"},\"5b27533c-8965-4ee6-b80c-c26056bc2212\":{\"name\":\"ሜካፕ\"},\"5cf2ced2-6be6-42f9-b175-4d2b19948a05\":{\"name\":\"ማዳበሪያ እና ኬሚካሎች\"},\"5fe266a7-0e71-41ac-bc1d-8109064c6201\":{\"name\":\"የእርሻ መሳሪያዎች\"},\"60e692ce-b90d-4697-bad3-df8a75239f16\":{\"name\":\"ለኪራይ ቤቶች\"},\"65e31737-0c17-476e-a927-dad2ec699c08\":{\"name\":\"ኩሽና እና መመገቢያ\"},\"6700d0ab-1f29-4b9d-98bb-91e40acd6dc6\":{\"name\":\"ቲቪ፣ ቪዲዮ፣ ጨዋታዎች\"},\"6a205892-f408-4534-9487-cbd9683ae38b\":{\"name\":\"ተራ ስልኮች\"},\"6b637c74-f1db-4608-968c-bcabdfc7dd9d\":{\"name\":\"ሌሎች አልባሳትና ሻንጣዎች\"},\"6d7ed015-de88-4a07-b8b2-19f17080b32e\":{\"name\":\"የትርፍ ጊዜ ስራዎች\"},\"6eb88a5e-8511-4892-afd2-d2936b13856a\":{\"name\":\"የጥገና እና የጥገና አገልግሎቶች\"},\"74794c26-6d65-4870-b80d-a8720fb3fdb4\":{\"name\":\"ወፎች\"},\"7604e912-d6bf-4e72-94d4-4b586f1612ce\":{\"name\":\"ሴዳኖች\"},\"767d2b61-bb57-4f00-a165-edf44d2089c2\":{\"name\":\"ኤስዩቪዎች\"},\"786434f6-6755-4610-bf23-2d98fc3c2994\":{\"name\":\"ውሾች\"},\"78fcd438-4250-48d6-bc9a-af2a3abdb8ff\":{\"name\":\"የግንባታ እቃዎችና መሳርያዎች\"},\"7a9612a9-56e7-4687-9ffb-894843331ba6\":{\"name\":\"ፋርማሲ\"},\"8f6fbebd-44a9-4cea-b5bd-b9050a3c1183\":{\"name\":\"የህጻናት የቤት እቃዎች\"},\"93f6a02e-a792-4722-9441-2f89fb499b78\":{\"name\":\"ለሽያጭ አፓርታማዎች\"},\"945c4b40-2387-4237-8c9d-95985c7f4337\":{\"name\":\"የልምምድ ስራዎች\"},\"9482f759-43b7-47dd-8156-358cc248ae4f\":{\"name\":\"ጂም እና የአካል ብቃት\"},\"94883f19-4b43-4808-8a72-cf40db03ceec\":{\"name\":\"የግንባታ መሳሪያዎች\"},\"9748f4aa-8b15-4a72-98b9-67b20e828bd1\":{\"name\":\"ዘሮች እና ተክሎች\"},\"99c1f91e-c911-47bb-b9f6-f671be4974d5\":{\"name\":\"የፀጉር እንክብካቤ\"},\"9aae2fac-3f4c-4375-b9e8-4967726024a6\":{\"name\":\"እንስሳት\"},\"9ba7a564-497d-4f89-af63-beaa7537c5c9\":{\"name\":\"የጭነት መኪናዎች\"},\"9e1080e6-c9ca-46bd-bbfb-fef2827105e1\":{\"name\":\"የጉዞ እና ማረፊያ አገልግሎቶች\"},\"9ec6c60a-a801-44b3-8220-0c985a2a338a\":{\"name\":\"ወንዶች መላጨት ምርቶች\"},\"9f860dca-029f-458f-a92a-f91a30ecbc0e\":{\"name\":\"የግል መጠቀሚያ መኪናዎች\"},\"9fd8ea8b-4055-442a-b078-5f6060e4c6cc\":{\"name\":\"የቅንጦት መኪናዎች\"},\"a5c99a60-fa91-4cbb-95c9-4e6f6ee44d9c\":{\"name\":\"መዋቢያዎችና የግል እንክብካቤ ምርቶች\"},\"a893269e-8a59-4b6e-b221-59154adc686e\":{\"name\":\"ስራ ፈላጊዎች እና ሲቪዎች\"},\"a97ea3b4-a3b5-4635-8bfd-a652124acb3d\":{\"name\":\"የተሰበሰበ ምርት\"},\"ac5b2d3a-78eb-410f-805c-346a1229498e\":{\"name\":\"ሌሎች ኤሌክትሮኒክስ\"},\"ad6e3407-867f-4546-9434-5f2304742eab\":{\"name\":\"መኪና እና መለዋወጫዎች\"},\"b0c27d8e-b575-4769-94e1-56ce264ccba3\":{\"name\":\"የአጭር ጊዜ ኪራይ\"},\"b225dac1-fb41-481c-80fd-7603fb580355\":{\"name\":\"ሃችባኮች\"},\"b2ed9c33-e2d5-4db5-be5f-02291c4daddb\":{\"name\":\"መካከለኛ ሴዳኖች\"},\"b3acd87c-fe35-4091-b297-80c46684648d\":{\"name\":\"ስልኮች\"},\"b657fe95-b507-4bf2-a7e7-28e06d0078ef\":{\"name\":\"የልጆች ልብስ\"},\"b78a4eea-13fe-448e-a694-e66a57f141f4\":{\"name\":\"የቆዳ እንክብካቤ\"},\"b88f1ece-0dbd-458a-a76e-37251abb2222\":{\"name\":\"የፋይናንስ አገልግሎቶች\"},\"b97efa4c-c741-4eea-9084-ec38e73f7f2a\":{\"name\":\"መመገቢያ እና መዝናኛዎች\"},\"baa48105-ed35-43b1-9503-22f26267a388\":{\"name\":\"ኤሌክትሮኒክስ\"},\"bab72e67-171a-4ee2-89f4-e3801135351f\":{\"name\":\"ህጻናት እና ልጆች\"},\"bb57e37d-5050-41aa-9ad4-75a0d4ef4ca8\":{\"name\":\"መለዋወጫዎች\"},\"bb7242f8-c46b-44d8-b8b0-f3f95afa29d6\":{\"name\":\"የፈጠራ አገልግሎቶች\"},\"bf838b77-341c-42fe-8f8f-ccb1d4ffcc2e\":{\"name\":\"ኩፔዎች\"},\"c525dbff-15ed-42dd-8443-a11938bd33a1\":{\"name\":\"አካላት እና መለዋወጫዎች\"},\"c60fbfc0-364a-4dc3-a434-efe0957bdc07\":{\"name\":\"ሌሎች አገልግሎቶች\"},\"cf2b570b-ef84-4c60-8cc5-2835df17aff9\":{\"name\":\"የቤት እንስሳት እቃዎች\"},\"cf566ff4-daf1-4a00-9788-dcb36b602e57\":{\"name\":\"ለኪራይ አፓርታማዎች\"},\"d56f5a49-957a-4aae-a620-7980db5f0b8d\":{\"name\":\"ዴስክቶፖች\"},\"d574531d-6c9f-475a-93d5-53cf88b6e92d\":{\"name\":\"የንግድ መሳሪያዎች\"},\"d6ad05b1-5ed3-43b0-9d59-2ad3a3e88ed0\":{\"name\":\"የክፍል ጓደኛ እና የጋራ መኖሪያ\"},\"d798524e-7f26-4226-ad25-f2c45eac1625\":{\"name\":\"ዓሳ እና አኳሪየም\"},\"d8a83310-9800-41d8-a54e-c52e7185592e\":{\"name\":\"ሌሎች መኪና እና መለዋወጫዎች\"},\"d8daee7e-17fb-47df-892b-3a18a0883459\":{\"name\":\"የወንዶች ልብስ\"},\"d9106051-31c9-4344-b365-9a88ce829ea7\":{\"name\":\"አልባሳትና ሻንጣዎች\"},\"daca99ee-894b-486c-af1c-7790c4157cf1\":{\"name\":\"የምግብ ቤት መሳሪያዎች\"},\"dece19e3-70f3-4874-a6bc-0c4e42b9a60c\":{\"name\":\"ኮምፒውተሮች\"},\"df53172b-414c-44b8-8043-fc777d0d6598\":{\"name\":\"ለሽያጭ ቤቶች\"},\"e0da97f7-4ba0-4ff9-bfc5-e82f66611a17\":{\"name\":\"የመዝናኛ አገልግሎቶች\"},\"e1fc3c94-cad6-4b74-830c-890338d8be21\":{\"name\":\"የህጻናት ጋሪ እና የመኪና ወንበር\"},\"e787c704-3128-4f7c-ad9b-0be899f49ac5\":{\"name\":\"ማረፊያ\"},\"ed0f806f-34f7-4059-86f7-27ce5041f6a6\":{\"name\":\"ሻንጣ እና የጉዞ መለዋወጫዎች\"},\"f2108bcb-76da-4acc-b2e8-b6ae46773751\":{\"name\":\"ስማርት ስልኮች\"},\"f427560c-5435-4c03-a4e7-7413ef1c829e\":{\"name\":\"ስራዎች\"},\"f4adf299-7214-43f0-a5f8-352a73d5171c\":{\"name\":\"የህጻናት ልብስ\"},\"f54df0a6-0a30-47fd-93f4-66afd943aade\":{\"name\":\"ሌሎች ኮምፒውተሮች\"},\"f5bab81b-ab7d-4cb7-886b-27650799da1a\":{\"name\":\"ድመቶች\"},\"f634356c-daed-44b9-bac3-621a13104c07\":{\"name\":\"ቢሮ ወይም የችርቻሮ ቦታ\"},\"f6c4f9d5-d294-47f6-b176-6345c7efc0db\":{\"name\":\"የመጻሕፍት መደብር እና የሙዚቃ ሱቆች\"},\"f8742994-5092-4956-a74d-f3383322538e\":{\"name\":\"መጫወቻዎች እና ጨዋታዎች\"},\"f8b08b10-5f12-42f2-8feb-079c09db887b\":{\"name\":\"ሶፍትዌር\"}},\"location\":{\"02f781fe-ebcd-43a5-bb86-0dc189975314\":{\"name\":\"ሲዳማ\"},\"09fa1d9c-a82e-465c-8b73-40bd3e8e10ef\":{\"name\":\"ኢትዮጵያ\"},\"1b984dd0-2e78-4aff-b26d-1494891d5ad1\":{\"name\":\"አዲስ አበባ 35165292681-5\"},\"1ba74da1-d9e7-4ba9-b08a-7010297f52b4\":{\"name\":\"ባህር ዳር\"},\"2236bc15-1880-42d7-aa41-5ecf16279c39\":{\"name\":\"ኦሮሚያ\"},\"5036601a-2f05-4eec-8067-7d1b103283af\":{\"name\":\"ሀዋሳ\"},\"5b14e413-639d-4688-9779-87a2a1ffaa25\":{\"name\":\"አዲስ አበባ\"},\"6180fa2b-d531-4599-b716-2ac6de50a68b\":{\"name\":\"ጅማ\"},\"6a2e39bb-0437-40f1-b7e9-8082d6f7a48f\":{\"name\":\"ቢሾፍቱ\"},\"72142b45-ac0a-4666-b482-91767c3d0ace\":{\"name\":\"መቀለ\"},\"7375f940-d637-4209-a267-ed52c6da8527\":{\"name\":\"አማራ\"},\"a3dcdb98-8517-45b8-9062-712f98a3896a\":{\"name\":\"አሜሪካ\"},\"a82930f3-f5aa-4a27-aa0d-1d5b3254076b\":{\"name\":\"ትግራይ\"},\"b862be00-0fe9-4a5b-b7bd-6b8cfd7c7e76\":{\"name\":\"ድሬ ዳዋ\"},\"cc70041c-ce53-4ac7-bf8e-f0a0bde4d19b\":{\"name\":\"ጎንደር\"},\"d200a45f-e472-4184-8873-77b640cb7a30\":{\"name\":\"ድሬ ዳዋ\"},\"eb6529f5-6d87-43b8-ae79-cb10072f4fc5\":{\"name\":\"አዲስ አበባ\"},\"fa33f8d4-9716-45c2-9fe0-a8ef512580e8\":{\"name\":\"አዳማ\"}},\"attribute\":{\"072c43e0-87d2-4a65-9820-ae86bc7322fe\":{\"label\":\"መጠን\"},\"760fbc7d-6851-4a26-8112-8bfdc0a93099\":{\"label\":\"ኢ2ኢ 4gkuln\"},\"a443f1fb-e561-476f-81fc-e89d02756d38\":{\"label\":\"ኢ2ኢ ff3mbk\"},\"ac7f7bc7-41cc-48c7-b910-3ad28ed8ff34\":{\"label\":\"ኢ2ኢ evzal8\"},\"bee544a2-f07a-43aa-b289-1b7c69e72c07\":{\"label\":\"ኢ2ኢ xntipb\"},\"c004f1dc-f953-48f7-9d18-f451f4499ee6\":{\"label\":\"ኢ2ኢ 7bsos3\"},\"ea9cfc66-3534-4407-8705-e1fef866392d\":{\"label\":\"ኢ2ኢ 44u84f\"},\"f4cba173-d47b-4753-ba41-40d366b86519\":{\"label\":\"ኢ2ኢ ifem1j\"},\"f734d224-23e7-4f7f-8c1f-7bef2b3770b0\":{\"label\":\"ኢ2ኢ vbailz\"}}}"
Received: "{\"category\":{\"016acfb4-0ddf-4b83-a9a5-da9caa0b76b0\":{\"name\":\"ሌሎች የጉዞ እና ማረፊያ አገልግሎቶች\"},\"03da80ac-704c-43ca-a61c-8668ba18b0d2\":{\"name\":\"ላፕቶፖች\"},\"04d09898-b629-4bad-8c91-c6a757842ad1\":{\"name\":\"የስልክ መለዋወጫዎች\"},\"05d88c23-198d-4abc-8c3d-10e1fe917fbe\":{\"name\":\"ከጉዞ ጋር የተያያዙ አገልግሎቶች እና እቃዎች\"},\"06162c87-0fab-4a0a-adbd-e20e8b066b32\":{\"name\":\"ኮንክሪት እና ሜሶነሪ\"},\"0640d68d-f7c2-4f84-b9ba-35f8d1778ed5\":{\"name\":\"ሌሎች መዋቢያዎችና የግል እንክብካቤ ምርቶች\"},\"06ae6d51-babc-41f9-a6eb-b809216e24b4\":{\"name\":\"አገልግሎቶች\"},\"089358fb-f8e3-419e-96eb-664f744193bf\":{\"name\":\"ዩኒፎርሞች\"},\"0b60852f-c587-4e0c-a0eb-2fb3045be808\":{\"name\":\"ሽቶዎች\"},\"0d0251c6-17af-4b50-a218-aa1902c53367\":{\"name\":\"የቤት አገልግሎቶች\"},\"0da1fe50-8813-4b2d-9db3-83c003508a65\":{\"name\":\"የኤሌክትሪክ ተሽከርካሪዎች\"},\"0e3e86e6-8ec8-4ffa-80a9-9f1389dbb957\":{\"name\":\"ሌሎች የግንባታ እቃዎችና መሳርያዎች\"},\"1018692c-4460-4e8f-92d9-8fadec572e52\":{\"name\":\"ከብቶች\"},\"11f17726-b424-4739-8d36-a7014510f99a\":{\"name\":\"የስፖርት መሳሪያዎች\"},\"13b2ef24-5f54-4b8a-97c4-fb15d19fa391\":{\"name\":\"ታብሌቶች\"},\"14366de7-134c-446c-ab9e-f72195010ef7\":{\"name\":\"ፍሪላንስ እና ኮንትራት\"},\"16bf4f0d-0e9c-47f4-b850-33df6ff973d8\":{\"name\":\"የማይንቀሳቀስ የቤት ንብረት\"},\"1983210b-5277-4f19-9c66-b7102e3504f8\":{\"name\":\"የቤት ማስዋቢያ\"},\"19b98e3e-b203-4f9d-86b5-4eff6fe1e98a\":{\"name\":\"መለዋወጫዎች እና እቃዎች\"},\"226a775b-5209-4ca6-9f0a-07397c3e92d0\":{\"name\":\"ሌሎች ቁሳቁሶችና መሳሪያዎች\"},\"22a6398f-9ff2-4e4c-bce0-21bca431afc1\":{\"name\":\"ቁሳቁሶችና መሳሪያዎች\"},\"22d275bb-fdaf-4a15-9ba8-a668b8dc381d\":{\"name\":\"የቢሮ መሳሪያዎች\"},\"242d8be0-fbe4-4913-a2a1-444d6140dc7b\":{\"name\":\"ትላልቅ የመጓጓዣ መኪናዎች\"},\"2518d7ed-7112-4d0c-bf6b-a2219afefff4\":{\"name\":\"የቤት እንስሳት አገልግሎቶች\"},\"26a674eb-da82-4380-bd23-fa3fc3fdc1ec\":{\"name\":\"ትናንሽ ሴዳኖች\"},\"282686b0-56d8-4753-a070-2edea18fff7f\":{\"name\":\"ካሜራዎች እና ፎቶግራፍ\"},\"2917d749-f25f-4cc5-88b0-895b0517c73a\":{\"name\":\"መሬት\"},\"29b76e15-15df-4949-b6d1-470812aa1902\":{\"name\":\"ሪልቶር እና ተዛማጅ አገልግሎቶች\"},\"2af64654-1d87-45d3-a068-12a5a0a6d88e\":{\"name\":\"የጥገና አገልግሎቶች\"},\"2cebb9be-9e2d-4311-8710-24de36c8ecd3\":{\"name\":\"የኮምፒውተር መለዋወጫዎች\"},\"315311de-b0bc-4333-969a-4fc37fca99c0\":{\"name\":\"የሴቶች ልብስ\"},\"31a02b1e-bc1d-44b2-9e69-5edc9fc89770\":{\"name\":\"ጫማዎች\"},\"36130c60-6caf-431f-852f-6173b88d6d9a\":{\"name\":\"የዝግጅት ማደራጀት አገልግሎቶች\"},\"3798f518-c8ea-48f3-9872-6b8a81a95c59\":{\"name\":\"የሙሉ ጊዜ ስራዎች\"},\"388a0174-1a02-445e-81ab-e34c879dcdc0\":{\"name\":\"ሌሎች የማይንቀሳቀስ የቤት ንብረት\"},\"38b565d7-299b-4ea0-98a3-bee7e08d3b5f\":{\"name\":\"ኦዲዮ እና ጆሮ ማዳመጫዎች\"},\"399b1043-b75f-46c1-9954-ec021c85d048\":{\"name\":\"ሞተር ሳይክሎች\"},\"3fe7fd94-faa3-4f65-8c40-5020045e43df\":{\"name\":\"የቤት እቃዎች\"},\"41da8b68-ad09-4ccf-9395-35ba301145b1\":{\"name\":\"አውቶሞቲቭ\"},\"42858fa6-b12a-48e6-89a3-25b46d0cda73\":{\"name\":\"አትክልት እና የውጪ ቦታ\"},\"4308eae1-c9bd-40d7-8744-514e8f7dd3bf\":{\"name\":\"ከቤት ሆኖ መስራት\"},\"4716c192-f713-4e69-a397-e37156713e27\":{\"name\":\"የኩላሊት እና የሆርሞን መድኃኒቶች\"},\"49b50ecc-9ab2-4ea9-9ae2-df79210a516f\":{\"name\":\"ትላልቅ ሴዳኖች\"},\"4b7796c0-f0d2-4fca-b171-341c3ce78007\":{\"name\":\"የውጪ መዝናኛ\"},\"4bda2bdc-9d56-4a7d-ae70-271d73f7181b\":{\"name\":\"የሕክምና መሣሪያዎች አቅራቢዎች\"},\"52e77e18-0aef-46e4-ac82-4046f7b19d26\":{\"name\":\"የሙያ አገልግሎቶች\"},\"55da99d0-32df-4a83-a148-fb39f1ca65eb\":{\"name\":\"የኤሌክትሪክ እና የመብራት ቁሶች\"},\"560394a2-1ecf-4f4d-954e-c888b5aa59a1\":{\"name\":\"የከብት መኖ\"},\"56232dbf-bb08-4048-bc6d-77d4a0975765\":{\"name\":\"ትምህርት እና ስልጠና\"},\"56931667-2b79-4f38-bef3-e198e6a97878\":{\"name\":\"ስፖርት እና መዝናኛ\"},\"59b0b6d1-a6cc-4c03-b9be-bfe0abb458a5\":{\"name\":\"ግብርና እና እርሻ\"},\"5b27533c-8965-4ee6-b80c-c26056bc2212\":{\"name\":\"ሜካፕ\"},\"5cf2ced2-6be6-42f9-b175-4d2b19948a05\":{\"name\":\"ማዳበሪያ እና ኬሚካሎች\"},\"5fe266a7-0e71-41ac-bc1d-8109064c6201\":{\"name\":\"የእርሻ መሳሪያዎች\"},\"60e692ce-b90d-4697-bad3-df8a75239f16\":{\"name\":\"ለኪራይ ቤቶች\"},\"65e31737-0c17-476e-a927-dad2ec699c08\":{\"name\":\"ኩሽና እና መመገቢያ\"},\"6700d0ab-1f29-4b9d-98bb-91e40acd6dc6\":{\"name\":\"ቲቪ፣ ቪዲዮ፣ ጨዋታዎች\"},\"6a205892-f408-4534-9487-cbd9683ae38b\":{\"name\":\"ተራ ስልኮች\"},\"6b637c74-f1db-4608-968c-bcabdfc7dd9d\":{\"name\":\"ሌሎች አልባሳትና ሻንጣዎች\"},\"6d7ed015-de88-4a07-b8b2-19f17080b32e\":{\"name\":\"የትርፍ ጊዜ ስራዎች\"},\"6eb88a5e-8511-4892-afd2-d2936b13856a\":{\"name\":\"የጥገና እና የጥገና አገልግሎቶች\"},\"74794c26-6d65-4870-b80d-a8720fb3fdb4\":{\"name\":\"ወፎች\"},\"7604e912-d6bf-4e72-94d4-4b586f1612ce\":{\"name\":\"ሴዳኖች\"},\"767d2b61-bb57-4f00-a165-edf44d2089c2\":{\"name\":\"ኤስዩቪዎች\"},\"786434f6-6755-4610-bf23-2d98fc3c2994\":{\"name\":\"ውሾች\"},\"78fcd438-4250-48d6-bc9a-af2a3abdb8ff\":{\"name\":\"የግንባታ እቃዎችና መሳርያዎች\"},\"7a9612a9-56e7-4687-9ffb-894843331ba6\":{\"name\":\"ፋርማሲ\"},\"8f6fbebd-44a9-4cea-b5bd-b9050a3c1183\":{\"name\":\"የህጻናት የቤት እቃዎች\"},\"93f6a02e-a792-4722-9441-2f89fb499b78\":{\"name\":\"ለሽያጭ አፓርታማዎች\"},\"945c4b40-2387-4237-8c9d-95985c7f4337\":{\"name\":\"የልምምድ ስራዎች\"},\"9482f759-43b7-47dd-8156-358cc248ae4f\":{\"name\":\"ጂም እና የአካል ብቃት\"},\"94883f19-4b43-4808-8a72-cf40db03ceec\":{\"name\":\"የግንባታ መሳሪያዎች\"},\"9748f4aa-8b15-4a72-98b9-67b20e828bd1\":{\"name\":\"ዘሮች እና ተክሎች\"},\"99c1f91e-c911-47bb-b9f6-f671be4974d5\":{\"name\":\"የፀጉር እንክብካቤ\"},\"9aae2fac-3f4c-4375-b9e8-4967726024a6\":{\"name\":\"እንስሳት\"},\"9ba7a564-497d-4f89-af63-beaa7537c5c9\":{\"name\":\"የጭነት መኪናዎች\"},\"9e1080e6-c9ca-46bd-bbfb-fef2827105e1\":{\"name\":\"የጉዞ እና ማረፊያ አገልግሎቶች\"},\"9ec6c60a-a801-44b3-8220-0c985a2a338a\":{\"name\":\"ወንዶች መላጨት ምርቶች\"},\"9f860dca-029f-458f-a92a-f91a30ecbc0e\":{\"name\":\"የግል መጠቀሚያ መኪናዎች\"},\"9fd8ea8b-4055-442a-b078-5f6060e4c6cc\":{\"name\":\"የቅንጦት መኪናዎች\"},\"a5c99a60-fa91-4cbb-95c9-4e6f6ee44d9c\":{\"name\":\"መዋቢያዎችና የግል እንክብካቤ ምርቶች\"},\"a893269e-8a59-4b6e-b221-59154adc686e\":{\"name\":\"ስራ ፈላጊዎች እና ሲቪዎች\"},\"a97ea3b4-a3b5-4635-8bfd-a652124acb3d\":{\"name\":\"የተሰበሰበ ምርት\"},\"ac5b2d3a-78eb-410f-805c-346a1229498e\":{\"name\":\"ሌሎች ኤሌክትሮኒክስ\"},\"ad6e3407-867f-4546-9434-5f2304742eab\":{\"name\":\"መኪና እና መለዋወጫዎች\"},\"b0c27d8e-b575-4769-94e1-56ce264ccba3\":{\"name\":\"የአጭር ጊዜ ኪራይ\"},\"b225dac1-fb41-481c-80fd-7603fb580355\":{\"name\":\"ሃችባኮች\"},\"b2ed9c33-e2d5-4db5-be5f-02291c4daddb\":{\"name\":\"መካከለኛ ሴዳኖች\"},\"b3acd87c-fe35-4091-b297-80c46684648d\":{\"name\":\"ስልኮች\"},\"b657fe95-b507-4bf2-a7e7-28e06d0078ef\":{\"name\":\"የልጆች ልብስ\"},\"b78a4eea-13fe-448e-a694-e66a57f141f4\":{\"name\":\"የቆዳ እንክብካቤ\"},\"b88f1ece-0dbd-458a-a76e-37251abb2222\":{\"name\":\"የፋይናንስ አገልግሎቶች\"},\"b97efa4c-c741-4eea-9084-ec38e73f7f2a\":{\"name\":\"መመገቢያ እና መዝናኛዎች\"},\"baa48105-ed35-43b1-9503-22f26267a388\":{\"name\":\"ኤሌክትሮኒክስ\"},\"bab72e67-171a-4ee2-89f4-e3801135351f\":{\"name\":\"ህጻናት እና ልጆች\"},\"bb57e37d-5050-41aa-9ad4-75a0d4ef4ca8\":{\"name\":\"መለዋወጫዎች\"},\"bb7242f8-c46b-44d8-b8b0-f3f95afa29d6\":{\"name\":\"የፈጠራ አገልግሎቶች\"},\"bf838b77-341c-42fe-8f8f-ccb1d4ffcc2e\":{\"name\":\"ኩፔዎች\"},\"c525dbff-15ed-42dd-8443-a11938bd33a1\":{\"name\":\"አካላት እና መለዋወጫዎች\"},\"c60fbfc0-364a-4dc3-a434-efe0957bdc07\":{\"name\":\"ሌሎች አገልግሎቶች\"},\"cf2b570b-ef84-4c60-8cc5-2835df17aff9\":{\"name\":\"የቤት እንስሳት እቃዎች\"},\"cf566ff4-daf1-4a00-9788-dcb36b602e57\":{\"name\":\"ለኪራይ አፓርታማዎች\"},\"d56f5a49-957a-4aae-a620-7980db5f0b8d\":{\"name\":\"ዴስክቶፖች\"},\"d574531d-6c9f-475a-93d5-53cf88b6e92d\":{\"name\":\"የንግድ መሳሪያዎች\"},\"d6ad05b1-5ed3-43b0-9d59-2ad3a3e88ed0\":{\"name\":\"የክፍል ጓደኛ እና የጋራ መኖሪያ\"},\"d798524e-7f26-4226-ad25-f2c45eac1625\":{\"name\":\"ዓሳ እና አኳሪየም\"},\"d8a83310-9800-41d8-a54e-c52e7185592e\":{\"name\":\"ሌሎች መኪና እና መለዋወጫዎች\"},\"d8daee7e-17fb-47df-892b-3a18a0883459\":{\"name\":\"የወንዶች ልብስ\"},\"d9106051-31c9-4344-b365-9a88ce829ea7\":{\"name\":\"አልባሳትና ሻንጣዎች\"},\"daca99ee-894b-486c-af1c-7790c4157cf1\":{\"name\":\"የምግብ ቤት መሳሪያዎች\"},\"dece19e3-70f3-4874-a6bc-0c4e42b9a60c\":{\"name\":\"ኮምፒውተሮች\"},\"df53172b-414c-44b8-8043-fc777d0d6598\":{\"name\":\"ለሽያጭ ቤቶች\"},\"e0da97f7-4ba0-4ff9-bfc5-e82f66611a17\":{\"name\":\"የመዝናኛ አገልግሎቶች\"},\"e1fc3c94-cad6-4b74-830c-890338d8be21\":{\"name\":\"የህጻናት ጋሪ እና የመኪና ወንበር\"},\"e787c704-3128-4f7c-ad9b-0be899f49ac5\":{\"name\":\"ማረፊያ\"},\"ed0f806f-34f7-4059-86f7-27ce5041f6a6\":{\"name\":\"ሻንጣ እና የጉዞ መለዋወጫዎች\"},\"f2108bcb-76da-4acc-b2e8-b6ae46773751\":{\"name\":\"ስማርት ስልኮች\"},\"f427560c-5435-4c03-a4e7-7413ef1c829e\":{\"name\":\"ስራዎች\"},\"f4adf299-7214-43f0-a5f8-352a73d5171c\":{\"name\":\"የህጻናት ልብስ\"},\"f54df0a6-0a30-47fd-93f4-66afd943aade\":{\"name\":\"ሌሎች ኮምፒውተሮች\"},\"f5bab81b-ab7d-4cb7-886b-27650799da1a\":{\"name\":\"ድመቶች\"},\"f634356c-daed-44b9-bac3-621a13104c07\":{\"name\":\"ቢሮ ወይም የችርቻሮ ቦታ\"},\"f6c4f9d5-d294-47f6-b176-6345c7efc0db\":{\"name\":\"የመጻሕፍት መደብር እና የሙዚቃ ሱቆች\"},\"f8742994-5092-4956-a74d-f3383322538e\":{\"name\":\"መጫወቻዎች እና ጨዋታዎች\"},\"f8b08b10-5f12-42f2-8feb-079c09db887b\":{\"name\":\"ሶፍትዌር\"}},\"location\":{\"02f781fe-ebcd-43a5-bb86-0dc189975314\":{\"name\":\"ሲዳማ\"},\"09fa1d9c-a82e-465c-8b73-40bd3e8e10ef\":{\"name\":\"ኢትዮጵያ\"},\"1ba74da1-d9e7-4ba9-b08a-7010297f52b4\":{\"name\":\"ባህር ዳር\"},\"2236bc15-1880-42d7-aa41-5ecf16279c39\":{\"name\":\"ኦሮሚያ\"},\"5036601a-2f05-4eec-8067-7d1b103283af\":{\"name\":\"ሀዋሳ\"},\"5b14e413-639d-4688-9779-87a2a1ffaa25\":{\"name\":\"አዲስ አበባ\"},\"6180fa2b-d531-4599-b716-2ac6de50a68b\":{\"name\":\"ጅማ\"},\"6a2e39bb-0437-40f1-b7e9-8082d6f7a48f\":{\"name\":\"ቢሾፍቱ\"},\"72142b45-ac0a-4666-b482-91767c3d0ace\":{\"name\":\"መቀለ\"},\"7375f940-d637-4209-a267-ed52c6da8527\":{\"name\":\"አማራ\"},\"a3dcdb98-8517-45b8-9062-712f98a3896a\":{\"name\":\"አሜሪካ\"},\"a82930f3-f5aa-4a27-aa0d-1d5b3254076b\":{\"name\":\"ትግራይ\"},\"b862be00-0fe9-4a5b-b7bd-6b8cfd7c7e76\":{\"name\":\"ድሬ ዳዋ\"},\"cc70041c-ce53-4ac7-bf8e-f0a0bde4d19b\":{\"name\":\"ጎንደር\"},\"d200a45f-e472-4184-8873-77b640cb7a30\":{\"name\":\"ድሬ ዳዋ\"},\"eb6529f5-6d87-43b8-ae79-cb10072f4fc5\":{\"name\":\"አዲስ አበባ\"},\"fa33f8d4-9716-45c2-9fe0-a8ef512580e8\":{\"name\":\"አዳማ\"}},\"attribute\":{\"072c43e0-87d2-4a65-9820-ae86bc7322fe\":{\"label\":\"መጠን\"},\"760fbc7d-6851-4a26-8112-8bfdc0a93099\":{\"label\":\"ኢ2ኢ 4gkuln\"},\"a443f1fb-e561-476f-81fc-e89d02756d38\":{\"label\":\"ኢ2ኢ ff3mbk\"},\"ac7f7bc7-41cc-48c7-b910-3ad28ed8ff34\":{\"label\":\"ኢ2ኢ evzal8\"},\"bee544a2-f07a-43aa-b289-1b7c69e72c07\":{\"label\":\"ኢ2ኢ xntipb\"},\"c004f1dc-f953-48f7-9d18-f451f4499ee6\":{\"label\":\"ኢ2ኢ 7bsos3\"},\"ea9cfc66-3534-4407-8705-e1fef866392d\":{\"label\":\"ኢ2ኢ 44u84f\"},\"f4cba173-d47b-4753-ba41-40d366b86519\":{\"label\":\"ኢ2ኢ ifem1j\"},\"f734d224-23e7-4f7f-8c1f-7bef2b3770b0\":{\"label\":\"ኢ2ኢ vbailz\"}}}"
```

Context:

```text
          - listitem [ref=e138]:
            - generic [ref=e139]: About
          - listitem [ref=e140]:
            - generic [ref=e141]: How it works
      - navigation "Help" [ref=e142]:
        - heading "Help" [level=2] [ref=e143]
        - list [ref=e144]:
          - listitem [ref=e145]:
            - generic [ref=e146]: Safety
          - listitem [ref=e147]:
            - generic [ref=e148]: Contact
      - navigation "Legal" [ref=e149]:
        - heading "Legal" [level=2] [ref=e150]
        - list [ref=e151]:
          - listitem [ref=e152]:
            - generic [ref=e153]: Terms
          - listitem [ref=e154]:
            - generic [ref=e155]: Privacy
    - paragraph [ref=e157]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "enforce",
+   "review",
+ ]
```

Context:

```text
          - listitem [ref=e419]:
            - generic [ref=e420]: ስለ እኛ
          - listitem [ref=e421]:
            - generic [ref=e422]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e423]:
        - heading "እገዛ" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - generic [ref=e427]: ደህንነት
          - listitem [ref=e428]:
            - generic [ref=e429]: ያግኙን
      - navigation "ሕጋዊ" [ref=e430]:
        - heading "ሕጋዊ" [level=2] [ref=e431]
        - list [ref=e432]:
          - listitem [ref=e433]:
            - generic [ref=e434]: ውሎች
          - listitem [ref=e435]:
            - generic [ref=e436]: ግላዊነት
    - paragraph [ref=e438]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "enforce",
+   "review",
+ ]
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: ስለ እኛ
          - listitem [ref=e530]:
            - generic [ref=e531]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e532]:
        - heading "እገዛ" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: ደህንነት
          - listitem [ref=e537]:
            - generic [ref=e538]: ያግኙን
      - navigation "ሕጋዊ" [ref=e539]:
        - heading "ሕጋዊ" [level=2] [ref=e540]
        - list [ref=e541]:
          - listitem [ref=e542]:
            - generic [ref=e543]: ውሎች
          - listitem [ref=e544]:
            - generic [ref=e545]: ግላዊነት
    - paragraph [ref=e547]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
