import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import Credits from "./MovieCredits/MovieCredits";
import Video from "./MovieVideos/MovieVideos";
import Detail from "./MovieDetail/MovieDetail";
import NoMatch from "./NoMatch/NoMatch";
import { Nav, NavItem } from "reactstrap";

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
    const { movie, activeTab } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/detail`}
              className={classnames("nav-link", { active: activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Детали
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/videos`}
              className={classnames("nav-link", { active: activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Видео
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/credits`}
              className={classnames("nav-link", { active: activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Актеры
            </NavLink>
          </NavItem>
        </Nav>
        <Switch>
          <Route path="/movie/:id/detail" component={Detail} />
          <Route path="/movie/:id/videos" component={Video} />
          <Route path="/movie/:id/credits" component={Credits} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
