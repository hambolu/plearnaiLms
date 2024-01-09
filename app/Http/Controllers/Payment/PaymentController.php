<?php
namespace App\Http\Controllers\Payment;

use App\Http\Traits\PaymentTrait;
use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Payment;

class PaymentController extends Controller
{
    use PaymentTrait;
    public function index()
    {
        $payments = Payment::all();
        return Inertia::render('Payments/Index', ['payments' => $payments]);
    }

    public function create()
    {
        return Inertia::render('Payments/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        $user_id = $request->user_id;
        $amount = $request->amount;
        $transaction_ref = $request->transaction_ref;
        $course_id = $request->course_id;


        $sessionUrl = $this->checkout($user_id,$amount, $transaction_ref,$course_id);


        return response()->json([
            'status' => true,
            'message' => 'successfull',
            'redirect_url' => $sessionUrl
        ], 201);
    }
    public function handleSuccess(Request $request)
    {
        $paymentIntent = $request->query('payment_intent');
        $verified = $this->verifyPayment($paymentIntent);
        
        return $verified;
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', ['payment' => $payment]);
    }

    public function update(Request $request, Payment $payment)
    {
        // Add validation if necessary
        $payment->update($request->all());
        return redirect()->route('payments.index');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->route('payments.index');
    }
}
