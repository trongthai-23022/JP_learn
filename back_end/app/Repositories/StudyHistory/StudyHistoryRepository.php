<?php
namespace App\Repositories\StudyHistory;

use App\Repositories\BaseRepository;
use App\Models\StudyHistory;

class StudyHistoryRepository extends BaseRepository implements StudyHistoryRepositoryInterface
{
    //lấy model tương ứng
    protected $model;

    public function __construct(StudyHistory $model)
    {
        parent::__construct($model);
    }
}
