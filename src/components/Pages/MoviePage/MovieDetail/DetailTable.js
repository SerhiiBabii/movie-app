import React from "react";
import { Col, Table } from "reactstrap";

const DetailTable = ({ details }) => {
  return (
    <Col>
      <Col className="mt-4">
        <Table>
          <tbody>
            <tr>
              <th scope="row">Статус:</th>
              <td>{details.status}</td>
            </tr>
            <tr>
              <th scope="row">Дата выхода:</th>
              <td>{details.release_date}</td>
            </tr>
            <tr>
              <th scope="row">Продолжительность:</th>
              <td>{details.runtime} мин</td>
            </tr>
            <tr>
              <th scope="row">Язык оригинала:</th>
              <td>{details.original_language}</td>
            </tr>
            <tr>
              <th scope="row">Страна:</th>
              <td>
                {details.production_countries
                  ? details.production_countries.map(item => {
                      return item.name;
                    })
                  : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Бюджет:</th>
              <td>{details.budget}$</td>
            </tr>
            <tr>
              <th scope="row">Сборы:</th>
              <td>{details.revenue}$</td>
            </tr>
            <tr>
              <th scope="row">Компания:</th>
              <td>
                {details.production_companies
                  ? details.production_companies.map(item => {
                      return item.name + ", ";
                    })
                  : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Жанры:</th>
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
