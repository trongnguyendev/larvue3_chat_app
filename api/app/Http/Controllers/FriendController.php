<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\User;
use App\Models\Relationship;
use App\Models\GroupChat;

class FriendController extends Controller
{

    public static $requested = '1';
    public static $accepted = '2';
    public static $cancel  = '0';


    public function find_user(Request $request) {
        $pos = strpos($request->mail, '@');

        if(isset($pos) && $pos === 0) {
            return $this->response_json(0, '');
        }

        $auth = auth()->user();
        $id = auth()->user()->id;

        $search_mail = '%' . $request->mail;
        $search_name = '%' . $request->mail . '%';
        
        $res = DB::table('users')
        ->leftJoin('relationships', function($join){
            $join->on('users.id', '=', 'relationships.user_1_id')
                ->orOn('users.id', '=', 'relationships.user_2_id');
        })
        ->where(function($query) use ($search_mail, $search_name) {
            return $query
            ->where('users.email', 'like', $search_mail)
            ->orWhere('users.name', 'like', $search_name);
        })
        ->where('users.id', '!=', auth()->id())
        ->select('users.*', 'relationships.status', 'relationships.user_1_id', 'relationships.user_2_id')
        ->orderBy('users.name', 'DESC')
        ->get();

        foreach($res as $key => $item) {
            if($item->user_1_id != auth()->id() && $item->user_2_id != auth()->id())
            {
                $res[$key]->user_1_id = null;
                $res[$key]->user_2_id = null;
                $res[$key]->status = null;
            }
        }
        
        // $arr_filter = [];
        // $mails = [];
        $ids = 0;

        $key_duplicate = [];

        // $count_duplicate = 1;
        $bool = false;

        $tmp = [];
        $i = 1;
        $key_check = [];

        foreach($res as $key => $item) {

            if(is_object($item)) {
                $item = (array)$item;
            }

            // new
            if(!in_array($item['id'], $tmp)) {
                $tmp[] = $item['id'];
                
                if(count($key_check) > 0) {
                    if($i == count($key_check)) {
                        $key_duplicate[] = $key - 1;
                    }
                    $key_check = [];
                }

                $key_check[] = $key;
            }
            // duplicate
            else {
                $i++;

                if($item['status'] == null) {
                    $key_check[] = $key;
                    $key_duplicate[] = $key;
                    
                }
                if($item['status'] != null) {
                    $key_duplicate[] = $key - 1;
                }
            }
        
        }

        foreach($key_duplicate as $item) {
            unset($res[$item]);
        }

        
        return $this->response_json(1, '', ['users' => $res]);
    }

    public function create_relationship(Request $request) {

        $friend_id = $request->friend_id;

        $exist_relationship = DB::table('relationships')
        ->where(function($query) use ($friend_id) {
            return $query
            ->where([
                ['user_1_id', '=', auth()->id()],
                ['user_2_id', '=', $friend_id],
                
            ])
            ->orWhere([
                ['user_1_id', '=', $friend_id],
                ['user_2_id', '=', auth()->id()],
            ]);
        })
        ->whereIn('status', [static::$requested, static::$accepted, static::$cancel])
        ->first();
        // return $this->response_json(1, 'Exist relationship', ['relationship' => $exist_relationship]); die();

        if(!empty($exist_relationship)) {
            $relationship_update = Relationship::find($exist_relationship->id);
            $relationship_update->status = '1';
            $relationship_update->save();
            return $this->response_json(1, 'Exist relationship', ['relationship' => $relationship_update]);
        }   
        
        $relationship = Relationship::create([
            'status'    => static::$requested,
            'user_1_id' => auth()->id(),
            'user_2_id' => $friend_id
        ]);

        return $this->response_json(1, 'New relationship', ['relationship'  => $relationship]);
    }

    public function get_relationships_by_status(Request $request)
    {
        $auth = auth()->user();
        $id = auth()->id();

        $status = $request->status;

        if(!in_array($status, [static::$requested, static::$accepted, static::$cancel])) {
            return $this->response_json(0, 'data fail', []);
        }
        
        $res = DB::table('users')
        ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->leftJoin('relationships', function($join){
            $join->on('users.id', '=', 'relationships.user_1_id')
                ->orOn('users.id', '=', 'relationships.user_2_id');
        })
        ->where('users.id', '!=', auth()->id())
        ->where(function($query) use ($id) {
            return $query
            ->where('relationships.user_1_id', '=', $id)
            ->orWhere('relationships.user_2_id', '=', $id);
        })
        ->where('relationships.status', $status)
        ->select('*')
        ->get();
        
        return $this->response_json(1, 'list friend', [ 'relationships' => $res ]);
    }

    public function update_relationship_by_status(Request $request)
    {
        $friend_id = $request->friend_id;
        $status = $request->status;

        // get infor relationship
        $relationship = Relationship::get_relationship_by_ids([
            'auth_id' => auth()->id(),
            'friend_id' => $friend_id
        ]);

        if(!in_array($status, [static::$requested, static::$accepted, static::$cancel])) {
            return $this->response_json(0, 'data fail', []);
        }

        // update status
        if($status == 2 && $relationship->user_2_id == auth()->id())
        {
            $data_update = ['status' => $status, 'user_1_id' => auth()->id(), 'user_2_id' => $friend_id];
        }
        else {
            $data_update = ['status' => $status];
        }

        $relationship_update = Relationship::update_relationship_by_id($relationship->id, $data_update);

        // get infor group chat
        $group_exist = GroupChat::get_group_by_user(
            [
                'auth_id' => auth()->id(),
                'friend_id' => $friend_id
            ]
        );

        if($relationship_update && empty($group_exist)) {
            // create group messenger
            if($status == static::$accepted) {

                $data_group = [
                    'user_1_id' => auth()->id(),
                    'user_2_id' => $friend_id,
                ];

                $group = GroupChat::create($data_group);

                return $this->response_json(1, 'update status accept and create group.', ['group' => $group]);

            }

            return $this->response_json(1, 'update status accepted success', []);
        }

        return $this->response_json(0, 'Accept fail or Accepted', []);
    }

}
