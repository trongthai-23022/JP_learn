<?php
namespace App\Repositories\Lesson;

use App\Repositories\BaseRepository;
use App\Models\Lesson;

class LessonRepository extends BaseRepository implements LessonRepositoryInterface
{
    //lấy model tương ứng
    protected $model;

    public function __construct(Lesson $model)
    {
        parent::__construct($model);
    }
}
