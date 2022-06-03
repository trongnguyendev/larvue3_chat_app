<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Message;

class Conversation extends Model
{
    use HasFactory;

    protected $table = 'conversations';

    protected $fillable = [
        'title',
        'user1_id',
        'user2_id'
    ];


    public function message()
    {
        return $this->hasMany(Message::class);
    }

    public static function createConversation($data)
    {

        $conversation = Conversation::create($data);

        return $conversation;
    }

    public static function updataConversation($request, $conversation)
    {
        $data = $request->only([
            'title',
            'user_id'
        ]);

        $conversation->update($data);

        return $conversation;
    }

    public static function deleteConversation($id)
    {
        $conversation = self::find($id);

        $conversation->delete();

        return true;
    }
}
