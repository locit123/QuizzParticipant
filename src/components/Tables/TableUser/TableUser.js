import Table from "react-bootstrap/Table";
import { getParticipantState } from "../../../store/selector";
import { useSelector } from "react-redux";
import LoadingTableUser from "./LoadingTableUser";
import ReactPaginate from "react-paginate";
function TableUser({ currentPage, setCurrentPage, setShow }) {
  console.log(currentPage, "<<");
  const getState = useSelector(getParticipantState);
  const { dataGetParticipant } = getState;
  const data = dataGetParticipant?.users;
  const totalPages = dataGetParticipant?.totalPages;

  const handlePageChange = (s) => {
    setCurrentPage(s.selected + 1);
  };
  return (
    <>
      <Table striped bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Image</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <LoadingTableUser item={item} key={index} setShow={setShow} />
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Data</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName="page-tem"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        forcePage={currentPage - 1}
      />
    </>
  );
}

export default TableUser;
