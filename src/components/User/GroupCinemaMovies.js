import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "0"
    // backgroundColor: theme.palette.background.paper
  },
  tab: {
    minWidth: "95px"
  }
  // expansionPanel: {
  //   width: "100%"
  // }
}));

const ExpansionPanel = withStyles({
  root: {
    position: "relative",
    marginTop: "1px",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: "calc(100% - 40px)",
      transform: "translateX(-50%)",
      borderBottom: "1px solid rgba(238, 238, 238)"
    },
    // border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto",
      marginTop: "1px"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: 20,
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

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: "10px 20px"
  }
}))(MuiExpansionPanelDetails);

function GroupCinemaMovies(props) {
  const classes = useStyles();
  //Material UI Tabs
  const [value, setValue] = React.useState(0);
  //Set ChosenDay
  const [chosenDay, setChosenDay] = React.useState("2019-01-01");
  //Return Time-end with Time-start
  const getTimeEnd = timeStart => {
    let d = new Date();
    d.setHours(timeStart.slice(0, 2), timeStart.slice(3), 0);
    //Hour + 2
    d.setHours(d.getHours() + 2);
    let timeEnd = d.toLocaleTimeString("en-GB").slice(0, 5);
    return timeEnd;
  };

  useEffect(() => {
    setValue(0);
  }, [props]);

  //Material UI Tab change
  const handleChange = (event, newValue) => {
    let baseDay = new Date("January 1, 2019");
    let currentDay = new Date(baseDay);
    currentDay.setDate(baseDay.getDate() + newValue);
    let month =
      currentDay.getMonth() + 1 < 10
        ? "0" + (currentDay.getMonth() + 1)
        : currentDay.getMonth() + 1; //months from 1-12
    let day =
      currentDay.getDate() < 10
        ? "0" + currentDay.getDate()
        : currentDay.getDate();
    let year = currentDay.getFullYear();
    currentDay = year + "-" + month + "-" + day;
    setValue(newValue);
    setChosenDay(currentDay);
  };

  const renderTab = () => {
    let dayName = [
      "Chủ nhật",
      " Thứ 2",
      " Thứ 3",
      " Thứ 4",
      " Thứ 5",
      " Thứ 6",
      " Thứ 7"
    ];
    //Create Tabs with 14 days
    let arrayTab = [...Array(14)].map((item, index) => {
      let day = new Date("January 1, 2019");
      let nextDay = new Date(day);
      nextDay.setDate(day.getDate() + index);
      return (
        <Tab
          key={index}
          label={
            <>
              <p className="m-0">{dayName[nextDay.getDay()]}</p>
              <p className="m-0">{nextDay.getDate()}</p>
            </>
          }
          className={classes.tab}
        />
      );
    });
    return arrayTab;
  };

  //Render Cinemas of ChosenGroupCinema have showtime on ChosenDay
  const renderCinemas = () => {
    let todayCinemas = [];
    if (props.groupCinemaInfo[props.chosenGroupCinema]) {
      props.groupCinemaInfo[props.chosenGroupCinema].forEach(cinema => {
        if (
          props.detailMovie.lichChieu
            .filter(
              lichChieu =>
                lichChieu.ngayChieuGioChieu.slice(0, 10) === chosenDay
            )
            .find(
              lichChieu => lichChieu.thongTinRap.maCumRap === cinema.maCumRap
            )
        ) {
          todayCinemas.push(cinema);
        }
      });
    }

    if (todayCinemas.length > 0) {
      return todayCinemas.map((cinema, index) => {
        let tenRap = cinema.tenCumRap.startsWith("BHD Star")
          ? [cinema.tenCumRap.slice(0, 18), cinema.tenCumRap.slice(20)]
          : cinema.tenCumRap.split(" - ");
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls={`todayCinemas-content-${index}`}
              id={`todayCinemas-header-${index}`}
            >
              <div className="cinema">
                <div className="cinema__logo">
                  <img
                    className=""
                    src={`/img/${props.chosenGroupCinema}.jpg`}
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
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {props.detailMovie.lichChieu
                  .filter(
                    lichChieu =>
                      lichChieu.thongTinRap.maCumRap === cinema.maCumRap
                  )
                  .filter(
                    lichChieu =>
                      lichChieu.ngayChieuGioChieu.slice(0, 10) === chosenDay
                  )
                  .map((lichChieu, index4) => {
                    return (
                      <NavLink
                        className="showtime"
                        to={{
                          pathname: localStorage.getItem("User")
                            ? `/checkout/${lichChieu.maLichChieu}`
                            : `/login`,
                          preRequire: `/checkout/${lichChieu.maLichChieu}`,
                          prePage: props.history.location.pathname
                        }}
                        key={index4}
                      >
                        <span className="start-time">
                          {lichChieu.ngayChieuGioChieu.slice(11, 16)}
                        </span>
                        <span>
                          {` ~ ${getTimeEnd(
                            lichChieu.ngayChieuGioChieu.slice(11, 16)
                          )}`}
                        </span>
                      </NavLink>
                    );
                  })}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      });
    }
    return (
      <div className="no-showtime">
        <span>Không có suất chiếu.</span>
      </div>
    );
  };

  //Main
  return (
    <div className={`group-cinema-movies ${classes.root}`}>
      <AppBar position="static" color="inherit" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {renderTab()}
        </Tabs>
      </AppBar>
      {renderCinemas()}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    groupCinemaShowtimes:
      state.cinemaReducer.groupCinemaShowtimes.chosenGroupCinema,
    chosenGroupCinema: state.cinemaReducer.chosenGroupCinema,
    groupCinemaInfo: state.cinemaReducer.groupCinemaInfo
  };
};
export default connect(mapStateToProps, null)(GroupCinemaMovies);
