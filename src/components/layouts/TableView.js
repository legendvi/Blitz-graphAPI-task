import "bootstrap/dist/css/bootstrap.min.css";
const TableView = (props) => {
  return (
    <div className="col-lg-8 col-md-6 center" id="main_div">
      <center>
        <table className="table table-hover border border-secondary">
          <thead>
            <tr className="table-dark">
              <th>Rank</th>
              <th>Name</th>
              <th>Last Modified</th>
              <th>Web Url</th>
            </tr>
          </thead>
          <tbody id="tbody">{props.searchItems}</tbody>
        </table>
      </center>
    </div>
  );
};

export default TableView;
