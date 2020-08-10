import React from "react";
import Router from "next/router";
import { Button } from "@material-ui/core";

export default class SecondaryNav extends React.Component {
  render() {
    return (
      <div
        style={{
          maxWidth: "1000px",
          margin: "30px auto",
          borderRadius: "5px",
          backgroundColor: "#fff",
          height: "50px",
          color: "#104e8b",
          textAlign: "center",
          fontSize: "19px",
          padding: "5px",
          borderTop: "2px solid #104e8b",
          borderBottom: "2px solid #104e8b",
        }}
      >
        {localStorage.onlinejudge_info ? (
          <Button color="inherit" onClick={() => Router.push("/question")}>
            Questions
          </Button>
        ) : (
          <div></div>
        )}
        {localStorage.onlinejudge_info ? (
          <Button color="inherit" onClick={() => Router.push("/submissions")}>
            All Submissons
          </Button>
        ) : (
          <div></div>
        )}

        {localStorage.onlinejudge_info ? (
          <Button color="inherit" onClick={() => Router.push("/leaderboard")}>
            Leaderboard
          </Button>
        ) : (
          <div></div>
        )}
        {localStorage.onlinejudge_info ? (
          <Button
            color="inherit"
            onClick={() => Router.push("/personalsubmissions")}
          >
            My Submissions
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
