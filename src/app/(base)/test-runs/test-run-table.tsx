import {
  getTestRunsAction,
  deleteTestRunAction,
  TestRunsWithRelations,
} from "@/actions/test-run/test-run-actions";
import { DataTable } from "@/components/ui/data-table";
import { testRunTableCols } from "./test-run-table-columns";

const TestRunTable = async () => {
  const { data: testRuns } = await getTestRunsAction();
  return (
    <>
      <DataTable
        columns={testRunTableCols}
        data={testRuns as TestRunsWithRelations[]}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        createLink="/test-runs/create"
        modifyLink="/test-runs/modify"
        deleteAction={deleteTestRunAction}
      />
    </>
  );
};

export default TestRunTable;
