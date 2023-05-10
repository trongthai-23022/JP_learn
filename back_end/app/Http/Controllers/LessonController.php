<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
            'course_id' => 'required',
        ]);

        $lesson = $this->lessonRepository->create($request->all());
        return response()->json($lesson);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
            'course_id' => 'required',
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
