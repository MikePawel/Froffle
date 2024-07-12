import React from "react";
import "./Test.css";
import { Link } from "react-router-dom";
import WorldID from "./../../components/WorldID/worldID";

export default function Test() {
  return (
    <>
      <div className="test">
        Test
        <Link to="/"> Go Home </Link>
      </div>
      <WorldID />
    </>
  );
}
