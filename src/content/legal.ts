// ─── Legal content (Privacy Policy + Terms of Service) ─────────────────────────────
//
// All business-specific details live in `legalMeta` below so you change them in
// ONE place. The document bodies reference the unknowns via [[TOKENS]] which are
// resolved from `legalMeta` at render time (see resolveTokens).
//
// NOTE: This is a solid, standard template, not a substitute for a lawyer. Have a
// qualified Indian lawyer review it, and fill every TODO(owner) value below before
// relying on it in production. The document text was generated and adversarially
// reviewed for accuracy to how this site actually works; do not paste in boilerplate
// that claims data practices (analytics, cookies, storage) this site does not have.

export const legalMeta = {
  tradeName: "Studs Agency",

  // TODO(owner): your REGISTERED legal entity name, e.g. "Studs Agency (Proprietor:
  // <Full Name>)" or "Studs Media Pvt. Ltd.". Until set, the trade name is shown.
  entityName: "Studs Agency",

  website: "https://www.studsagency.com",
  whatsapp: "+91 85954 81642",

  // TODO(owner): a real inbox you actually monitor for privacy/legal requests.
  contactEmail: "hello@studsagency.com",

  // TODO(owner): your registered business address (needed for a compliant policy).
  businessAddress: "India",

  // TODO(owner): the city whose courts have exclusive jurisdiction, e.g. "New Delhi".
  jurisdictionCity: "New Delhi, India",

  // TODO(owner): name/title of the person who handles grievances (DPDP Act, 2023).
  grievanceOfficer: "The Grievance Officer, Studs Agency",

  // TODO(owner): update whenever you change these documents.
  effectiveDate: "21 July 2026",
};

// ─── Document model ─────────────────────────────────────────────────────
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string };

export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalDocData = { title: string; sections: LegalSection[] };

// Resolve [[TOKENS]] to values from legalMeta at render time.
const TOKENS: Record<string, string> = {
  "[[ENTITY_NAME]]": legalMeta.entityName,
  "[[CONTACT_EMAIL]]": legalMeta.contactEmail,
  "[[BUSINESS_ADDRESS]]": legalMeta.businessAddress,
  "[[JURISDICTION_CITY]]": legalMeta.jurisdictionCity,
  "[[GRIEVANCE_OFFICER_NAME]]": legalMeta.grievanceOfficer,
  "[[EFFECTIVE_DATE]]": legalMeta.effectiveDate,
};

export function resolveTokens(input: string): string {
  return input.replace(/\[\[[A-Z_]+\]\]/g, (m) => TOKENS[m] ?? m);
}

// ─── Documents ────────────────────────────────────────────────────────────
// Generated from an adversarially reviewed drafting pass. Edit legalMeta above for
// business details; edit the prose here for wording. Keep it accurate to the site.

export const privacyPolicy: LegalDocData = {
  "title": "Privacy Policy for Studs Agency",
  "sections": [
    {
      "heading": "1. Introduction and Who We Are",
      "blocks": [
        {
          "type": "p",
          "text": "This Privacy Policy explains how Studs Agency (\"Studs Agency\", \"we\", \"us\", or \"our\"), operated by [[ENTITY_NAME]], handles information in connection with our website at www.studsagency.com (the \"Site\"). Studs Agency is a full-stack digital growth and marketing agency based in India, offering brand strategy, personal branding, social media and content, performance marketing, web development, creative production, AI and business automation, analytics, consulting, and custom software."
        },
        {
          "type": "p",
          "text": "Under India's Digital Personal Data Protection Act, 2023 (the \"DPDP Act\"), [[ENTITY_NAME]], operating as Studs Agency, is the Data Fiduciary that determines the purpose and means of processing personal data described in this policy, and you, the individual whose personal data is processed, are the Data Principal. This policy is also intended to serve as the notice contemplated under Section 5 of the DPDP Act: it tells you, before you share your personal data, what personal data we process, for what purposes, and how you may exercise your rights and raise grievances. Where we rely on your consent, providing your personal data for the purpose described (for example, sending us the pre-filled WhatsApp message, or emailing us) constitutes your consent for that purpose."
        },
        {
          "type": "p",
          "text": "This policy applies only to the Site and to enquiries you send us through it. It does not govern the delivery of paid client engagements, which are covered by separate signed agreements, statements of work, or service contracts between Studs Agency and the client. This policy covers enquiry and general correspondence data; personal data handled as part of a specific project is governed by the applicable signed agreement or statement of work, which takes precedence for that project."
        },
        {
          "type": "p",
          "text": "If you have questions about this policy or how we handle your information, you can reach us at [[CONTACT_EMAIL]] or on WhatsApp at +91 85954 81642."
        }
      ]
    },
    {
      "heading": "2. What Information We Collect",
      "blocks": [
        {
          "type": "h3",
          "text": "a. Information you voluntarily provide through the contact form"
        },
        {
          "type": "p",
          "text": "Our Site includes a \"Let's talk\" contact form that collects three fields: your Name, your Brand or Role, and a free-text Message. Please read Section 3 carefully, because this form works in an unusual way. It does not send your details to any Studs Agency server or database. Instead, it opens WhatsApp on your own device with a message pre-filled, and you decide whether to send it to us. As a result, the information you type into the form is not stored on our website servers."
        },
        {
          "type": "h3",
          "text": "b. Technical and log data processed by our hosting provider"
        },
        {
          "type": "p",
          "text": "Our Site is hosted on Vercel. As part of delivering, securing, and operating the Site, Vercel automatically processes standard server request logs. These may include your IP address, browser type and user-agent, timestamps, and the pages or resources requested. This is standard hosting-level processing that is common to virtually all websites. It is not analytics run by Studs Agency. We do not access or analyse these logs for marketing or to build profiles of visitors; Vercel processes them for operational and security purposes."
        },
        {
          "type": "h3",
          "text": "c. Information you send us directly"
        },
        {
          "type": "p",
          "text": "If you contact us directly by WhatsApp, by email, or through any other channel, or when you engage us as a client, you may share additional information such as your name, contact details, company information, and the contents of your messages, briefs, or documents. We collect and use whatever you choose to send us in order to respond and to work with you. Where such information relates to a specific paid engagement, its handling is governed by the applicable signed agreement or statement of work."
        }
      ]
    },
    {
      "heading": "3. How the Contact Form Works (the WhatsApp Handoff)",
      "blocks": [
        {
          "type": "p",
          "text": "When you complete the \"Let's talk\" form and click Send, the Site does not transmit your entries to us over the internet and does not save them anywhere on our infrastructure. Instead, it generates a WhatsApp deep link (a wa.me link) that opens WhatsApp on your device with a message pre-filled with the details you entered, addressed to the Studs Agency WhatsApp number (+91 85954 81642)."
        },
        {
          "type": "p",
          "text": "Please note that the details you enter (your Name, Brand or Role, and Message) are placed into this WhatsApp deep link as the pre-filled message text, so that WhatsApp can open with your message ready to send. This link opens the WhatsApp application on your own device; it does not send your details to a Studs Agency server."
        },
        {
          "type": "p",
          "text": "You remain in control at that point. You choose whether to actually send the WhatsApp message. Studs Agency only receives your Name, Brand or Role, and Message if, and when, you decide to send that WhatsApp message to us. If you close WhatsApp without sending, we never receive the information."
        },
        {
          "type": "p",
          "text": "WhatsApp is operated by Meta Platforms and is an independent third-party communication service that you choose to use. Once you send a message through WhatsApp, that message is delivered through WhatsApp's own platform, under Meta's control, and is subject to Meta's own privacy policy and terms, in addition to this policy. We encourage you to review Meta's privacy terms to understand how they handle messages sent through WhatsApp."
        }
      ]
    },
    {
      "heading": "4. Cookies and Tracking",
      "blocks": [
        {
          "type": "p",
          "text": "We aim to keep the Site privacy-friendly and lightweight. We do not use analytics, tracking, or advertising cookies, and we do not run third-party trackers. Specifically, the Site does not use Google Analytics, the Meta pixel, Hotjar, Microsoft Clarity, or similar tools. It does not load Google Fonts or an external font CDN (our fonts are bundled with the Site), and it does not embed third-party iframes."
        },
        {
          "type": "p",
          "text": "We do not set advertising or analytics cookies, and currently the live Site does not set any cookies at all. If any cookies are used in future, they would be strictly necessary or functional in nature, and we would update this policy accordingly."
        }
      ]
    },
    {
      "heading": "5. How We Use Information",
      "blocks": [
        {
          "type": "p",
          "text": "We use the limited information described above for the following purposes:"
        },
        {
          "type": "ul",
          "items": [
            "To read and respond to enquiries you send us, and to follow up on potential or ongoing engagements.",
            "To provide, maintain, secure, and improve our Site and our services.",
            "To communicate with you about your project, proposals, and requests.",
            "To keep records of enquiries and correspondence for ordinary business and record-keeping purposes.",
            "To comply with applicable law, respond to lawful requests, and protect our legal rights."
          ]
        }
      ]
    },
    {
      "heading": "6. Legal Bases for Processing",
      "blocks": [
        {
          "type": "p",
          "text": "The DPDP Act permits the processing of personal data on two footings: with your consent, or for certain specified legitimate uses. We rely on the following, depending on the situation:"
        },
        {
          "type": "ul",
          "items": [
            "Consent (Section 6 of the DPDP Act): when you voluntarily send us a message, for example by sending the pre-filled WhatsApp message, by emailing us, or by otherwise choosing to engage with us, so that we can respond to you. You may withdraw your consent at any time, as described in Section 11.",
            "Certain legitimate uses (Section 7 of the DPDP Act): including where you voluntarily provide your personal data to us for the purpose you are seeking (such as making an enquiry through the contact form or by direct message), and where processing or retention is necessary to comply with applicable law."
          ]
        },
        {
          "type": "p",
          "text": "Where you engage us as a paying client, the processing of personal data for that engagement is governed by the separate signed agreement, statement of work, or service contract between us, rather than by this Site policy alone."
        }
      ]
    },
    {
      "heading": "7. Sharing and Disclosure",
      "blocks": [
        {
          "type": "p",
          "text": "We do not sell your personal data, and we do not share it for third-party advertising. We share information only in the limited circumstances below:"
        },
        {
          "type": "ul",
          "items": [
            "Our hosting provider (Vercel), which acts as a service provider processing standard server request logs on our behalf in order to deliver and secure the Site.",
            "Legal and safety reasons: where disclosure is required by law, regulation, legal process, or a lawful government request, or to establish, exercise, or defend legal claims, or to protect the rights, safety, and property of Studs Agency, our clients, or others."
          ]
        },
        {
          "type": "p",
          "text": "Separately, if you choose to contact us through WhatsApp, your message is delivered through WhatsApp, an independent third-party communication service operated by Meta Platforms. Meta is not a service provider acting on our behalf or under our instructions; it operates the WhatsApp platform under its own terms and privacy policy, as described in Section 3. We do not otherwise disclose your information to third parties without a lawful basis to do so."
        }
      ]
    },
    {
      "heading": "8. Third-Party Services and Links",
      "blocks": [
        {
          "type": "p",
          "text": "The Site relies on and links to certain third-party services whose own terms and privacy policies govern their processing of your information:"
        },
        {
          "type": "ul",
          "items": [
            "WhatsApp / Meta Platforms: an independent third-party communication service used for the contact form handoff described in Section 3. Once you send a message, Meta's privacy terms apply to that message.",
            "Vercel: our hosting provider, which processes standard server logs to deliver and secure the Site.",
            "Instagram and external client websites: our work showcase and \"Brands We Have Worked With\" section link out to Instagram content and to client websites. This content is reached only by outbound links and is not embedded on the Site (there are no third-party iframes or pixels). If you follow these links, you leave our Site and the destination's own privacy practices apply."
          ]
        },
        {
          "type": "p",
          "text": "We are not responsible for the content or privacy practices of third-party sites and services. We encourage you to review their policies before providing information to them."
        }
      ]
    },
    {
      "heading": "9. Data Retention",
      "blocks": [
        {
          "type": "p",
          "text": "Because the contact form does not store your details on our servers, we do not retain form submissions on our website infrastructure. We retain messages and correspondence that you actually send us (for example, through WhatsApp or email) for as long as needed to respond to you, to manage our relationship, and to meet legal, accounting, or record-keeping requirements, after which we delete or anonymise them."
        },
        {
          "type": "p",
          "text": "Server request logs processed by our hosting provider (Vercel) are retained according to Vercel's own retention practices, for operational and security purposes. We do not maintain a separate copy of these logs for our own analysis."
        }
      ]
    },
    {
      "heading": "10. Data Security",
      "blocks": [
        {
          "type": "p",
          "text": "Our primary security control is data minimisation: the contact form stores nothing on our servers, and we keep the amount of personal data we collect deliberately minimal. Our Site is served over encrypted (HTTPS) connections, and we take reasonable technical and organisational measures to protect information in our possession against unauthorised access, use, alteration, and disclosure."
        },
        {
          "type": "p",
          "text": "However, no method of transmission over the internet or method of electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security. Any information you send us through third-party channels such as WhatsApp or email is also subject to the security practices of those providers."
        }
      ]
    },
    {
      "heading": "11. Your Rights",
      "blocks": [
        {
          "type": "p",
          "text": "Subject to applicable law, including the DPDP Act, you as a Data Principal may have the following rights in relation to your personal data:"
        },
        {
          "type": "ul",
          "items": [
            "The right to access a summary of the personal data we process about you and how we process it.",
            "The right to correction, completion, and updating of inaccurate, incomplete, or outdated personal data, and to erasure of your personal data, subject to legal and record-keeping requirements.",
            "The right to grievance redressal in respect of any act or omission regarding our processing of your personal data.",
            "The right of nomination, that is, to nominate another individual to exercise your rights under the DPDP Act in the event of your death or incapacity.",
            "The right to withdraw your consent where we rely on your consent. Withdrawing consent is as easy as giving it: you can contact us at [[CONTACT_EMAIL]] or via WhatsApp. Withdrawal does not affect the lawfulness of processing carried out before withdrawal. After you withdraw consent, we will stop the relevant processing unless we are permitted or required to continue under applicable law. Please note that any message you have already sent through WhatsApp is held on Meta's platform under Meta's own terms, and Meta's retention of that message is outside our control."
          ]
        },
        {
          "type": "p",
          "text": "To exercise any of these rights, please contact us at [[CONTACT_EMAIL]], or through the grievance officer named in Section 12. We may need to verify your identity before acting on a request, and we will respond within the timelines required by applicable law. If you are not satisfied with our response, you may escalate your grievance to the Data Protection Board of India, as provided under the DPDP Act, after exhausting the grievance redressal process described in Section 12."
        }
      ]
    },
    {
      "heading": "12. Grievance Officer and Point of Contact",
      "blocks": [
        {
          "type": "p",
          "text": "In line with the requirements of the DPDP Act, you may raise any concern or complaint about how we handle your personal data with our point of contact for grievance redressal:"
        },
        {
          "type": "ul",
          "items": [
            "Grievance Officer: [[GRIEVANCE_OFFICER_NAME]]",
            "Email: [[CONTACT_EMAIL]]",
            "Address: [[BUSINESS_ADDRESS]]"
          ]
        },
        {
          "type": "p",
          "text": "Until a dedicated Grievance Officer is formally appointed and named above, [[CONTACT_EMAIL]] serves as the point of contact for all grievances and data protection queries. We will acknowledge and work to resolve grievances within the timelines required by applicable law. If your grievance is not satisfactorily resolved by us, you have the right to approach the Data Protection Board of India, as provided under the DPDP Act."
        }
      ]
    },
    {
      "heading": "13. Children's Data",
      "blocks": [
        {
          "type": "p",
          "text": "Our Site and services are intended for businesses and professionals and are not directed to children. We do not knowingly collect personal data from persons under the age of 18. Under the DPDP Act, the personal data of children is subject to additional protections, including requirements around verifiable consent of a parent or lawful guardian."
        },
        {
          "type": "p",
          "text": "Consistent with the DPDP Act, we do not carry out tracking, behavioural monitoring, or targeted advertising directed at children. As explained in Section 4, the Site runs no analytics, tracking, or advertising technology of any kind. If you believe a child has provided us with personal data, please contact us at [[CONTACT_EMAIL]] so we can take appropriate steps to delete it."
        }
      ]
    },
    {
      "heading": "14. International and Cross-Border Processing",
      "blocks": [
        {
          "type": "p",
          "text": "Some of the third-party services we rely on operate globally. Our hosting provider (Vercel) and WhatsApp / Meta may process or store information on servers located outside India. This means that information such as server logs, or a contact message you choose to send through WhatsApp, may be processed in countries other than India."
        },
        {
          "type": "p",
          "text": "The DPDP Act follows a negative-list approach to cross-border transfers: transfers of personal data outside India are generally permitted, except to any country or territory that the Central Government may restrict by notification. Current transfers arising from our use of Vercel and WhatsApp / Meta are carried out on this basis, in accordance with applicable law and any conditions or restrictions notified from time to time, and subject to the privacy terms of those providers."
        }
      ]
    },
    {
      "heading": "15. Changes to This Policy",
      "blocks": [
        {
          "type": "p",
          "text": "We may update this Privacy Policy from time to time to reflect changes in our practices, our Site, or applicable law. When we make material changes, we will update the effective date below and post the revised policy on this page. We encourage you to review this policy periodically."
        },
        {
          "type": "p",
          "text": "Effective date: [[EFFECTIVE_DATE]]."
        }
      ]
    },
    {
      "heading": "16. How to Contact Us",
      "blocks": [
        {
          "type": "p",
          "text": "If you have any questions, requests, or concerns about this Privacy Policy or your personal data, you can reach us at:"
        },
        {
          "type": "ul",
          "items": [
            "Studs Agency, operated by [[ENTITY_NAME]] (Data Fiduciary)",
            "Email: [[CONTACT_EMAIL]]",
            "WhatsApp: +91 85954 81642",
            "Address: [[BUSINESS_ADDRESS]]",
            "Website: www.studsagency.com"
          ]
        }
      ]
    }
  ]
};

export const termsOfService: LegalDocData = {
  "title": "Terms of Service (Terms and Conditions) for Studs Agency",
  "sections": [
    {
      "heading": "1. Acceptance of Terms",
      "blocks": [
        {
          "type": "p",
          "text": "These Terms of Service (the \"Terms\") govern your access to and use of the website located at www.studsagency.com (the \"Website\"), which is operated by [[ENTITY_NAME]], trading as \"Studs Agency\" (\"Studs Agency\", \"we\", \"us\", or \"our\"). Please read these Terms carefully. They include important provisions that affect your legal rights, including disclaimers of warranties (Section 11), a limitation of our liability (Section 13), an indemnity you give to us (Section 14), and a choice of governing law and courts (Section 18)."
        },
        {
          "type": "p",
          "text": "By using the Website in any way that goes beyond merely viewing it, including by submitting the contact form, initiating contact with us through the Website, or otherwise continuing to use the Website after having had the opportunity to read these Terms, you signify that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy, which is incorporated into these Terms by reference. If you do not agree with these Terms, please do not use the Website."
        },
        {
          "type": "p",
          "text": "We may update these Terms from time to time as described in Section 16, and your continued use of the Website after any such update takes effect signifies your acceptance of the revised Terms."
        }
      ]
    },
    {
      "heading": "2. About Studs Agency and This Website",
      "blocks": [
        {
          "type": "p",
          "text": "Studs Agency is a full-stack digital growth and marketing agency based in India. Our services include brand strategy, personal branding, social media and content, performance marketing (including Meta and Google advertising), web development, creative production (video, design, and 3D), AI and business automation, analytics, consulting, and custom software."
        },
        {
          "type": "p",
          "text": "The Website is an informational and marketing website only. It describes who we are and what we do, showcases our work, and provides a way to start a conversation with us. Using the Website, browsing our content, or contacting us through the Website does not, by itself, create any client, agency, retainer, fiduciary, or other professional relationship between you and Studs Agency, and does not oblige either of us to enter into any engagement."
        },
        {
          "type": "p",
          "text": "Any engagement of Studs Agency for services is governed by a separate written agreement, proposal, master services agreement, or Statement of Work (each an \"SOW\") signed or otherwise expressly accepted by both parties. Where any conflict or inconsistency exists between these Terms and such a signed agreement or SOW, the signed agreement or SOW prevails in respect of that engagement. These Terms continue to govern your general use of the Website."
        }
      ]
    },
    {
      "heading": "3. Eligibility",
      "blocks": [
        {
          "type": "p",
          "text": "You must be at least 18 years of age and competent to contract under applicable law to use the Website or to contact us through it. By using the Website, you represent and warrant that you meet this requirement. The Website is intended for a general business audience and is not directed at children."
        },
        {
          "type": "p",
          "text": "If you use the Website or contact us on behalf of a company, firm, or other organisation, you represent and warrant that you are duly authorised to act for and to bind that entity, and references to \"you\" in these Terms include that entity."
        }
      ]
    },
    {
      "heading": "4. Use of the Website and Acceptable Use",
      "blocks": [
        {
          "type": "p",
          "text": "You agree to use the Website only for lawful purposes and in accordance with these Terms. In particular, you agree that you will not:"
        },
        {
          "type": "ul",
          "items": [
            "use the Website in any way that breaches any applicable local, national, or international law or regulation, or that is fraudulent, deceptive, or has any unlawful or harmful purpose or effect;",
            "attempt to gain unauthorised access to, interfere with, damage, or disrupt the Website, the server on which it is stored, or any network, software, or system connected to it;",
            "introduce any virus, worm, malware, or other material that is malicious or technologically harmful;",
            "use any robot, spider, scraper, crawler, or other automated means to access, monitor, harvest, or copy any content or data from the Website, or to place an unreasonable or disproportionate load on our infrastructure, except for legitimate search-engine indexing or as we expressly permit in writing;",
            "reproduce, duplicate, copy, resell, or otherwise commercially exploit any part of the Website except as expressly permitted under these Terms;",
            "attempt to reverse engineer, decompile, or extract the source code or underlying structure of any part of the Website, except to the extent such restriction is prohibited by law; or",
            "use the Website to transmit unsolicited communications, to impersonate any person or entity, or to misrepresent your affiliation with any person or entity."
          ]
        },
        {
          "type": "p",
          "text": "The Website offers a contact form (\"Let's talk\") that collects your name, brand or role, and a free-text message. Please note that this form does not transmit your information to any Studs Agency server or database. When you choose to send, the form opens your own WhatsApp application with a pre-filled message addressed to our WhatsApp number (+91 85954 81642), and you decide whether to actually send it. We receive your information only if and when you choose to send that message through WhatsApp. WhatsApp is operated by Meta Platforms, and its own terms and privacy practices apply to that message. Our handling of information is described further in our Privacy Policy."
        }
      ]
    },
    {
      "heading": "5. Intellectual Property",
      "blocks": [
        {
          "type": "p",
          "text": "The Website and its content, including but not limited to text, graphics, layouts, designs, the \"Studs Agency\" name, logo, and brand, user interfaces, illustrations, photographs, video, 3D assets, code, and other materials created by or for Studs Agency (together, the \"Content\"), are owned by Studs Agency or its licensors and are protected by copyright, trade mark, and other intellectual property laws. All rights not expressly granted are reserved."
        },
        {
          "type": "p",
          "text": "For the avoidance of doubt, the Content does not include third-party names, brands, trade marks, or logos that are displayed on the Website to identify clients or work. Those marks remain the property of their respective owners and are addressed in Section 6."
        },
        {
          "type": "p",
          "text": "Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, and revocable licence to access and view the Content for the purpose of learning about and evaluating Studs Agency and its services, and for your own internal reference. Except as reasonably necessary for that purpose, you must not copy, reproduce, republish, distribute, modify, adapt, create derivative works from, publicly display, or otherwise exploit any Content, in whole or in part, for any commercial purpose without our prior written consent."
        },
        {
          "type": "p",
          "text": "Nothing on the Website transfers to you any right, title, or interest in any intellectual property, whether by implication, estoppel, or otherwise. Rights in deliverables created under a client engagement are dealt with separately in the applicable signed agreement or SOW."
        }
      ]
    },
    {
      "heading": "6. Portfolio and Client-Work Display",
      "blocks": [
        {
          "type": "p",
          "text": "The Website displays and describes work that we have performed, including a \"Brands We Have Worked With\" section and a showcase of selected projects and samples. Unless a separate signed agreement expressly provides otherwise, Studs Agency may display, reference, and describe work that it has performed for clients, and may show client names, logos, project descriptions, and results, in its portfolio, case studies, Website, social media, presentations, and other marketing materials."
        },
        {
          "type": "p",
          "text": "Third-party names, brands, trade marks, and logos shown on the Website are the property of their respective owners and are used solely to identify past or current work and for reference and identification purposes. Their display does not imply any endorsement, sponsorship, partnership, or affiliation beyond the work actually performed, and does not grant you any right to use those marks."
        },
        {
          "type": "p",
          "text": "External links in the showcase, including links to Instagram and to client websites, point to third-party platforms and are provided for reference only, as further described in Section 10."
        }
      ]
    },
    {
      "heading": "7. No Guarantee of Results",
      "blocks": [
        {
          "type": "p",
          "text": "Marketing, branding, growth, engagement, reach, search ranking, follower, lead, conversion, and revenue outcomes depend on numerous factors that are outside our control. These include, among others, market conditions, competition, platform algorithms and policies, third-party ad networks, your product or service, your pricing, your team's execution, budgets, timing, and the conduct of third parties."
        },
        {
          "type": "p",
          "text": "Accordingly, nothing on the Website, and no example, sample, case study, or figure shown, is a promise, guarantee, or warranty of any specific result or outcome. Past performance is not indicative of future results. Any performance targets, projections, or estimates relating to a specific engagement, if agreed at all, will be set out in the applicable signed agreement or SOW and are subject to its terms."
        }
      ]
    },
    {
      "heading": "8. Non-Exclusivity, Concurrent Clients, and Conflicts",
      "blocks": [
        {
          "type": "p",
          "text": "This section explains, in plain terms, how Studs Agency works as a professional services agency. It applies to your use of the Website. The binding conflict-of-interest, exclusivity, and confidentiality arrangements for any actual engagement are those set out in the applicable signed agreement or SOW, which is the instrument a client accepts and which prevails over this section for that engagement. This section records the general basis on which we operate and are willing to discuss providing services."
        },
        {
          "type": "h3",
          "text": "8.1 Every engagement is non-exclusive by default"
        },
        {
          "type": "p",
          "text": "Unless a separate signed agreement expressly and specifically states otherwise in writing, every engagement with Studs Agency is non-exclusive. Nothing restricts, and nothing shall be construed to restrict, Studs Agency from providing the same, similar, or competing services to any other person or entity at any time."
        },
        {
          "type": "h3",
          "text": "8.2 Multiple, concurrent, and connected clients"
        },
        {
          "type": "p",
          "text": "Studs Agency provides services to many clients across many industries, and may act for multiple clients at the same time, including clients who compete or may in future compete with one another. We have worked with, currently work with, and may in the future work with a wide range of brands, businesses, creators, organisations, and individuals, and may commence, continue, decline, pause, resume, or end any such relationship at our discretion, subject to the terms of any applicable signed agreement or SOW. A given client's own clients, customers, partners, employees, vendors, suppliers, affiliates, group companies, investors, or other connected persons may themselves also be, or may previously have been, clients of Studs Agency. You acknowledge that this is an ordinary and expected feature of how an agency of our kind operates."
        },
        {
          "type": "h3",
          "text": "8.3 No fiduciary duty or duty of exclusivity from concurrent work"
        },
        {
          "type": "p",
          "text": "The existence of concurrent, overlapping, past, continuing, resumed, or connected relationships does not, by itself, create any fiduciary duty, any duty of exclusivity, or any conflict of interest, and does not by itself constitute a breach of any duty or any wrongdoing on the part of Studs Agency."
        },
        {
          "type": "h3",
          "text": "8.4 Confidentiality is maintained regardless"
        },
        {
          "type": "p",
          "text": "Notwithstanding that we serve multiple, competing, or connected clients, Studs Agency keeps each client's confidential information confidential in accordance with Section 9 and any applicable signed agreement, and will not misuse one client's confidential information for the benefit of another. The act of serving multiple or connected clients does not, by itself, breach any duty of confidentiality or any other duty owed to any client."
        },
        {
          "type": "h3",
          "text": "8.5 General knowledge, skills, and residuals"
        },
        {
          "type": "p",
          "text": "Studs Agency remains free to use, for any client, the general knowledge, skills, experience, ideas, concepts, know-how, techniques, and methodologies that it acquires or develops in the course of its work, including information retained in the unaided memory of its personnel. Confidentiality obligations attach only to specifically identified confidential information as described in Section 9, and not to such general learning. The use of general knowledge, skills, and residuals of this kind is not a breach of any duty owed to any client."
        },
        {
          "type": "h3",
          "text": "8.6 Notice mechanism"
        },
        {
          "type": "p",
          "text": "If a client believes that any actual, potential, or perceived conflict of interest affects it, the client should promptly notify Studs Agency in writing at [[CONTACT_EMAIL]], giving reasonable particulars, so that the matter can be discussed and, where reasonable and lawful, managed by appropriate means. We will consider any such notice in good faith. Giving or not giving such a notice does not, by itself, create any liability on the part of Studs Agency, and our sole obligation in respect of a notice is to consider it in good faith. Nothing in this section requires Studs Agency to decline, restrict, or end any other relationship, except to the extent (if any) expressly agreed in writing following such a notice."
        },
        {
          "type": "h3",
          "text": "8.7 Acknowledgement"
        },
        {
          "type": "p",
          "text": "You acknowledge that you have read and understood this section, that Studs Agency has made the disclosure set out here, and that you have had the opportunity to consider it. To the fullest extent permitted by applicable law, you accept that Studs Agency may operate on the basis described in this section. This section does not override any specific, written conflict, confidentiality, or exclusivity arrangement expressly agreed in a signed agreement or SOW, and any binding waiver, consent, or release relating to a specific engagement will be the one set out in that signed agreement or SOW."
        }
      ]
    },
    {
      "heading": "9. Confidentiality",
      "blocks": [
        {
          "type": "p",
          "text": "From time to time, in the course of discussions or an engagement, either party may disclose to the other information that is marked as confidential or that a reasonable person would understand to be confidential given its nature or the circumstances of disclosure (\"Confidential Information\"). Each party agrees to keep the other's Confidential Information confidential, to use it only for the purpose for which it was disclosed, and not to disclose it to third parties except to its personnel and advisers who need to know it and who are bound by comparable obligations, or as required by law or a competent authority."
        },
        {
          "type": "p",
          "text": "Confidential Information does not include information that is or becomes public through no fault of the receiving party, was lawfully known to the receiving party without a duty of confidentiality before disclosure, is independently developed without use of the other party's Confidential Information, or is lawfully obtained from a third party without restriction. It also does not extend to the general knowledge, skills, experience, and residuals described in Section 8.5. Confidentiality obligations relating to a specific engagement are further set out in the applicable signed agreement or SOW, which prevails in case of conflict."
        }
      ]
    },
    {
      "heading": "10. Third-Party Links and Services",
      "blocks": [
        {
          "type": "p",
          "text": "The Website may contain links to third-party websites, platforms, and services, including Instagram and client websites, and may reference third-party products or services. These links and references are provided for your convenience and for identification of our work only."
        },
        {
          "type": "p",
          "text": "We do not control, and are not responsible for, the content, products, services, availability, accuracy, or privacy or other practices of any third-party website or service. The inclusion of any link or reference does not imply our endorsement of it. Your access to and use of any third-party website or service is at your own risk and is governed by that third party's own terms and policies. We encourage you to review those terms and policies before using any third-party website or service."
        }
      ]
    },
    {
      "heading": "11. Disclaimers",
      "blocks": [
        {
          "type": "p",
          "text": "To the fullest extent permitted by applicable law, the Website and all Content are provided on an \"as is\" and \"as available\" basis, without warranties, representations, or conditions of any kind, whether express, implied, or statutory. Without limiting the foregoing, we disclaim all implied warranties of merchantability, fitness for a particular purpose, title, accuracy, and non-infringement."
        },
        {
          "type": "p",
          "text": "We do not warrant that the Website will be uninterrupted, timely, secure, or error-free, that defects will be corrected, that the Website is free of viruses or other harmful components, or that the Content is complete, current, or accurate. Any reliance you place on the Content is at your own risk. Nothing in this section limits or excludes any liability that cannot be limited or excluded under applicable law."
        }
      ]
    },
    {
      "heading": "12. Availability, Modification, and Suspension of the Website",
      "blocks": [
        {
          "type": "p",
          "text": "The Website is provided free of charge and for information only. We reserve the right, at any time and without notice or liability, to change, update, correct, suspend, withdraw, restrict, or discontinue the Website or any part of it, including any Content or feature, and to change the technology on which it runs. We do not guarantee that the Website, or any part of it, will always be available or be uninterrupted."
        },
        {
          "type": "p",
          "text": "We may also restrict or suspend your access to the Website, in whole or in part, if we reasonably believe that you have breached these Terms or applicable law, or to protect the Website, our users, or our legitimate interests. These rights are in addition to any other rights or remedies available to us."
        }
      ]
    },
    {
      "heading": "13. Limitation of Liability",
      "blocks": [
        {
          "type": "p",
          "text": "To the fullest extent permitted by applicable law, Studs Agency, together with its owners, directors, partners, employees, contractors, and agents, shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, or for any loss of profits, revenue, business, goodwill, data, anticipated savings, or opportunity, arising out of or in connection with your access to or use of, or inability to use, the Website or any Content, whether based in contract, tort (including negligence), statute, or any other legal theory, and whether or not we have been advised of the possibility of such damages."
        },
        {
          "type": "p",
          "text": "To the fullest extent permitted by applicable law, our total aggregate liability arising out of or in connection with the Website and these Terms shall not exceed one thousand Indian Rupees (INR 1,000). Where that limit is held to be invalid or unenforceable, our liability shall instead be limited to the smallest sum permitted by applicable law. Liability arising out of a specific client engagement is governed by, and subject to any separate limitation of liability set out in, the applicable signed agreement or SOW, and is not addressed by this Section 13."
        },
        {
          "type": "p",
          "text": "The exclusions and limitations in this Section 13, and the exclusions in Section 14, are given for the benefit of Studs Agency and of each of its owners, directors, partners, employees, contractors, and agents. Studs Agency holds the benefit of these provisions for and on behalf of, and as agent and trustee for, those individuals, so that they may each rely on them. You agree that you will not bring any claim personally against any such individual in respect of any matter for which Studs Agency's liability is excluded or limited under these Terms, and that any claim you may have will be brought against Studs Agency alone."
        },
        {
          "type": "p",
          "text": "Nothing in these Terms excludes or limits our liability to the extent that such exclusion or limitation is not permitted by applicable law, including liability for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited. Where liability cannot be excluded but can be limited, our liability is limited to the maximum extent permitted by law."
        }
      ]
    },
    {
      "heading": "14. Indemnity",
      "blocks": [
        {
          "type": "p",
          "text": "You agree to indemnify and hold harmless Studs Agency and its owners, directors, partners, employees, contractors, and agents from and against any and all claims, demands, actions, liabilities, losses, damages, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your breach of these Terms; (b) your misuse of the Website; (c) your violation of any applicable law or of the rights of any third party; and (d) any content, information, or materials you supply to us or submit through the Website, including any claim that such content infringes or misappropriates the rights of any third party or is unlawful."
        },
        {
          "type": "p",
          "text": "We may, at our option and expense, assume and control the defence and settlement of any claim for which you are obliged to indemnify us, in which case you agree to cooperate reasonably with us in that defence. You shall not settle or compromise any such claim, or make any admission of liability in respect of it, without our prior written consent. Our exercise or non-exercise of this right does not relieve you of your indemnity obligations."
        },
        {
          "type": "p",
          "text": "Indemnity obligations relating to a specific engagement are set out in the applicable signed agreement or SOW, which prevails in case of conflict."
        }
      ]
    },
    {
      "heading": "15. Privacy",
      "blocks": [
        {
          "type": "p",
          "text": "Your use of the Website is also governed by our Privacy Policy, which explains how information is handled in connection with the Website, including the contact form's WhatsApp-based mechanism and standard hosting-level processing by our hosting provider. Please review the Privacy Policy carefully. By using the Website, you acknowledge that you have read and understood it. In respect of personal data, we act in accordance with applicable Indian law, including the Digital Personal Data Protection Act, 2023. Questions or complaints about the Website or about privacy may be raised using the contact details in Section 19, and the Privacy Policy sets out the specific route for privacy-related grievances."
        }
      ]
    },
    {
      "heading": "16. Changes to These Terms",
      "blocks": [
        {
          "type": "p",
          "text": "We may revise these Terms from time to time to reflect changes in our practices, technology, legal requirements, or for other legitimate reasons. When we do, we will update the text below and revise the effective date. The version published on the Website is the version that applies."
        },
        {
          "type": "p",
          "text": "These Terms are effective as of [[EFFECTIVE_DATE]]. Your continued access to or use of the Website after any update takes effect signifies your acceptance of the revised Terms. If you do not agree to the revised Terms, you should stop using the Website."
        }
      ]
    },
    {
      "heading": "17. General",
      "blocks": [
        {
          "type": "h3",
          "text": "17.1 Severability"
        },
        {
          "type": "p",
          "text": "Each provision of these Terms operates separately. If any provision, or any part of a provision, is held by a court or other competent authority to be invalid, unlawful, or unenforceable, that provision or part shall, to the extent possible, be read down and enforced so as to give effect to the parties' intention to the maximum extent permitted by law. This applies in particular to the disclaimers in Section 11 and the limitation of liability in Section 13, which shall be read down to the least restrictive extent needed to make them valid. If a provision or part cannot be so read down, it shall be severed and deemed deleted, and its deletion shall not affect the validity and enforceability of the rest of these Terms."
        },
        {
          "type": "h3",
          "text": "17.2 No waiver"
        },
        {
          "type": "p",
          "text": "No failure or delay by Studs Agency in exercising any right or remedy under these Terms shall operate as a waiver of that or any other right or remedy, and no single or partial exercise of any right or remedy shall prevent any further exercise of it. Any waiver must be in writing to be effective and applies only to the specific matter for which it is given."
        },
        {
          "type": "h3",
          "text": "17.3 Assignment"
        },
        {
          "type": "p",
          "text": "We may assign, transfer, novate, subcontract, or otherwise deal with any or all of our rights and obligations under these Terms, including in connection with a merger, acquisition, restructuring, or sale of business or assets, without your consent. You may not assign or transfer any of your rights or obligations under these Terms without our prior written consent."
        },
        {
          "type": "h3",
          "text": "17.4 Entire agreement"
        },
        {
          "type": "p",
          "text": "These Terms, together with the Privacy Policy, constitute the entire agreement between you and Studs Agency in relation to your use of the Website, and supersede all prior representations, understandings, and agreements relating to that use, whether written or oral. Nothing in this section limits or excludes liability for fraud or fraudulent misrepresentation. Any client engagement is governed by its own signed agreement or SOW, which prevails as described in Section 2."
        },
        {
          "type": "h3",
          "text": "17.5 Survival"
        },
        {
          "type": "p",
          "text": "Any provision of these Terms that by its nature is intended to continue after you stop using the Website shall survive, including Section 5 (Intellectual Property), Section 8 (Non-Exclusivity, Concurrent Clients, and Conflicts), Section 9 (Confidentiality), Section 11 (Disclaimers), Section 13 (Limitation of Liability), Section 14 (Indemnity), this Section 17, and Section 18 (Governing Law and Jurisdiction)."
        },
        {
          "type": "h3",
          "text": "17.6 Relationship of the parties"
        },
        {
          "type": "p",
          "text": "Nothing in these Terms creates any partnership, joint venture, agency, employment, or fiduciary relationship between you and Studs Agency."
        }
      ]
    },
    {
      "heading": "18. Governing Law and Jurisdiction",
      "blocks": [
        {
          "type": "p",
          "text": "These Terms and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with them, the Website, or their subject matter or formation, are governed by and construed in accordance with the laws of India."
        },
        {
          "type": "p",
          "text": "Subject to any dispute resolution provisions in an applicable signed agreement or SOW, you and Studs Agency agree that the courts at [[JURISDICTION_CITY]], India shall have exclusive jurisdiction to settle any such dispute or claim."
        }
      ]
    },
    {
      "heading": "19. Contact",
      "blocks": [
        {
          "type": "p",
          "text": "If you have any questions about these Terms or the Website, you can contact us using the details below:"
        },
        {
          "type": "ul",
          "items": [
            "Entity: [[ENTITY_NAME]], trading as \"Studs Agency\"",
            "Website: www.studsagency.com",
            "Email: [[CONTACT_EMAIL]]",
            "WhatsApp: +91 85954 81642",
            "Address: [[BUSINESS_ADDRESS]]"
          ]
        }
      ]
    }
  ]
};
