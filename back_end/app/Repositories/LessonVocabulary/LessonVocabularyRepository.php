<?php

namespace App\Repositories\LessonVocabulary;

use App\Models\Vocabulary;
use App\Repositories\BaseRepository;
use App\Models\LessonVocabulary;

class LessonVocabularyRepository extends BaseRepository implements LessonVocabularyRepositoryInterface
{
    protected $model;

    public function __construct(LessonVocabulary $model)
    {
        parent::__construct($model);
    }
    public function getAllVocabularyOfLesson($lesson_id)
    {
        $lessonVocabularies = $this->model->where('lesson_id', $lesson_id)->get();

        $vocabularyList = [];

        //Duyet qua cac id de lay vocabulary tuong ung
        foreach ($lessonVocabularies as $lessonVocabulary) {
            $vocabulary = Vocabulary::find($lessonVocabulary->vocabulary_id);
            if ($vocabulary) {
                $vocabularyList[] = $vocabulary;
            }
        }

        return $vocabularyList;

    }

    public function deleteVocabularyOfLesson($lesson_id, $vocabulary_id)
    {
        $lessonVocabulary = $this->model->where('lesson_id', $lesson_id)->where('vocabulary_id', $vocabulary_id)->first();
        if ($lessonVocabulary) {
            $lessonVocabulary->delete();
            return $lessonVocabulary;
        } else {
            return "Không có lesson này";
        }
    }

}
