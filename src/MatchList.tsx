import React from "react";
import { Match } from "./types";

const MatchList = (curmatches: Match[]) => {
  console.log(curmatches);

  return (
    <div>
      {curmatches.length &&
        curmatches.map((match) => (
          <div key={match.title}>
            <p>{match.title}</p>
          </div>
        ))}
    </div>
  );
};

export default MatchList;
