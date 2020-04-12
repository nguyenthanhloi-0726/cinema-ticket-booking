import React from "react";
import { connect } from "react-redux";
import * as action from "./../../services/redux/actions/cinemaActions";
import CinemaMovies from "./CinemaMovies";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";

function CategoryGroupCinemaMobile(props) {
  //Material UI Expansion
  const [expanded, setExpanded] = React.useState("");
  //ExpansionPanel of GroupCinema
  const ExpansionPanel = withStyles({
    root: {
      "@media (min-width: 768px)": {
        display: "none"
      },
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0
      },
      "&:before": {
        display: "none"
      },
      "&$expanded": {
        margin: "auto"
      }
    },
    expanded: {}
  })(MuiExpansionPanel);

  //ExpansionPanel of Cinema
  const ExpansionPanel2 = withStyles({
    root: {
      position: "relative",
      width: "100%",
      // "&::after": {
      //   content: '""',
      //   position: "absolute",
      //   top: 0,
      //   left: "50%",
      //   width: "calc(100% - 40px)",
      //   transform: "translateX(-50%)",
      //   borderBottom: "1px solid rgba(238, 238, 238)"
      // },
      // border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0
      },
      "&:before": {
        display: "none"
      },
      "&$expanded": {
        margin: "auto"
      }
    },
    expanded: {}
  })(MuiExpansionPanel);

  //Common ExpansionPanelSummary
  const ExpansionPanelSummary = withStyles({
    root: {
      // borderBottom: "1px solid rgba(0, 0, 0, .125)",
      // marginBottom: -1,
      margin: "0 15px",
      padding: "15px 0",
      minHeight: 56,
      "&$expanded": {
        minHeight: 56
      }
    },
    content: {
      margin: "0",
      "&$expanded": {
        margin: "0"
      }
    },
    expanded: {}
  })(MuiExpansionPanelSummary);

  //Common ExpansionPanelSummary
  const ExpansionPanelSummary2 = withStyles({
    root: {
      borderTop: "1px solid rgba(0, 0, 0, .125)",
      // marginBottom: -1,
      margin: "0 15px",
      padding: "15px 0",
      minHeight: 56,
      "&$expanded": {
        minHeight: 56
      }
    },
    content: {
      margin: 0,
      "&$expanded": {
        margin: 0
      }
    },
    expanded: {}
  })(MuiExpansionPanelSummary);

  //GroupCinema's ExpansionPanelDetails
  const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: 0,
      display: "block"
    }
  }))(MuiExpansionPanelDetails);

  //Cinema's ExpansionPanelDetails
  const ExpansionPanelDetails2 = withStyles(theme => ({
    root: { padding: 0 }
  }))(MuiExpansionPanelDetails);

  const handleChangeExpansion = panel => (event, newExpanded) => {
    if (newExpanded) {
      props.setChosenGroupCinema(panel);
      props.getCinemaMovies(panel);
      //Scroll to chosenGroupCinema
      setTimeout(() => {
        let element = document.getElementById(panel);
        let headerOffset = 60;
        let elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        let offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 200);
    }
    setExpanded(newExpanded ? panel : false);
  };

  const renderCinema = maHeThongRap => {
    if (props.groupCinemaInfo[maHeThongRap]) {
      return props.groupCinemaInfo[maHeThongRap].map((cinema, index) => {
        let tenRap = cinema.tenCumRap.startsWith("BHD Star")
          ? [cinema.tenCumRap.slice(0, 8), cinema.tenCumRap.slice(20)]
          : cinema.tenCumRap.split(" - ");
        return (
          <ExpansionPanel2 key={index}>
            <ExpansionPanelSummary2
              aria-controls={`cinema-content-${index}`}
              id={`cinema-header-${index}`}
            >
              <div className="cinema">
                <div className="cinema__logo">
                  <img
                    className=""
                    src={`/img/${maHeThongRap}.jpg`}
                    alt="cinema-logo"
                  />
                </div>
                <div className="cinema__info">
                  <span className="cinema__name">
                    <span className="group-cinema__name">{tenRap[0]}</span> -{" "}
                    {tenRap[1]}
                  </span>
                  <span className="cinema__address">{cinema.diaChi}</span>
                  <span className="cinema__detail">[chi tiết]</span>
                </div>
              </div>
            </ExpansionPanelSummary2>
            <ExpansionPanelDetails2>
              <CinemaMovies
                history={props.history}
                chosenCinema={cinema.maCumRap}
              />
            </ExpansionPanelDetails2>
          </ExpansionPanel2>
        );
      });
    }
    return <div></div>;
  };

  const renderGroupCinema = () => {
    return props.listGroupCinema.map((groupCinema, index) => {
      return (
        <ExpansionPanel
          id={groupCinema.maHeThongRap}
          key={index}
          expanded={expanded === groupCinema.maHeThongRap}
          onChange={handleChangeExpansion(groupCinema.maHeThongRap)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`group-cinema-content-${index}`}
            id={`group-cinema-header-${index}`}
          >
            <div className="group-cinema--mobile">
              <img
                src={groupCinema.logo}
                style={{ height: "50px" }}
                alt="img"
              />
              <span className="group-cinema-name">
                {groupCinema.tenHeThongRap}
              </span>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {renderCinema(groupCinema.maHeThongRap)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  return (
    <div className="category-group-cinema--mobile">{renderGroupCinema()}</div>
  );
}

const mapStateToProps = state => {
  return {
    listGroupCinema: state.cinemaReducer.listGroupCinema,
    listMovie: state.movieReducer.listMovie,
    groupCinemaInfo: state.cinemaReducer.groupCinemaInfo
  };
};
const mapDispathToProp = dispatch => {
  return {
    setChosenGroupCinema: chosenGroupCinema => {
      dispatch(action.setChosenGroupCinema(chosenGroupCinema));
    },
    getCinemaMovies: chosenGroupCinema => {
      dispatch(action.getCinemaMovies(chosenGroupCinema));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispathToProp
)(CategoryGroupCinemaMobile);
