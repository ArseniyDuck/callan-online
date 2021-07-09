// Vocabulary:
export type TVocabularyWord = {
   id: number
   english_text: string
   translation_text: string
   page: number
}

export type TVocabularyLesson = {
   number: number
   words: Array<TVocabularyWord>
};


// lesson:
type TQuestion = {
   content_type: 'Question'
   content: TQuestionContent
};

export type TQuestionContent = {
   id: number
   question_text: string
   answer_text: string
   page: number | null
   content_id: number
}

type TRule = {
   content_type: 'Rule'
   content: TRuleContent
};

export type TRuleContent = {
   id: number,
   text: string
   index_number: number | null
   page: number | null,
   content_id: number
}

type TGroupOfWords = {
   content_type: 'GroupOfWords'
   content: TGroupOfWordsContent
};

export type TGroupOfWordsContent = {
   id: number
   content_id: number
   columns_count: number
   page: number | null
   words: Array<{
      id: number
      english_text: string
      translation_text: string
   }>
   theme_words_set: Array<{
      id: number
      text: string
   }>
};

type TIdiom = {
   content_type: 'Idiom'
   content: TIdiomContent
};

export type TIdiomContent = {
   id: number
   number: number
   idiom_text: string
   explaining_text: string
   example_text: string
   page: number | null
   content_id: number
};

type TDictation = {
   content_type: 'Dictation'
   content: TDictationContent
};

export type TDictationContent = null | {
   id: number
   number: number
   text: string
};

export type TLessonData = Array<TQuestion | TRule | TGroupOfWords | TIdiom | TDictation>;

export type TLesson = {
   number: number | null,
   data: TLessonData,
   audio: string | null
}

// Homework:
export type TTask = {
   id: number
   theme: string
   text: string
   deadline: string
   is_completed: boolean
   time_left: string | null
};