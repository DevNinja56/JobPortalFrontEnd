import React, { useEffect } from "react";
import AdminLayout from "../../../layout/AdminLayout";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch } from "react-redux";
import { changeHeading } from "../../../../features/HeaderHeading/HeaderHeadingSlice";

interface Column {
  id:
    | "fullName"
    | "email"
    | "profession"
    | "phone"
    | "linkedIn"
    | "portFolio"
    | "createdAt"
    | "isAdmin";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "fullName", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },

  {
    id: "profession",
    label: "Profession",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "linkedIn",
    label: "LinkedIn",
    minWidth: 170,
  },
  {
    id: "createdAt",
    label: "Member Since",
    minWidth: 170,
  },
  {
    id: "isAdmin",
    label: "isAdmin",
    minWidth: 170,
  },
];

interface Data {
  fullName: string;
  email: string;

  profession: string;
  phone: string;
  linkedIn: string;
  portFolio: string;
  createdAt: string;
  isAdmin: string;
}

function createData(
  fullName: string,
  email: string,

  profession: string,
  phone: string,
  linkedIn: string,
  portFolio: string,
  createdAt: string,
  isAdmin: string
): Data {
  return {
    fullName,
    email,

    profession,
    phone,
    linkedIn,
    portFolio,
    createdAt,
    isAdmin,
  };
}

type Props = {};

const UserListingPage = (props: Props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowState, setRowState] = React.useState<Data[]>([]);
  const dispatch = useDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const APIURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : process.env.REACT_APP_API_URL;

  useEffect(() => {
    dispatch(changeHeading(`User Listings`));
    fetch(`${APIURL}/api/users`)
      .then((snap) => snap.json())
      .then((res) => {
        res.data.map((item: Data) =>
          setRowState((prev) => [
            ...prev,
            createData(
              item.fullName,
              item.email,
              item.profession ? item.profession : "Not updated",
              item.phone ? item.phone : "Not updated",
              item.linkedIn ? item.linkedIn : "Not updated",
              item.portFolio ? item.portFolio : "Not updated",
              item.createdAt ? new Date(item.createdAt).toDateString() : "N/A",
              item.isAdmin ? "Yes" : "No"
            ),
          ])
        );
      })
      .catch(() => alert("something went wrong"));

    return () => {
      setRowState([]);
    };
  }, []);

  return (
    <AdminLayout>
      <>
        <div className="userListing">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowState
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.email}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rowState.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </>
    </AdminLayout>
  );
};

export default UserListingPage;
