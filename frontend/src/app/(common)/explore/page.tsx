import Container from "@/components/layout/Container";
import ExploreFilterBox from "@/components/pages/explore/ExploreFilterBox";
import ExploreResults from "@/components/pages/explore/ExploreResults";

function page() {
  return (
    <div className="min-h-screen">
      <ExploreFilterBox />
      <ExploreResults/>
    </div>
  );
}

export default page;
