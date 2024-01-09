<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserManagmentController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('UserManagement/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('UserManagement/Create');
    }

    public function store(Request $request)
    {
        // Add validation if necessary
        User::create($request->all());
        return redirect()->route('user-management.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('UserManagement/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        // Add validation if necessary
        $user->update($request->all());
        return redirect()->route('user-management.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('user-management.index');
    }
}
