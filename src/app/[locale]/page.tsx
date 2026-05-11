import MainPageView from "@/views/main-page/main-page-view";
import { buildHomeMetadata } from "@/lib/seo/page-metadata";

export function generateMetadata() {
    return buildHomeMetadata();
}

export default function Home() {
    return <MainPageView />;
}
