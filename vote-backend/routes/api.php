<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

// Routes for user authentication
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

// Poll routes
Route::post('/poll/create', [PollController::class, 'create']);
Route::get('/polls', [PollController::class, 'index']);
Route::get('/poll/{poll}', [PollController::class, 'show']);
Route::delete('/poll/{poll}', [PollController::class, 'destroy']);
Route::get('/polls/not-voted', [PollController::class, 'getPollsUserHasNotVotedOn']);

// User management routes
Route::get('/users', [UserController::class, 'index']);
Route::delete('/user/{user}', [UserController::class, 'delete']);
Route::put('/user/{user}/promote', [UserController::class, 'promote']);

// Voting routes
Route::post('/vote', [VoteController::class, 'store']);
Route::get('/user/votes', [VoteController::class, 'getUserVotes']); // Added this line

// Route to get CSRF token
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
