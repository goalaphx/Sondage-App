<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'poll_id' => 'required|exists:polls,id',
            'user_id' => 'required|exists:users,id',
            'option' => 'required|string',
        ]);

        // Ensure the user hasn't already voted on this poll
        $existingVote = Vote::where('poll_id', $data['poll_id'])
                            ->where('user_id', $data['user_id'])
                            ->first();

        if ($existingVote) {
            return response()->json(['message' => 'You have already voted on this poll'], 400);
        }

        // Create the vote
        $vote = Vote::create($data);

        return response()->json(['message' => 'Vote cast successfully', 'vote' => $vote], 201);
    }

    public function getUserVotes(Request $request)
{
    $userId = $request->query('user_id');
    $votes = Vote::where('user_id', $userId)
                 ->with('poll')  // Fetch associated polls
                 ->get();
    return response()->json($votes);
}
}
