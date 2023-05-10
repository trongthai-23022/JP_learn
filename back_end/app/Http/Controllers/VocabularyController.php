<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\Vocabulary\VocabularyRepositoryInterface;
use Illuminate\Http\Request;

class VocabularyController extends Controller
{
    protected $vocabularyRepository;

    public function __construct(VocabularyRepositoryInterface $vocabularyRepository)
    {
        $this->vocabularyRepository = $vocabularyRepository;
    }

   public function index(){
        $vocabularies = $this->vocabularyRepository->getAll();
        return response()->json($vocabularies);
    }

    public function show($id)
    {
        $vocabulary = $this->vocabularyRepository->find($id);
        return response()->json($vocabulary);
    }

    public function store(Request $request)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'word' => 'required',
            'meaning' => 'required',
            'example' => 'required',
            'category_id' => 'required',
        ]);

        $vocabulary = $this->vocabularyRepository->create($request->all());
        return response()->json($vocabulary);
    }

    public function update(Request $request, $id)
    {
        //validate dữ liệu được gửi lên
        $this->validate($request, [
            'word' => 'required',
            'meaning' => 'required',
            'example' => 'required',
            'category_id' => 'required',
        ]);
        $vocabulary = $this->vocabularyRepository->update($id, $request->all());
        return response()->json($vocabulary);
    }

    public function destroy($id)
    {
        $this->vocabularyRepository->delete($id);
        return response()->json(['message' => 'Vocabulary deleted successfully']);
   }
}
