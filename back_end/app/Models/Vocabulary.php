<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    use HasFactory;
    protected $table = 'vocabularies';
    protected $fillable = [
        'japanese_word',
        'vietnamese_definition',
        'pronunciation',
        'example',
        'level'
    ];

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'lesson_vocabularies');
    }

    public function studyHistory()
    {
        return $this->hasMany(StudyHistory::class);
    }
}
