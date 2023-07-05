<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'lessons';
    
    protected $fillable = [
        'name',
        'description',
    ];

    public function vocabularies()
    {
        return $this->belongsToMany(Vocabulary::class, 'lesson_vocabularies');
    }
    public function folderLesson()
    {
        return $this->hasMany(FolderLesson::class);
    }
    public function lessonVocabulary()
    {
        return $this->hasMany(LessonVocabulary::class);
    }

}
