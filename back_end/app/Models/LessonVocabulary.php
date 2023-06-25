<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonVocabulary extends Model
{
    use HasFactory;

    protected $table = 'lesson_vocabularies';
    protected $fillable = [
        'lesson_id',
        'vocabulary_id',
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function vocabulary()
    {
        return $this->belongsTo(Vocabulary::class);
    }
}
