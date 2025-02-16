import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { reviewTableCols } from "./review-table-columns";
import {
  getAllReviewsAction,
  deleteReviewAction,
  ReviewWithRelations,
} from "@/actions/review/review-actions";

const ReviewTable = async () => {
  const { data: reviews } = await getAllReviewsAction();

  return (
    <>
      <DataTable
        columns={reviewTableCols}
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

export default ReviewTable;
