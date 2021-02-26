import React, { useMemo } from "react";
import Table from "../Quiz/Table/Table";

const ReportTable = ({ report }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Reports",
        columns: [
          {
            Header: "Quiz name",
            accessor: "attempt.quiz_name",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return <h1>{row.original.quiz_name}</h1>;
            },
          },
          {
            Header: "User name",
            accessor: "attempt.first_name",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return (
                <h1>
                  {row.original.first_name + " " + row.original.last_name}
                </h1>
              );
            },
          },
          {
            Header: "Email",
            accessor: "attempt.email",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return <h1>{row.original.email}</h1>;
            },
          },
          {
            Header: "Correct answers",
            accessor: "attempt.correct_answers_count",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return (
                <h1 className="text-center mr-8">
                  {row.original.correct_answers}
                </h1>
              );
            },
          },
          {
            Header: "Incorrect answers",
            accessor: "attempt.incorrect_answers_count",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return (
                <h1 className="text-center mr-8">
                  {row.original.incorrect_answers}
                </h1>
              );
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Table data={report} columns={columns} />
    </>
  );
};

export default ReportTable;
