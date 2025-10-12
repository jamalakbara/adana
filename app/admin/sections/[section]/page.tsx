import { SectionPageClient } from "./SectionPageClient";

export default function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  return <SectionPageClient paramsPromise={params} />;
}

