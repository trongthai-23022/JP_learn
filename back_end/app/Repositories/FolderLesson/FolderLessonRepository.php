<?php

namespace App\Repositories\FolderLesson;

use App\Repositories\BaseRepository;
use App\Models\FolderLesson;

class FolderLessonRepository extends BaseRepository implements FolderLessonRepositoryInterface{
    protected $model;

    public function __construct(FolderLesson $model)
    {
        parent::__construct($model);
    }

}
