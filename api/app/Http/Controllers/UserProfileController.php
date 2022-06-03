<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Models\User;

class UserProfileController extends Controller
{

    public function me()
    {
        $id_user = auth()->user()['id'];
        $profile = UserProfile::find($id_user);

        $data = [
            'users'      => auth()->user(),
            'profile'    => $profile
        ];

        return $this->response_json(1, '', $data);
    }

    public function findFriend(Request $request)
    {
        $pos = strpos($request->mail, '@');

        if(isset($pos) && $pos === 0) {
            return $this->response_json(0, '');
        }

        $auth = auth()->user();
        $id = auth()->user()->id;

        $search_mail = '%' . $request->mail;
        $search_name = '%' . $request->mail . '%';
        
        $res = DB::table('users')

        // ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')

        // ->leftJoin('friends', 'users.id', '=', 'friends.friend_id')
        
        // ->leftJoin('friends', function($join){
        //     $join->on('users.id', '=', 'friends.user_id')
        //         ->orOn('users.id', '=', 'friends.friend_id');
        // })

        // 11
        // ->join('friends', function() {})
        // ->whereRaw(
        //     '(
        //         CASE
        //         WHEN friends.user_id = ' . auth()->user()->id . ' THEN users.id = friends.user_id
        //         WHEN friends.friend_id = ' . auth()->user()->id .' THEN users.id = friends.friend_id
        //         END
        //     )'
        // )
        // 11
        
        
        ->leftJoin('friends', function($join) use ($id) {
            $join->on('users.id', '=', DB::raw('CASE WHEN friends.user_id = '. $id  .' THEN friends.friend_id else friends.user_id END'));
            // ->where('friends.friend', '=', 1)
            // ->orWhere('friends.friend', '=', 0);

        })
        // ->leftJoin('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->where(function($query) use ($search_mail, $search_name) {
            return $query
                ->where([
                    ['users.email', 'like', $search_mail],
                ])
                ->orWhere([
                    ['users.name', 'like', $search_name],
                ]);
        })
        ->where(function($query) use ($id){
            return $query
                ->where('friends.user_id', '=', $id)
                ->orWhere('friends.friend_id', '=', $id)
                ->orWhere('friends.user_id', '=', null);
        })
        ->where('users.id', '!=', auth()->id())
        ->select('friends.id as ifd', 'friends.friend_id', 'friends.user_id', 'friends.friend as relation_type', 'users.name', 'users.email')
        ->distinct()
        ->get();
        // ->select(
        //     DB::raw(
        //         '(
        //             CASE WHEN friends.user_id = ' . auth()->user()->id . ' THEN users.id = friends.friend_id  END
        //             CASE WHEN friends.friend_id = ' . auth()->user()->id . ' THEN users.id = friends.user_id  END
        //         )'
        //     )
        // )
        $data = [
            'users' => $res
        ];

        // sleep(1);

        return $this->response_json(1, '', $data);
    }

    public function add_friend()
    {
        
    }
}
