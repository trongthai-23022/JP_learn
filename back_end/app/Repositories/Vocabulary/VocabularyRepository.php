<?php
namespace App\Repositories\Vocabulary;

use App\Repositories\BaseRepository;
use App\Models\Vocabulary;

class VocabularyRepository extends BaseRepository implements VocabularyRepositoryInterface
{
    //lấy model tương ứng
    protected $model;

    public function __construct(Vocabulary $model)
    {
        parent::__construct($model);
    }
}
