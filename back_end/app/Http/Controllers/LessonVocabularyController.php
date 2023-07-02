<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\LessonVocabulary\LessonVocabularyRepositoryInterface;

class LessonVocabularyController extends Controller
{
    //repository json
    protected $lessonVocabularyRepository;

    public function __construct(LessonVocabularyRepositoryInterface $lessonVocabularyRepository)
    {
        $this->lessonVocabularyRepository = $lessonVocabularyRepository;
    }

    public function index()
    {
        $lessonVocabularies = $this->lessonVocabularyRepository->getAll();
        return response()->json($lessonVocabularies);
    }

    public function show($id)
    {
        $lessonVocabulary = $this->lessonVocabularyRepository->find($id);
        return response()->json($lessonVocabulary);
    }

    public function store(Request $request)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'lesson_id' => 'required',
            'vocabulary_id' => 'required',
        ]);

        $lessonVocabulary = $this->lessonVocabularyRepository->create($request->all());
        return response()->json($lessonVocabulary);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'lesson_id' => 'required',
            'vocabulary_id' => 'required',
        ]);
        $lessonVocabulary = $this->lessonVocabularyRepository->update($id, $request->all());
        return response()->json($lessonVocabulary);
    }

    public function destroy($id)
    {
        $lessonVocabulary = $this->lessonVocabularyRepository->delete($id);
        return response()->json($lessonVocabulary);
    }
}
