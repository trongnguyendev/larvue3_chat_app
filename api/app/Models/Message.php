<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conversation;
use App\Models\GroupChat;

class Message extends Model
{
    use HasFactory;
    
    protected $table = 'messages';

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'group_id',
        'message_type',
        'content'
    ];

    // protected $dateFormat = 'Y-m-d';

    public static function create_message_by_type()
    {

    }

    public static function get_messages_by_group_id($group_id, $fromId = 0)
    {   
        if($fromId > 0) {
            return self::where('group_id', '=', $group_id)->where('id', '<', $fromId)->limit(20)->orderBy('created_at', 'DESC')->get();
        }

        return self::where('group_id', '=', $group_id)->limit(20)->orderBy('created_at', 'DESC')->get();
        
    }

}
