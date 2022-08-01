<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    use HasFactory;

    protected $table = 'relationships';

    protected $fillable = [
        'status',
        'user_1_id',
        'user_2_id',
    ];

    public static function get_relationship_by_ids($data) {
        return self::getRelationshipByIds($data)->first();
    }

    public function scopeGetRelationshipByIds($query, array $data)
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

    public static function update_relationship_by_id($relationship_id, $data_update)
    {
        return self::where('id', '=', $relationship_id)->update($data_update);
    }

}
