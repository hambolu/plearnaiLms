<?php
namespace App\Http\Traits;

use Stripe\Stripe;
use App\Models\Payment;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;

trait PaymentTrait
{
    public function checkout($user_id,$amount, $transaction_ref,$course_id)
    {
        try {

            Stripe::setApiKey(config('stripe.sk'));

            //$2 per credit
            

            $session = Session::create([
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => 'Buy Course',
                            ],
                            'unit_amount' => $amount * 100,
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => 'payment',
                'success_url' => env('PAYMENT_URL').'/success'. '?payment_intent={CHECKOUT_SESSION_ID}',
                'cancel_url' =>env('PAYMENT_URL').'/unsuccess'. '?payment_intent={CHECKOUT_SESSION_ID}',
            ]);

 
 
            $payment  = new Payment();
            $payment->user_id = $user_id;
            $payment->amount = $amount;
            $payment->transaction_ref = $transaction_ref;
            $payment->course_id = $course_id;
            $payment->stripe_id = $session->id;
            $payment->status = 'pending';
            $payment->save();

            return $session->url;

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyPayment($paymentIntentId)
    {
        Stripe::setApiKey(config('stripe.sk'));

       // $paymentIntentId = $request->payment_intent;
        $session = Session::retrieve($paymentIntentId);

        try {

            $checkCredit = Payment::where('stripe_id', $paymentIntentId)
                ->first();
            if ($checkCredit->status === 'paid') {
                return redirect()->route('enrollments.index');
            }

            if ($session->payment_status === 'paid') {
                // Payment succeeded

                $updatePayment = Payment::where('stripe_id', $paymentIntentId)
                    ->where('status', 'pending')
                    ->first();

                    
                    $updatePayment->update(['status' => 'paid']);
                    $enrollment = new Enrollment();
                    $enrollment->course_id = $updatePayment->course_id;
                    $enrollment->user_id = $updatePayment->user_id;
                    $enrollment->save();

               
                return redirect()->route('enrollments.index');
                // return response()->json([
                //     'status' => true,
                //     'message' => 'Payment verified'
                // ], 200);
            } else {
                // Payment failed
                $updatePayment = Payment::where('stripe_id', $paymentIntentId)
                    ->where('status', 'pending')
                    ->first();
                $updatePayment->update(['status' => 'canceled']);

                return redirect()->route('course.index');
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}