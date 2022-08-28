<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupChat;
use App\Models\Message;

use App\Events\PrivateMessageEvent;

class GroupChatController extends Controller
{
    public function create_group(Request $request) {

        $group = GroupChat::create($request->all());

        if(!$group) {
            return $this->response_json(0, 'create group fail.', []);
        }

        return $this->response_json(1, 'create success', ['group' => $group]);
    }

    public function get_group(Request $request) {

        $group_id = $request->group_id;
        $group = GroupChat::get_messages_by_group_id($group_id);

    }

    public function send_message(Request $request) {

        $group_exist = GroupChat::get_group_by_user(
            [
                'auth_id' => $request->sender_id,
                'friend_id' => $request->receiver_id
            ]
        );

        if(!$group_exist) {
            return $this->response_json(0, 'not found group', []);
        }

        $data_message = [
            'sender_id' => $request->sender_id,
            'receiver_id'   => $request->receiver_id,
            'group_id'  => $group_exist['id'],
            'message_type'  => $request->message_type,
            'content'   => $request->content,
        ];

        $sent_mess = Message::create($data_message);

        if($sent_mess) {

            $room = $request->sender_id > $request->receiver_id ? ($request->sender_id . '_' . $request->receiver_id . '_room') : ($request->receiver_id . '_' . $request->sender_id . '_room');

            $data_socket_message = [
                'room' =>  $room,
                'message' => $sent_mess
            ];

            event(new PrivateMessageEvent($data_socket_message));
            return $this->response_json(1, 'send msg success', ['message' => $sent_mess]);
        }

    }

    public function get_messages_by_groups(Request $request)
    {
        // sleep(2);
        $group = GroupChat::get_group_by_user(
            [
                'auth_id' => auth()->id(),
                'friend_id' => $request->friend_id
            ]
        );

        $fromMessage = ($request->fromMessage) ? $request->fromMessage : 0;

        $messages = Message::get_messages_by_group_id($group['id'], $fromMessage);

        $data_res = [
            'request'  => $fromMessage,
            'group_id' => $group['id'],
            'messages' => $messages
        ];

        if(empty($messages)) {
            return $this->response_json(0, 'messages empty', $data_res);
        }
        return $this->response_json(1, 'messages current', $data_res);
    }


}
