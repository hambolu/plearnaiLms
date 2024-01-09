<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Invoice;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::all();
        return Inertia::render('Invoices/Index', ['invoices' => $invoices]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        Invoice::create($request->all());
        return redirect()->route('invoices.index');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Invoices/Edit', ['invoice' => $invoice]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        // Add validation if necessary
        $invoice->update($request->all());
        return redirect()->route('invoices.index');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect()->route('invoices.index');
    }
}
