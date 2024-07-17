import { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getQuizAll } from "../../../../api/apiQuiz/fetchApiQuiz";
import "./TableLayoutQuiz.scss";
import ReactPaginate from "react-paginate";

function TableLayoutQuiz({
  setShow,
  setStatusClick,
  listDataQuiz,
  setListDataQuiz,
  setName,
  setDescription,
  setDifficulty,
  setQuizImage,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };
  const getApiQuizAll = useCallback(async () => {
    await getQuizAll("all", setListDataQuiz);
  }, [setListDataQuiz]);

  useEffect(() => {
    getApiQuizAll();
  }, [getApiQuizAll]);

  /**********************************************PHAN PAGE************************************ */
  const itemPage = 5;
  const offset = currentPage * itemPage;

  const newListDataQuiz = listDataQuiz?.slice(offset, offset + itemPage);
  const totalPages = Math.ceil(listDataQuiz.length / itemPage);

  const handleClickDelete = (id, name) => {
    setShow(true);
    setStatusClick(["delete", id, name]);
  };

  const handleClickEdit = (item) => {
    setShow(true);
    setStatusClick(["edit", item.id]);
    setName(item.name);
    setDescription(item.description);
    setDifficulty(item.difficulty);
    setQuizImage(`data:image/jpeg;base64,${item.image}`);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newListDataQuiz?.length > 0 ? (
            newListDataQuiz?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>

                  <td>{item.description}</td>
                  <td>
                    {item.image ? (
                      <div className="img">
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt="img"
                        />
                      </div>
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDelete(item.id, item.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Data Quizzes</td>
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
        forcePage={currentPage}
      />
    </>
  );
}

export default TableLayoutQuiz;
