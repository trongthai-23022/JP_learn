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
    //find by japannese_word
    public function findByJapaneseWord($japanese_word)
    {
        return $this->model->where('japanese_word', $japanese_word)->first();
    }
}
