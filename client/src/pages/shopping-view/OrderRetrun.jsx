import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function OrderReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const session_id = params.get("session_id");

useEffect(() => {
  console.log("SESSION ID =>", session_id);

  if (session_id) {
    dispatch(capturePayment({ session_id })).then((data) => {
      console.log("CAPTURE RESPONSE =>", data);

      if (data?.payload?.success) {
        console.log("SUCCESS TRUE — redirecting...");
        sessionStorage.removeItem("currentOrderId");
        window.location.href = "/shop/payment-success";
      } else {
        console.log("SUCCESS FALSE — no redirect happening.");
      }
    });
  }
}, [session_id]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default OrderReturnPage;
