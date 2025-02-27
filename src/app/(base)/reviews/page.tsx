import React, { Suspense } from "react";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";
import Loading from "@/components/ui/loading";
import { ScanEye } from "lucide-react";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import ReviewTableByCreator from "./created-reviews-table";
import ReviewTableByReviewer from "./reviewer-reviews-table";
const Reviews = () => {
  return (
    <>
      <div className="mb-8">
        <PageHeader>
          <span className="flex items-center">
            <ScanEye className="w-8 h-8 mr-2" />
            Reviews
          </span>
        </PageHeader>
        <HeaderSubtitle>
          Reviews are ways to fine-tune your test cases and test suites through
          your peers
        </HeaderSubtitle>
      </div>
      <Tabs defaultValue="created">
        <TabsList>
          <TabsTrigger value="created">Created by you</TabsTrigger>
          <TabsTrigger value="assigned">Assigned to you</TabsTrigger>
        </TabsList>
        <TabsContent value="created" className="mt-4">
          <h3 className="text-md font-bold">Created reviews</h3>
          <p className="text-sm text-muted-foreground">
            Reviews that have been created by you
          </p>
          <Suspense fallback={<Loading />}>
            <ReviewTableByCreator />
          </Suspense>
        </TabsContent>
        <TabsContent value="assigned" className="mt-4">
          <h3 className="text-md font-bold">Assigned reviews</h3>
          <p className="text-sm text-muted-foreground">
            Reviews that have been assigned to you by other users
          </p>
          <Suspense fallback={<Loading />}>
            <ReviewTableByReviewer />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Reviews;
