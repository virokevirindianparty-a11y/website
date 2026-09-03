import { mkdir, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

const SRC = path.join(import.meta.dirname, "..", "public", "images", "Election 24 candidates");
const DEST = path.join(import.meta.dirname, "..", "public", "images", "candidates");

// Explicit filename -> slug mapping (verified against each photo's own caption
// while cataloguing candidate data), so there's no risk of an off-by-one from
// relying on directory sort order with "(1)/(2)" suffixed WhatsApp filenames.
const MAP = [
  ["WhatsApp Image 2026-08-24 at 14.32.54.jpeg", "amritsar-surjit-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.03.jpeg", "fatehpur-raj-kumar-singh-rathaur"],
  ["WhatsApp Image 2026-08-24 at 14.36.04.jpeg", "anantnag-arshid-ahmad-malik"],
  ["WhatsApp Image 2026-08-24 at 14.36.04 (1).jpeg", "mainpuri-jaivir-singh-yadav"],
  ["WhatsApp Image 2026-08-24 at 14.36.05.jpeg", "bathinda-naib-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.07 (1).jpeg", "khadoor-sahib-dalbir-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.07 (2).jpeg", "haridwar-nitin-bhatt"],
  ["WhatsApp Image 2026-08-24 at 14.36.07.jpeg", "gurdaspur-mohinder-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.08 (1).jpeg", "west-delhi-shyam-lal-gansangar"],
  ["WhatsApp Image 2026-08-24 at 14.36.08.jpeg", "tripura-west-ranjit-kumar-debbarma"],
  ["WhatsApp Image 2026-08-24 at 14.36.09.jpeg", "new-delhi-krishna-pratap-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.10.jpeg", "satara-narayan-wadkar"],
  ["WhatsApp Image 2026-08-24 at 14.36.11 (1).jpeg", "surendranagar-chhatrasinh-zala"],
  ["WhatsApp Image 2026-08-24 at 14.36.11 (2).jpeg", "jamnagar-ranchodbhai-kanzariya"],
  ["WhatsApp Image 2026-08-24 at 14.36.11.jpeg", "gautam-buddha-nagar-bhim-prakash-jigyasu"],
  ["WhatsApp Image 2026-08-24 at 14.36.12.jpeg", "valsad-jayantibhai-patel"],
  ["WhatsApp Image 2026-08-24 at 14.36.13.jpeg", "sabarkantha-shantibhai-makwana"],
  ["WhatsApp Image 2026-08-24 at 14.36.14 (1).jpeg", "ahmedabad-west-maheshbhai-parmar"],
  ["WhatsApp Image 2026-08-24 at 14.36.14 (2).jpeg", "ahmedabad-east-shailendrasinh-pawar"],
  ["WhatsApp Image 2026-08-24 at 14.36.14.jpeg", "porbandar-lakhanshibhai-odedra"],
  ["WhatsApp Image 2026-08-24 at 14.36.15.jpeg", "aligarh-yogendra-palsingh"],
  ["WhatsApp Image 2026-08-24 at 14.36.16 (1).jpeg", "etah-santoshkumar"],
  ["WhatsApp Image 2026-08-24 at 14.36.16.jpeg", "jalaun-asharam-dohre"],
  ["WhatsApp Image 2026-08-24 at 14.36.18 (1).jpeg", "jhansi-janak-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.18 (2).jpeg", "hamirpur-vinod-kumar-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.18.jpeg", "akbarpur-shashikant-mishra"],
  ["WhatsApp Image 2026-08-24 at 14.36.19 (1).jpeg", "bhadohi-manojkumar-yadav"],
  ["WhatsApp Image 2026-08-24 at 14.36.19 (2).jpeg", "lucknow-omprakash-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.19.jpeg", "machhli-shahar-ram-adhar-saroj"],
  ["WhatsApp Image 2026-08-24 at 14.36.22 (1).jpeg", "valmikinagar-virendra-prasad-jaiswal"],
  ["WhatsApp Image 2026-08-24 at 14.36.22.jpeg", "azamgarh-brisensingh-rathore"],
  ["WhatsApp Image 2026-08-24 at 14.36.23 (1).jpeg", "nalanda-bimlesh-kumar"],
  ["WhatsApp Image 2026-08-24 at 14.36.23 (2).jpeg", "east-champaran-naval-kishore-prasad"],
  ["WhatsApp Image 2026-08-24 at 14.36.23 (3).jpeg", "sheohar-sudhir-kumar-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.23.jpeg", "west-champaran-sanjay-kumar"],
  ["WhatsApp Image 2026-08-24 at 14.36.24 (1).jpeg", "araria-jitendra-kumar-malik"],
  ["WhatsApp Image 2026-08-24 at 14.36.24 (2).jpeg", "ujiyarpur-shailesh-kumar-singh"],
  ["WhatsApp Image 2026-08-24 at 14.36.24.jpeg", "supaul-raj-kumar-yadav"],
  ["WhatsApp Image 2026-08-24 at 14.36.25.jpeg", "buxar-nagendra-shekhar-singh"],
  // National President portrait (no constituency) - not a candidate card
  ["WhatsApp Image 2026-08-24 at 14.36.25 (1).jpeg", null],
];

await mkdir(DEST, { recursive: true });

for (const [file, slug] of MAP) {
  const srcPath = path.join(SRC, file);
  if (slug) {
    const outPath = path.join(DEST, `${slug}.webp`);
    await sharp(srcPath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log(`${file} -> ${outPath}`);
  } else {
    console.log(`${file} -> (skipped, not a candidate card)`);
  }
  await unlink(srcPath);
}

console.log(`Done. ${MAP.filter(([, s]) => s).length} candidate images processed.`);
