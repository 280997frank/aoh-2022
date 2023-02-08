import React from "react";

type TLineBreakProps = {
  margin?: string;
};

function LineBreak({ margin = "3% 0" }: TLineBreakProps) {
  return <hr style={{ borderColor: "#C0BE9A", margin: margin }} />;
}

export default LineBreak;
