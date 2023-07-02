<?php

namespace App\Repositories\LessonVocabulary;

use App\Repositories\BaseRepository;
use App\Models\LessonVocabulary;

class LessonVocabularyRepository extends BaseRepository implements LessonVocabularyRepositoryInterface{
    protected $model;

    public function __construct(LessonVocabulary $model)
    {
        parent::__construct($model);
    }

}



