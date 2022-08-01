<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupChat extends Model
{
    use HasFactory;

    protected $table = 'group_chats';

    protected $fillable = [
        'name',
        'user_1_id',
        'user_2_id',
    ];

    public static function get_group_by_user($data) {
        return self::getGroupByIds($data)->first();
    }

    public function scopeGetGroupByIds($query, array $data)
    {
        return $query->where([
            ['user_1_id', '=', $data['auth_id']],
            ['user_2_id', '=', $data['friend_id']]
        ])
        ->orWhere([
            ['user_2_id', '=', $data['auth_id']],
            ['user_1_id', '=', $data['friend_id']]
        ]);
    }

    public static function get_messages_by_group_id($group_id)
    {
        return self::where('group_id', '=', $group_id)->get();
    }

    
}
