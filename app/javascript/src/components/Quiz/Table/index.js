import React, { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import Table from "./Table";

const TableData = ({ quizData, destroyQuiz }) => {
  const history = useHistory();

  const columns = useMemo(
    () => [
      {
        Header: "List of quizzes",
        columns: [
          {
            Header: "Quiz name",
            accessor: "quiz.title",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return (
                <Link
                  to={`/quizzes/${row.original.id}/show`}
                  className="hover:font-bold hover:underline"
                >
                  {row.original.title}
                </Link>
              );
            },
          },
          {
            Header: "Actions",
            accessor: "Edit",
            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
              return (
                <>
                  <button
                    className="text-xl text-center text-bb-border
                    transition duration-300 ease-in-out
                    ri-delete-bin-5-line hover:text-bb-yellow mr-2"
                    onClick={() => updateQuiz(row.original.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xl text-center text-bb-border
                    transition duration-300 ease-in-out
                    ri-delete-bin-5-line hover:text-bb-red"
                    onClick={() =>
                      window.confirm(
                        "Are you sure you wish to clear the page?"
                      ) && destroyQuiz(row.original.id)
                    }
                  >
                    Delete
                  </button>
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );

  const updateQuiz = id => {
    history.push(`/quizzes/${id}/edit`);
  };

  return <Table columns={columns} data={quizData} />;
};

export default TableData;
