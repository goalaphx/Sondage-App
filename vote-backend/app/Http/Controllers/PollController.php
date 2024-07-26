<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use Illuminate\Http\Request;

class PollController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string',
        ]);

        $poll = Poll::create($data);
        return response()->json($poll, 201);
    }

    public function index()
    {
        return response()->json(Poll::all());
    }

    public function destroy($id)
    {
        $poll = Poll::findOrFail($id);
        $poll->delete();
        return response()->json(['message' => 'Poll deleted successfully']);
    }

    public function show(Poll $poll)
    {
        // Load votes and count them
        $poll->load('votes');
    
        // Aggregate votes by option
        $voteCounts = $poll->votes->groupBy('option')->map->count();
    
        // Attach the vote counts to the poll object
        $poll->vote_counts = $voteCounts;
    
        return response()->json($poll);
    }
    

    public function getPollsUserHasNotVotedOn(Request $request)
    {
        $userId = $request->query('user_id');

        $polls = Poll::whereDoesntHave('votes', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json($polls);
    }
}
