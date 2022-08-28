<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Participant;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use App\Events\PrivateMessageEvent;

class ConversationController extends Controller
{
    //
    public function getMessage()
    {

    }

    public function checkConversation($user_id, $friend_id)
    {
        // return true;
        // $user = User::find($user_id);
        // $friend = User::find($friend_id);

        // $participant_user = $user->participant;
        // $participant_friend = $friend->participant;

        // echo $participant_user[0]['conversation_id'];
        // echo $participant_friend[0]['conversation_id'];
        // if(count($participant_user) == 0 || count($participant_friend) == 0) return false;
        
        // if($participant_user[0]['conversation_id'] == $participant_friend[0]['conversation_id']) return $participant_user[0]['conversation_id'];

        // return false;
        
        $conversation = [];

        $conversation = DB::table('users')
        ->select('conversations.*')
        ->where([
            ['conversations.user1_id', '=', $user_id],
            ['conversations.user2_id', '=', $friend_id]
        ])
        ->orWhere([
            ['conversations.user1_id', '=', $friend_id],
            ['conversations.user2_id', '=', $user_id]
        ])
        ->join('conversations', function($join) {
            $join->on('users.id', '=', 'conversations.user1_id')
                ->orOn('users.id', '=', 'conversations.user2_id');
        })->first();

        // $isConversation = DB::table('users')
        // ->join('conversations', function() {})
        // ->whereRaw(
        //     '(
        //         CASE 
        //         WHEN conversations.user1_id = '. $user_id .' THEN users.id = conversations.user2_id
        //         WHEN conversations.user2_id = '. $friend_id .' THEN users.id = conversations.user1_id
        //         END
        //     )'
        // )->toSql();

        return $conversation;
    }

    
    public function createOrFindConversation($data)
    {
        $friend_id = $data['friend_id'];

        $checkConversation = (array) $this->checkConversation($data['user_id'], $friend_id);

        if(empty($checkConversation)) {
            $data_conversation = [
                'title' => 'test',
                'user1_id' => $data['user_id'],
                'user2_id'  => $data['friend_id'],
    
            ];
    
            $conversation = Conversation::createConversation($data_conversation);
    
            $friend = User::find($friend_id);
            
            $data_participant_user = [
                "conversation_id"   => $conversation['id'],
                "user_id"   => auth()->id(),
                'title'  => $friend['name']
            ];
    
            $data_participant_friend = [
                "conversation_id"   => $conversation['id'],
                "user_id"   => $friend_id,
                'title'  => auth()->user()->name,
            ];
    
            $participant_user = Participant::createParticipant($data_participant_user);
            
            $participant_friend = Participant::createParticipant($data_participant_friend);
    
            if(!$participant_user || !$participant_friend) return false;
    
            return $conversation;

        }
        else {
            return $checkConversation;
        }        
        
    }

    public function sendMessage(Request $request)
    {
        $data = $request->all();

        $conversation = $this->createOrFindConversation($data);
 
        if(!$conversation) return $this->response_json(0, 'send message fail');

        $data_message = [
            'conversation_id' => $conversation['id'],
            'user_id'         => $data['user_id'],
            'message_type'    => $data['message_type'],
            'message'         => $data['message'],
        ];

        $message = Message::createMessage($data_message);

        $data = [ 'message' => $message ];

        return $this->response_json(1, '', $data);

    }

    public function getConversationByUser(Request $request)
    {
        $data = $request->all();
        $conversation = $this->checkConversation(auth()->user()->id, $data['friend_id']);
        return empty($conversation) ? 0 : 1;
    }

    
    public function getMessageConversationsByUser(Request $request)
    {
        $data = $request->all();

        $result = DB::table('users')
        ->join('conversations', function($join) {
            $join->on('users.id', '=', 'conversations.user1_id')->orOn('users.id', '=', 'conversations.user2_id');
        })
        ->leftJoin('messages', 'conversations.id', '=', 'messages.conversation_id')
        ->join('user_profiles', 'users.id', '=', 'user_profiles.user_id')
        ->where([
            ['conversations.user1_id', '=', auth()->user()->id],
            ['conversations.user2_id', '=', $data['friend_id']]
        ])
        ->orWhere([
            ['conversations.user1_id', '=', $data['friend_id']],
            ['conversations.user2_id', '=', auth()->user()->id]
        ])
        ->select('messages.*')
        ->distinct()
        ->get();

        $user_infor = User::with('profile')->find($data['friend_id']);



        $data = [
            'conversation' => $result,
            'friend_infor' => $user_infor
        ];

        return $this->response_json(1, '', $data);
    }
}
