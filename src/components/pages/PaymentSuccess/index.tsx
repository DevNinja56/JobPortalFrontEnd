import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScreenLoader from "../../shared/ScreenLoader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {};

const PaymentSuccess = (props: Props) => {
  const { paymentTokken } = useParams();
  const [isVisibile, setIsVisible] = useState<boolean>(true);

  const verifyPayment = async () => {
    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
    try {
      const dataSnap = await fetch(`${APIURL}/api/paymentSuccess`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentTokken }),
      });

      const data = await dataSnap.json();

      if (dataSnap.status !== 200 && data.error) {
        alert(data.error);
        throw new Error(data.error);
      }
      setIsVisible(false);
      return console.log("data is -->", data);
    } catch (error) {
      console.log("something weird happend", error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <ScreenLoader isVisible={isVisibile} />
      {!isVisibile && (
        <div className="paymentSuccess">
          <CheckCircleIcon />
          <h1 className="text-light">
            Your payment has been received.</h1>
          <p className="text-center text-danger">We sent you an email containing your password.</p>
          <Link className="btn-own" to={`/login`}>
            Go to Login
          </Link>
        </div>
      )}
    </>
  );
};

export default PaymentSuccess;
