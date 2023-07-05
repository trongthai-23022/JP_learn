<?php
namespace App\Repositories\StudyHistory;

use App\Repositories\RepositoryInterface;

interface StudyHistoryRepositoryInterface extends RepositoryInterface
{
    public function getAllStudyHistoryOfUser($user_id);


}
