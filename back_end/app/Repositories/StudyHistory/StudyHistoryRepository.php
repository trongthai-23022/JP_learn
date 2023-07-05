<?php
namespace App\Repositories\StudyHistory;

use App\Repositories\BaseRepository;
use App\Models\StudyHistory;
use App\Models\Folder;

class StudyHistoryRepository extends BaseRepository implements StudyHistoryRepositoryInterface
{
    //lấy model tương ứng
    protected $model;

    public function __construct(StudyHistory $model)
    {
        parent::__construct($model);
    }

    //get all folder 1 user
    public function getAllStudyHistoryOfUser($user_id)
    {
        $histories = StudyHistory::where('user_id', $user_id)->get();

        $folders = [];
    
        // Duyệt qua từng lịch sử để lấy các folder tương ứng
        foreach ($histories as $history) {
            $folder = Folder::with('lessons')->find($history->folder_id);
            if ($folder) {
                $folders[] = $folder;
            }
        }

        return $folders;
    }

    
}
