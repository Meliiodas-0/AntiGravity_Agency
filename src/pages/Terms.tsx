import { useEffect } from "react";
import LegalLayout from "@/components/LegalLayout";
import LegalDoc from "@/components/LegalDoc";
import { termsOfService, legalMeta } from "@/content/legal";

export default function Terms() {
  useEffect(() => {
    document.title = `Terms of Service | ${legalMeta.tradeName}`;
  }, []);

  return (
    <LegalLayout>
      <LegalDoc doc={termsOfService} />
    </LegalLayout>
  );
}
