import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import LegalDoc from "@/components/LegalDoc";
import { privacyPolicy, legalMeta } from "@/content/legal";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = `Privacy Policy | ${legalMeta.tradeName}`;
  }, []);

  return (
    <LegalLayout>
      <LegalDoc doc={privacyPolicy} />
    </LegalLayout>
  );
}
