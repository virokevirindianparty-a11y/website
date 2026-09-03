export type Candidate = {
  slug: string;
  name: string;
  constituency: string;
  number: string | null;
  state: string;
};

// Election 2024 MP candidates, sourced from party-issued candidate posters
// (public/images/candidates/<slug>.webp). "number" is the constituency
// number as printed on each poster.
export const CANDIDATES: Candidate[] = [
  { slug: "amritsar-surjit-singh", name: "Surjit Singh", constituency: "Amritsar", number: "02", state: "Punjab" },
  { slug: "fatehpur-raj-kumar-singh-rathaur", name: "Raj Kumar Singh Rathaur", constituency: "Fatehpur", number: "49", state: "Uttar Pradesh" },
  { slug: "anantnag-arshid-ahmad-malik", name: "Arshid Ahmad Malik", constituency: "Anantnag", number: "03", state: "Jammu & Kashmir" },
  { slug: "mainpuri-jaivir-singh-yadav", name: "Jaivir Singh Yadav", constituency: "Mainpuri", number: "21", state: "Uttar Pradesh" },
  { slug: "bathinda-naib-singh", name: "Naib Singh", constituency: "Bathinda", number: "11", state: "Punjab" },
  { slug: "khadoor-sahib-dalbir-singh", name: "Dalbir Singh", constituency: "Khadoor Sahib", number: "03", state: "Punjab" },
  { slug: "haridwar-nitin-bhatt", name: "Nitin Bhatt", constituency: "Haridwar", number: "05", state: "Uttarakhand" },
  { slug: "gurdaspur-mohinder-singh", name: "Mohinder Singh", constituency: "Gurdaspur", number: "01", state: "Punjab" },
  { slug: "west-delhi-shyam-lal-gansangar", name: "Shyam Lal Gansangar", constituency: "West Delhi", number: "06", state: "Delhi" },
  { slug: "tripura-west-ranjit-kumar-debbarma", name: "Ranjit Kumar Debbarma", constituency: "Tripura West", number: "01", state: "Tripura" },
  { slug: "new-delhi-krishna-pratap-singh", name: "Krishna Pratap Singh", constituency: "New Delhi", number: "04", state: "Delhi" },
  { slug: "satara-narayan-wadkar", name: "Narayan Wadkar", constituency: "Satara", number: "45", state: "Maharashtra" },
  { slug: "surendranagar-chhatrasinh-zala", name: "Chhatrasinh Zala", constituency: "Surendranagar", number: null, state: "Gujarat" },
  { slug: "jamnagar-ranchodbhai-kanzariya", name: "Ranchodbhai Kanzariya", constituency: "Jamnagar", number: null, state: "Gujarat" },
  { slug: "gautam-buddha-nagar-bhim-prakash-jigyasu", name: "Bhim Prakash Jigyasu", constituency: "Gautam Buddha Nagar", number: "13", state: "Uttar Pradesh" },
  { slug: "valsad-jayantibhai-patel", name: "Jayantibhai Patel", constituency: "Valsad", number: null, state: "Gujarat" },
  { slug: "sabarkantha-shantibhai-makwana", name: "Shantibhai Makwana", constituency: "Sabarkantha", number: null, state: "Gujarat" },
  { slug: "ahmedabad-west-maheshbhai-parmar", name: "Maheshbhai Parmar", constituency: "Ahmedabad West", number: null, state: "Gujarat" },
  { slug: "ahmedabad-east-shailendrasinh-pawar", name: "Shailendrasinh Pawar", constituency: "Ahmedabad East", number: null, state: "Gujarat" },
  { slug: "porbandar-lakhanshibhai-odedra", name: "Lakhanshibhai Odedra", constituency: "Porbandar", number: null, state: "Gujarat" },
  { slug: "aligarh-yogendra-palsingh", name: "Yogendra Palsingh", constituency: "Aligarh", number: "15", state: "Uttar Pradesh" },
  { slug: "etah-santoshkumar", name: "Santoshkumar", constituency: "Etah", number: "22", state: "Uttar Pradesh" },
  { slug: "jalaun-asharam-dohre", name: "Asharam Dohre", constituency: "Jalaun", number: "45", state: "Uttar Pradesh" },
  { slug: "jhansi-janak-singh", name: "Janak Singh", constituency: "Jhansi", number: "46", state: "Uttar Pradesh" },
  { slug: "hamirpur-vinod-kumar-singh", name: "Vinod Kumar Singh", constituency: "Hamirpur", number: "47", state: "Uttar Pradesh" },
  { slug: "akbarpur-shashikant-mishra", name: "Shashikant Mishra", constituency: "Akbarpur", number: "44", state: "Uttar Pradesh" },
  { slug: "bhadohi-manojkumar-yadav", name: "Manojkumar Yadav", constituency: "Bhadohi", number: "78", state: "Uttar Pradesh" },
  { slug: "lucknow-omprakash-singh", name: "Omprakash Singh", constituency: "Lucknow", number: "69", state: "Uttar Pradesh" },
  { slug: "machhli-shahar-ram-adhar-saroj", name: "Ram Adhar Saroj", constituency: "Machhli Shahar", number: "74", state: "Uttar Pradesh" },
  { slug: "valmikinagar-virendra-prasad-jaiswal", name: "Virendra Prasad Jaiswal", constituency: "Valmikinagar", number: "01", state: "Bihar" },
  { slug: "azamgarh-brisensingh-rathore", name: "Brisensingh Rathore", constituency: "Azamgarh", number: "69", state: "Uttar Pradesh" },
  { slug: "nalanda-bimlesh-kumar", name: "Bimlesh Kumar", constituency: "Nalanda", number: "29", state: "Bihar" },
  { slug: "east-champaran-naval-kishore-prasad", name: "Naval Kishore Prasad", constituency: "East Champaran", number: "03", state: "Bihar" },
  { slug: "sheohar-sudhir-kumar-singh", name: "Sudhir Kumar Singh", constituency: "Sheohar", number: "04", state: "Bihar" },
  { slug: "west-champaran-sanjay-kumar", name: "Sanjay Kumar", constituency: "West Champaran", number: "02", state: "Bihar" },
  { slug: "araria-jitendra-kumar-malik", name: "Jitendra Kumar Malik", constituency: "Araria", number: "09", state: "Bihar" },
  { slug: "ujiyarpur-shailesh-kumar-singh", name: "Shailesh Kumar Singh", constituency: "Ujiyarpur", number: "22", state: "Bihar" },
  { slug: "supaul-raj-kumar-yadav", name: "Raj Kumar Yadav", constituency: "Supaul", number: "08", state: "Bihar" },
  { slug: "buxar-nagendra-shekhar-singh", name: "Nagendra Shekhar Singh", constituency: "Buxar", number: "33", state: "Bihar" },
];
