<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessagesController extends Controller
{
    //

    public function index()
    {
        $message = Message::all();

        $data = [
            'messages' => $message
        ];

        return $this->response_json(1, '', $data);
    }

    public function store(Request $request)
    {
        $message = Message::createMessage($request);

        $data = [
            'message' => $message
        ];

        return $this->response_json(1, 'store message success', $data);

    }

    public function show(Message $message)
    {
        return $this->response_json(1, '', ['message' => $message]);
    }

    public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {
        Message::deleteMessage($request->id);

        return $this->response_json(1, 'delete success');
    }

    
}
