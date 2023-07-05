<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
    use HasFactory;

    protected $table = 'folders';
    protected $fillable = [
        'name',
        'description',
    ];

    
    public function lessons()
    {
        return $this->hasManyThrough(Lesson::class, FolderLesson::class, 'folder_id', 'id', 'id', 'lesson_id');
    }

    public function studyHistories()
    {
        return $this->hasMany(StudyHistory::class);
    }
    public function folderLesson()
    {
        return $this->hasMany(FolderLesson::class);
    }
}
