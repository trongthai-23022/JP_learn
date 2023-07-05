<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use App\Models\FolderLesson;
use Illuminate\Http\Request;
use App\Repositories\Lesson\LessonRepositoryInterface;
use Tymon\JWTAuth\Facades\JWTAuth;

class LessonController extends Controller
{
    //repository json
    protected $lessonRepository;

    public function __construct(LessonRepositoryInterface $lessonRepository)
    {
        $this->lessonRepository = $lessonRepository;
    }

    public function index()
    {
        $lessons = $this->lessonRepository->getAll();
        return response()->json($lessons);
    }

    public function show($id)
    {
        $lesson = $this->lessonRepository->find($id);
        return response()->json($lesson);
    }

    public function store(Request $request)
    {

        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'folder_id' => 'required',
            'name' => 'required',
            'description' => 'required',
        ]);

        
        if (!Folder::find($request->folder_id)) {
            return response()->json(['message' => 'Folder not found']);
        }   

        //only name and description
        $rqlesson = $request->only('name', 'description');
        $lesson = $this->lessonRepository->create($rqlesson);
        $lesson->save();

        $folderlesson = new FolderLesson;
        $folderlesson->folder_id = $request['folder_id'];
        $folderlesson->lesson_id = $lesson->id;
        $folderlesson->save();

        
        return response()->json($lesson);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
        ]);
        $lesson = $this->lessonRepository->update($id, $request->all());
        return response()->json($lesson);
    }

    public function destroy($id)
    {
        $this->lessonRepository->delete($id);
        return response()->json(['message' => 'Lesson deleted successfully']);
    }

}
