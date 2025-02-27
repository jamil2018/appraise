import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { reviewTableByReviewerCols } from "./review-table-by-reviewer-columns";
import {
  getReviewsByReviewerAction,
  deleteReviewAction,
  ReviewWithRelations,
} from "@/actions/review/review-actions";

const ReviewTableByReviewer = async () => {
  const { data: reviews } = await getReviewsByReviewerAction();

  return (
    <>
      <DataTable
        columns={reviewTableByReviewerCols}
        data={reviews as ReviewWithRelations[]}
        filterColumn="id"
        filterPlaceholder="Filter by id..."
        modifyLink="/reviews/review"
        deleteAction={deleteReviewAction}
      />
    </>
  );
};

export default ReviewTableByReviewer;
