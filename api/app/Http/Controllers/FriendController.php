<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;

class FriendController extends Controller
{
    //

    public function insert_friend(Request $request)
    {
        $friend = Friend::insertFriend($request->all());

        $data = [
            'friend' => $friend,
        ];

        return $this->response_json(1, 'add friend success', $data);
    }

    public function list_friend(Request $request)
    {
        $auth = auth()->user();
        
        $res = DB::table('users')
        ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->leftJoin('friends', function($join){
            $join->on('users.id', '=', 'friends.user_id')
                ->orOn('users.id', '=', 'friends.friend_id');
        })
        ->where('users.id', '!=', $auth['id'])

        ->where('friends.friend', '=', '1')
        ->select('users.id as idd', 'users.*', 'friends.*', 'user_profiles.avarta')
        ->get();
        
        $data = [
            'user_friend' => $res
        ];

        return $this->response_json(1, 'list friend', $data);
    }
}
