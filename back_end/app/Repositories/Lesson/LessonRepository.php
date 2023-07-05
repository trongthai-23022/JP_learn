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

    public function delete($id)
    {
          // Tìm thư mục cần xóa
    $lesson = Lesson::find($id);

    if ($lesson) {
        // Xóa các bản ghi liên quan trong study_histories
        $lesson->folderLesson()->delete();

        $lesson->lessonVocabulary()->delete();

        // Tiếp tục xóa thư mục
        $lesson->delete();

        // ... Xử lý thành công
        return $lesson;
    } else {
        // ... Xử lý khi không tìm thấy thư mục
        return "Không có lesson này";
    }
    }
}
