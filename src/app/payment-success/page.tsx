import PaymentSuccessView from "@/page/payment-success";
import { Suspense } from "react";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-bold text-gray-900">로딩중...</p>
        </div>
      </div>
    }>
      <PaymentSuccessView />
    </Suspense>
  );
}
