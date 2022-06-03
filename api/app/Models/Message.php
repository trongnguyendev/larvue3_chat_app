<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conversation;

class Message extends Model
{
    use HasFactory;
    
    protected $table = 'messages';

    protected $fillable = [
        'conversation_id',
        'user_id',
        'message_type',
        'message'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public static function createMessage($data)
    {
        $message = Message::create($data);

        return $message;
    }

    public static function updateMessage($request, $message)
    {
        $data = $request->only([
            'conversation_id',
            'user_id',
            'message_type',
            'message'
        ]);

        $customer->update($data);

        return $customer;
    }

    public static function deleteMessage($id)
    {
        $customer = self::find($id);

        $customer->delete();

        return true;
    }
}
