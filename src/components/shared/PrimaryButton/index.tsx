import React from "react";
import { Link } from "react-router-dom";

type PrimaryButtonProps = {
  to: string;
  value: string;
  className?: string;
  outline?: boolean;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <>
      <Link
        to={props.to}
        className={`btn-own${props.outline ? "-outline" : ""} ${
          props.className
        }`}
      >
        {props.value}
      </Link>
    </>
  );
};

export default PrimaryButton;
