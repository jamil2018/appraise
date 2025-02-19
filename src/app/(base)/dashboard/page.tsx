"use client";
import React, { useEffect, useState } from "react";
import MultiSelectWithPreview from "@/components/ui/multi-select-with-preview";
import PageHeader from "@/components/typography/page-header";
import HeaderSubtitle from "@/components/typography/page-header-subtitle";

const Dashboard = () => {
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectedTestCases);
  }, [selectedTestCases]);
  return (
    <div>
      <div className="mb-8">
        <PageHeader>Dashboard</PageHeader>
        <HeaderSubtitle>
          Welcome to the dashboard. Here you can see your test suites and run
          them.
        </HeaderSubtitle>
      </div>
      <MultiSelectWithPreview
        options={[
          {
            value: "1",
            label: "Validate user is able to login with valid credentials",
          },
          {
            value: "2",
            label: "Validate user is able to login with invalid credentials",
          },
          {
            value: "3",
            label: "Validate user is able to logout",
          },
          {
            value: "4",
            label: "Validate user is able to reset password",
          },
        ]}
        placeholder="Test cases"
        emptyMessage="No test cases found"
        selectedLabel="Selected test cases"
        onSelectChange={(value) => {
          setSelectedTestCases(value);
        }}
      />
    </div>
  );
};

export default Dashboard;
