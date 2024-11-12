import React from "react";
import { Col, Table } from "reactstrap";

const DetailTable = ({ details }) => {
  return (
    <Col>
      <Col className="mt-4">
        <Table>
          <tbody>
            <tr>
              <th scope="row">Status:</th>
              <td>{details.status}</td>
            </tr>
            <tr>
              <th scope="row">Release date:</th>
              <td>{details.release_date}</td>
            </tr>
            <tr>
              <th scope="row">Duration:</th>
              <td>{details.runtime} min</td>
            </tr>
            <tr>
              <th scope="row">Original language:</th>
              <td>{details.original_language}</td>
            </tr>
            <tr>
              <th scope="row">Country:</th>
              <td>
                {details.production_countries
                  ? details.production_countries.map(item => {
                    return item.name;
                  })
                  : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Budget:</th>
              <td>{details.budget}$</td>
            </tr>
            <tr>
              <th scope="row">Fees:</th>
              <td>{details.revenue}$</td>
            </tr>
            <tr>
              <th scope="row">Company:</th>
              <td>
                {details.production_companies
                  ? details.production_companies.map(item => {
                    return item.name + ", ";
                  })
                  : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Genres:</th>
              <td>
                {details.genres
                  ? details.genres.map(item => {
                    return item.name + " ";
                  })
                  : null}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Col>
  );
};

export default DetailTable;
