import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { reviewTableByCreatorCols } from "./review-table-by-creator-columns";
import {
  getAllReviewsByCreatorAction,
  deleteReviewAction,
  ReviewWithRelations,
} from "@/actions/review/review-actions";

const ReviewTableByCreator = async () => {
  const { data: reviews } = await getAllReviewsByCreatorAction();

  return (
    <>
      <DataTable
        columns={reviewTableByCreatorCols}
        data={reviews as ReviewWithRelations[]}
        filterColumn="id"
        filterPlaceholder="Filter by id..."
        createLink="/reviews/create"
        modifyLink="/reviews/modify"
        deleteAction={deleteReviewAction}
      />
    </>
  );
};

export default ReviewTableByCreator;
