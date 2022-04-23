<?php

namespace App\Traits;

trait ApiResponse
{
    protected function response_json($status, $message = '', $data = [])
    {
        $result = [];

        $result['status'] = $status;

        if(!empty($message)) {
            $result['message'] = $message;
        }

        // if(empty($data)) {
        //     $result['message'] = 'Not data';
        // }

        $result['results'] = $data;

        return response()->json($result);
    }
}