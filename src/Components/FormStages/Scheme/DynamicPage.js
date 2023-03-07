import React from "react";
import { useParams } from "react-router-dom";

function DynamicPage() {
  const { pageId } = useParams();

  // Fetch data for the dynamic page using pageId
  const fetchData = () => {
    fetch(
      `https://20230226t215147-dot-sssp-378808.nw.r.appspot.com/api/scheme/${pageId}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  sessionStorage.getItem("Page-URL");

  return (
    <div>
      <h1>Dynamic Page {pageId}</h1>
      {fetchData()}
    </div>
  );
}

export default DynamicPage;
