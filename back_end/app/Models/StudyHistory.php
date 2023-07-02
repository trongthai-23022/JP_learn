<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudyHistory extends Model
{
    use HasFactory;

    protected $table = 'study_histories';
    protected $fillable = [
        'user_id',
        'folder_id',
        'study_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }   

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }

}
