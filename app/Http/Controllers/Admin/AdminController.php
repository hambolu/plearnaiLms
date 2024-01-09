<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Admin;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        return Inertia::render('Admins/Index', ['admins' => $admins]);
    }

    public function create()
    {
        return Inertia::render('Admins/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        Admin::create($request->all());
        return redirect()->route('admins.index');
    }

    public function edit(Admin $admin)
    {
        return Inertia::render('Admins/Edit', ['admin' => $admin]);
    }

    public function update(Request $request, Admin $admin)
    {
        // Add validation if necessary
        $admin->update($request->all());
        return redirect()->route('admins.index');
    }

    public function destroy(Admin $admin)
    {
        $admin->delete();
        return redirect()->route('admins.index');
    }
}
