import React, { Component } from "react";
import Credits from "./Credits/Credits";
import Video from "./Video/Video";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Table
} from "reactstrap";
import classnames from "classnames";

export default class MovieTabs extends Component {
  state = {
    activeTab: "1"
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const {
      id,
      status,
      release_date,
      runtime,
      budget,
      revenue,
      original_language,
      genres,
      production_countries,
      production_companies
    } = this.props.movie;

    const { activeTab } = this.state;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Детали
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Видео
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Актеры
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col className="mt-4">
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Статус:</th>
                      <td>{status}</td>
                    </tr>
                    <tr>
                      <th scope="row">Дата выхода:</th>
                      <td>{release_date}</td>
                    </tr>
                    <tr>
                      <th scope="row">Продолжительность:</th>
                      <td>{runtime} мин</td>
                    </tr>
                    <tr>
                      <th scope="row">Язык оригинала:</th>
                      <td>{original_language}</td>
                    </tr>
                    <tr>
                      <th scope="row">Страна:</th>
                      <td>
                        {production_countries
                          ? production_countries.map(item => {
                              return item.name;
                            })
                          : null}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Бюджет:</th>
                      <td>{budget}$</td>
                    </tr>
                    <tr>
                      <th scope="row">Сборы:</th>
                      <td>{revenue}$</td>
                    </tr>
                    <tr>
                      <th scope="row">Компания:</th>
                      <td>
                        {production_companies
                          ? production_companies.map(item => {
                              return item.name + ", ";
                            })
                          : null}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Жанры:</th>
                      <td>
                        {genres
                          ? genres.map(item => {
                              return item.name + " ";
                            })
                          : null}
                        {/* {genres.toString()} */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Video activeTab={activeTab} movieId={id} />
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Credits activeTab={activeTab} movieId={id} />
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
