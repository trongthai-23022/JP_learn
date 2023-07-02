<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\FolderLesson\FolderLessonRepositoryInterface;

class FolderLessonController extends Controller
{
    //repository json
    protected $folderLessonRepository;

    public function __construct(FolderLessonRepositoryInterface $folderLessonRepository)
    {
        $this->folderLessonRepository = $folderLessonRepository;
    }

    public function index()
    {
        $folderLessons = $this->folderLessonRepository->getAll();
        return response()->json($folderLessons);
    }

    public function show($id)
    {
        $folderLesson = $this->folderLessonRepository->find($id);
        return response()->json($folderLesson);
    }

    public function store(Request $request)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'folder_id' => 'required',
            'lesson_id' => 'required',
        ]);

        $folderLesson = $this->folderLessonRepository->create($request->all());
        return response()->json($folderLesson);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'folder_id' => 'required',
            'lesson_id' => 'required',
        ]);
        $folderLesson = $this->folderLessonRepository->update($id, $request->all());
        return response()->json($folderLesson);
    }

    public function destroy($id)
    {
        $folderLesson = $this->folderLessonRepository->delete($id);
        return response()->json($folderLesson);
    }
}
