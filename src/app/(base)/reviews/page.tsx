import React, { Suspense } from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import Loading from "@/components/ui/loading";
import ReviewTable from "./review-table";

const Reviews = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>Reviews</PageHeader>
        <HeaderSubtitle>
          Reviews are ways to fine-tune your test cases and test suites through
          your peers
        </HeaderSubtitle>
      </div>
      <Suspense fallback={<Loading />}>
        <ReviewTable />
      </Suspense>
    </>
  );
};

export default Reviews;
