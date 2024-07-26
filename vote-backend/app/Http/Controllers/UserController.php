<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check if user exists
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Assuming you want to return the user's role and other info
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password before saving
            'role' => 'Normal User', // Set default role
        ]);

        return response()->json(['message' => 'Registration successful', 'user' => $user], 201);
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function delete(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function promote(User $user)
    {
        $user->role = 'Admin';
        $user->save();
        return response()->json($user);
    }
}
